<script lang="ts">
	import { onMount, tick } from 'svelte';
	import { EventInvolvement, eventShowcaseData, type EventShowcase } from './eventShowcaseMedia';
	import { ASSETS_HOST } from '$lib';

	type MasonryApi = {
		layout: () => void;
		destroy: () => void;
	};

	let galleryNode: HTMLDivElement | null = null;
	let masonry: MasonryApi | null = null;
	let layoutRaf: number | null = null;
	let mediaFrameRatios = $state<Record<string, number>>({});
	let ratiosReady = $state(false);
	const sortedEventShowcaseData = [...eventShowcaseData].sort(
		(a, b) => (a.sortIndex ?? 99) - (b.sortIndex ?? 99) || a.name.localeCompare(b.name)
	);
	const initialMediaEventIds = new Set(
		sortedEventShowcaseData
			.slice(0, 4)
			.filter((event) => event.media.length > 0)
			.map((event) => event.id)
	);
	const initialMediaTarget = initialMediaEventIds.size;
	const loadedInitialMediaEvents = new Set<string>();
	let initialMediaLoaded = $state(0);
	const finalizedRatios = new Set<string>();
	const eventById = new Map(sortedEventShowcaseData.map((event) => [event.id, event]));
	const eventIndexById = new Map(sortedEventShowcaseData.map((event, index) => [event.id, index]));
	const preloadedMediaUrls = new Set<string>();
	const preloadHintLinks = new Map<string, HTMLLinkElement>();
	const SCROLL_AHEAD_PRELOAD_COUNT = 4;

	function scheduleMasonryLayout() {
		if (!masonry) return;
		if (layoutRaf !== null) cancelAnimationFrame(layoutRaf);
		layoutRaf = requestAnimationFrame(() => {
			masonry?.layout();
			layoutRaf = null;
		});
	}

	onMount(() => {
		if (!galleryNode) return;

		let disposed = false;

		(async () => {
			await preloadAllEventRatios();
			if (disposed || !galleryNode) return;

			const { default: MasonryLayout } = await import('masonry-layout');
			if (disposed || !galleryNode) return;

			masonry = new MasonryLayout(galleryNode, {
				itemSelector: '.media-card',
				columnWidth: '.media-sizer',
				gutter: 16,
				percentPosition: true,
				horizontalOrder: true,
				transitionDuration: 0
			});

			scheduleMasonryLayout();
		})();

		return () => {
			disposed = true;
			if (layoutRaf !== null) {
				cancelAnimationFrame(layoutRaf);
				layoutRaf = null;
			}
			masonry?.destroy();
			masonry = null;
		};
	});

	function registerMediaRatio(eventId: string, width: number, height: number) {
		if (finalizedRatios.has(eventId)) return;
		if (!width || !height) return;
		const ratio = width / height;
		const current = mediaFrameRatios[eventId];
		if (current !== undefined && ratio >= current) return;
		mediaFrameRatios[eventId] = ratio;
		tick().then(scheduleMasonryLayout);
	}

	function getFrameRatio(eventId: string): number {
		return mediaFrameRatios[eventId] ?? 0.8;
	}

	function markInitialMediaLoaded(eventId: string) {
		if (initialMediaTarget === 0) return;
		if (!initialMediaEventIds.has(eventId)) return;
		if (loadedInitialMediaEvents.has(eventId)) return;

		loadedInitialMediaEvents.add(eventId);
		initialMediaLoaded = loadedInitialMediaEvents.size;
	}

	function ensurePreloadHint(url: string, asType: 'image' | 'video') {
		if (preloadHintLinks.has(url)) return;

		const link = document.createElement('link');
		link.rel = 'preload';
		link.as = asType;
		link.href = url;
		document.head.appendChild(link);
		preloadHintLinks.set(url, link);
	}

	function preloadImageUrl(url: string) {
		ensurePreloadHint(url, 'image');
	}

	function preloadVideoUrl(url: string) {
		ensurePreloadHint(url, 'video');
	}

	function preloadMediaItem(media: EventShowcase['media'][number] | undefined) {
		if (!media) return;
		const url = ASSETS_HOST + media.url;
		if (preloadedMediaUrls.has(url)) return;

		preloadedMediaUrls.add(url);
		if (media.type === 'image') {
			preloadImageUrl(url);
			return;
		}

		preloadVideoUrl(url);
	}

	function preloadNextCarouselMedia(eventId: string) {
		const event = eventById.get(eventId);
		if (!event || event.media.length < 2) return;

		const currentIndex = getMediaIndex(eventId);
		const nextIndex = (currentIndex + 1) % event.media.length;
		preloadMediaItem(event.media[nextIndex]);
	}

	function preloadUpcomingScrollMedia(eventId: string) {
		const currentEventIndex = eventIndexById.get(eventId);
		if (currentEventIndex === undefined) return;

		for (let offset = 1; offset <= SCROLL_AHEAD_PRELOAD_COUNT; offset += 1) {
			const nextEvent = sortedEventShowcaseData[currentEventIndex + offset];
			if (!nextEvent) break;

			const nextEventCurrentMediaIndex = getMediaIndex(nextEvent.id);
			preloadMediaItem(nextEvent.media[nextEventCurrentMediaIndex] ?? nextEvent.media[0]);
		}
	}

	function onMediaReady(eventId: string) {
		preloadNextCarouselMedia(eventId);
		preloadUpcomingScrollMedia(eventId);
	}

	function probeImageRatio(url: string): Promise<number | null> {
		return new Promise((resolve) => {
			const image = new Image();
			const cleanup = () => {
				image.onload = null;
				image.onerror = null;
			};
			image.onload = () => {
				const ratio =
					image.naturalWidth && image.naturalHeight
						? image.naturalWidth / image.naturalHeight
						: null;
				cleanup();
				resolve(ratio);
			};
			image.onerror = () => {
				cleanup();
				resolve(null);
			};
			image.src = url;
		});
	}

	function probeVideoRatio(url: string): Promise<number | null> {
		return new Promise((resolve) => {
			const video = document.createElement('video');
			const cleanup = () => {
				video.removeAttribute('src');
				video.load();
				video.onloadedmetadata = null;
				video.onerror = null;
			};
			video.preload = 'metadata';
			video.muted = true;
			video.onloadedmetadata = () => {
				const ratio =
					video.videoWidth && video.videoHeight ? video.videoWidth / video.videoHeight : null;
				cleanup();
				resolve(ratio);
			};
			video.onerror = () => {
				cleanup();
				resolve(null);
			};
			video.src = url;
			video.load();
		});
	}

	async function preloadAllEventRatios() {
		await Promise.all(
			eventShowcaseData.map(async (event) => {
				const ratios = await Promise.all(
					event.media.map((media) =>
						media.type === 'image'
							? probeImageRatio(ASSETS_HOST + media.url)
							: probeVideoRatio(ASSETS_HOST + media.url)
					)
				);

				const validRatios = ratios.filter(
					(ratio): ratio is number => typeof ratio === 'number' && ratio > 0
				);
				if (validRatios.length > 0) {
					mediaFrameRatios[event.id] = Math.min(...validRatios);
				}
				finalizedRatios.add(event.id);
			})
		);

		ratiosReady = true;
		await tick();
		scheduleMasonryLayout();
	}

	// 1. Use a Map for better reactivity and key handling in Svelte 5
	// This ensures Klinkrade 2025 and Klinkrade 2026 stay separated.
	let mediaIndices = $state<Record<string, number>>({});
	// Initialize
	eventShowcaseData.forEach((e) => {
		if (!(e.id in mediaIndices)) {
			mediaIndices[e.id] = 0;
		}
	});

	// 2. Helper to get index safely
	function getMediaIndex(eventId: string): number {
		return mediaIndices[eventId] ?? 0;
	}

	// 3. Helper to get active media
	function getCurrentMedia(event: EventShowcase) {
		const index = getMediaIndex(event.id);
		return event.media[index] || event.media[0];
	}

	// 2. Navigation functions that directly mutate the reactive object
	function nextMedia(eventId: string, totalMedia: number, e: MouseEvent) {
		e.preventDefault();
		e.stopPropagation(); // CRITICAL: Stops the click from reaching the Card/Figure

		const current = mediaIndices[eventId] ?? 0;
		mediaIndices[eventId] = (current + 1) % totalMedia;
		preloadNextCarouselMedia(eventId);
		tick().then(scheduleMasonryLayout);
	}

	function prevMedia(eventId: string, totalMedia: number, e: MouseEvent) {
		e.preventDefault();
		e.stopPropagation(); // CRITICAL: Stops the click from reaching the Card/Figure

		const current = mediaIndices[eventId] ?? 0;
		mediaIndices[eventId] = (current - 1 + totalMedia) % totalMedia;
		preloadNextCarouselMedia(eventId);
		tick().then(scheduleMasonryLayout);
	}

	function lazyMedia(node: HTMLImageElement | HTMLVideoElement, eventId: string) {
		function loadMedia() {
			if (node.dataset.loaded === 'true') return;
			const sourceUrl = node.dataset.src;
			if (!sourceUrl) return;
			preloadedMediaUrls.add(sourceUrl);

			if (node instanceof HTMLImageElement) {
				node.addEventListener(
					'load',
					() => {
						markInitialMediaLoaded(eventId);
						onMediaReady(eventId);
						registerMediaRatio(eventId, node.naturalWidth, node.naturalHeight);
						scheduleMasonryLayout();
					},
					{ once: true }
				);
				node.src = sourceUrl;
				node.decoding = 'async';
			} else {
				let metadataReady = false;
				let thumbnailReady = false;
				const markVideoReady = () => {
					if (!metadataReady || !thumbnailReady) return;
					markInitialMediaLoaded(eventId);
				};
				node.addEventListener(
					'loadedmetadata',
					() => {
						metadataReady = true;
						markVideoReady();
						registerMediaRatio(eventId, node.videoWidth, node.videoHeight);
						scheduleMasonryLayout();
					},
					{ once: true }
				);
				node.addEventListener(
					'loadeddata',
					() => {
						thumbnailReady = true;
						markVideoReady();
						onMediaReady(eventId);
					},
					{ once: true }
				);
				node.src = sourceUrl;
				node.preload = initialMediaEventIds.has(eventId) ? 'auto' : 'metadata';
				node.load();
			}

			node.dataset.loaded = 'true';
		}

		if (typeof IntersectionObserver === 'undefined') {
			loadMedia();
			return {
				destroy() {}
			};
		}

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					loadMedia();
					observer.unobserve(node);
				}
			},
			{ rootMargin: '350px 0px' }
		);

		observer.observe(node);

		return {
			destroy() {
				observer.disconnect();
			}
		};
	}

	function involvementLabel(involvement: EventShowcase['involvement']): string {
		return involvement === EventInvolvement.MY_JOB ? 'My Job' : 'Worked On';
	}

	function capabilityTags(event: EventShowcase): string[] {
		const capabilities: string[] = [];
		if (event.lasers) capabilities.push('Lasers');
		if (event.lights) capabilities.push('Lights');
		if (event.sound) capabilities.push('Sound');
		if (event.showfile) capabilities.push('My Showfile');
		return capabilities;
	}
</script>

<div
	class="gallery-columns"
	class:ratios-loading={!ratiosReady}
	aria-busy={!ratiosReady || initialMediaLoaded < initialMediaTarget}
	bind:this={galleryNode}
>
	{#if initialMediaLoaded < initialMediaTarget}
		<div class="gallery-loader" role="status" aria-live="polite" aria-label="Loading gallery media">
			<span class="gallery-spinner" aria-hidden="true"></span>
			<span class="gallery-loader-text">Loading gallery…</span>
		</div>
	{/if}
	<div class="media-sizer" aria-hidden="true"></div>
	{#each sortedEventShowcaseData as event (event.id)}
		{@const activeMedia = getCurrentMedia(event)}
		{@const currentIndex = mediaIndices[event.id] ?? 0}
		<figure class="media-card panel">
			{#if event.media.length > 1}
				<div
					class="absolute top-2 right-0 left-0 z-20 flex items-center justify-between gap-3 rounded-t-[0.9rem] border-none bg-none px-3 py-[0.7rem]"
					role="group"
					aria-label="Media navigation"
				>
					<button
						type="button"
						class="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-mist-100/45 bg-anthracite-900/80 shadow-[0_2px_8px_rgba(0,0,0,0.35)] backdrop-blur-[2px] transition-colors hover:bg-anthracite-900/60 focus-visible:border-mist-100/70 focus-visible:bg-anthracite-900/60 focus-visible:outline-none md:h-8 md:w-8"
						onclick={(e) => prevMedia(event.id, event.media.length, e)}
						aria-label="Previous media"
					>
						<span aria-hidden="true" class="-translate-y-[0.02em] leading-none font-bold">‹</span>
					</button>
					<span
						class="min-w-[2.2em] rounded-[0.7em] border border-mist-100/30 bg-[rgba(24,26,32,0.82)] px-2 py-1 text-center text-[0.8rem] font-semibold tracking-[0.04em] text-mist-100/80 opacity-95 shadow-[0_2px_8px_rgba(0,0,0,0.28)] md:px-[0.4rem] md:py-[0.18rem] md:text-[0.74rem]"
						>{getMediaIndex(event.id) + 1} / {event.media.length}</span
					>
					<button
						type="button"
						class="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-mist-100/45 bg-anthracite-900/80 shadow-[0_2px_8px_rgba(0,0,0,0.35)] backdrop-blur-[2px] transition-colors hover:bg-anthracite-900/60 focus-visible:border-mist-100/70 focus-visible:bg-anthracite-900/60 focus-visible:outline-none md:h-8 md:w-8"
						onclick={(e) => nextMedia(event.id, event.media.length, e)}
						aria-label="Next media"
					>
						<span aria-hidden="true" class="-translate-y-[0.02em] leading-none font-bold">›</span>
					</button>
				</div>
			{/if}
			<div class="media-frame" style={`--media-frame-ratio: ${getFrameRatio(event.id)}`}>
				{#key `${event.id}-${currentIndex}`}
					{#if activeMedia.type === 'image'}
						<img
							use:lazyMedia={event.id}
							data-src={ASSETS_HOST + activeMedia.url}
							alt={`${activeMedia.title ?? activeMedia.name ?? event.name} in ${event.location} (${event.year})`}
							loading="lazy"
							class="media-element"
							class:media-fill={activeMedia.fill === true}
						/>
					{:else}
						<video
							use:lazyMedia={event.id}
							data-src={ASSETS_HOST + activeMedia.url}
							class="media-element"
							class:media-fill={activeMedia.fill === true}
							playsinline
							controls
							preload="none"
							muted
						></video>
					{/if}
				{/key}
			</div>

			<figcaption class="media-caption">
				<p class="text-sm font-semibold tracking-[0.08em] text-mist-100/90 uppercase">
					{event.name}
				</p>
				<p class="mt-1 text-xs font-medium text-mist-100/70">{event.location} · {event.year}</p>
				{#if activeMedia.title}
					<p class="mt-2 text-xs font-semibold tracking-[0.05em] text-mist-100/85 uppercase">
						{activeMedia.title}
					</p>
				{/if}

				{#if event.eventPageUrl || activeMedia.photographer?.length}
					<div
						class="mt-2 flex flex-wrap items-center gap-3 text-xs font-semibold text-mist-100/80"
					>
						{#if event.eventPageUrl}
							<a
								href={event.eventPageUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="underline decoration-mist-100/50 underline-offset-2 hover:decoration-mist-100"
							>
								Event Page
							</a>
						{/if}
						{#if activeMedia.photographer?.length}
							<div class="flex items-center gap-1 text-mist-100/70">
								<span>&copy;</span>
								{#each activeMedia.photographer as photographer, index}
									<a
										href={photographer.url}
										target="_blank"
										rel="noopener noreferrer"
										class="underline decoration-mist-100/50 underline-offset-2 hover:decoration-mist-100"
									>
										{photographer.name}
									</a>
									{#if index < activeMedia.photographer.length - 1}
										<span>/</span>
									{/if}
								{/each}
							</div>
						{/if}
					</div>
				{/if}

				<div class="mt-2 flex flex-wrap gap-2">
					{#if event.involvement === EventInvolvement.WORKED_ON}
						<span
							class="rounded-md border border-mist-100/25 bg-anthracite-900/70 px-2 py-1 text-[11px] font-semibold tracking-[0.06em] text-mist-100/85 uppercase"
						>
							Assisted
						</span>
					{/if}

					{#each capabilityTags(event) as cap}
						<span
							class="rounded-md border border-electric-400/35 bg-electric-400/10 px-2 py-1 text-[11px] font-semibold tracking-[0.06em] text-electric-400 uppercase"
						>
							{cap}
						</span>
					{/each}

					{#each event.tags as tag}
						<span
							class="rounded-md border border-violet-400/35 bg-violet-500/12 px-2 py-1 text-[11px] font-semibold tracking-[0.06em] text-violet-400 uppercase"
						>
							{tag}
						</span>
					{/each}
				</div>
			</figcaption>
		</figure>
	{/each}
</div>

<style>
	.gallery-columns {
		position: relative;
	}

	.gallery-columns.ratios-loading {
		opacity: 1;
	}

	.gallery-loader {
		position: absolute;
		top: 0.8rem;
		left: 50%;
		z-index: 30;
		display: inline-flex;
		transform: translateX(-50%);
		align-items: center;
		gap: 0.55rem;
		border: 1px solid color-mix(in oklab, white 24%, transparent);
		border-radius: 999px;
		background: color-mix(in oklab, var(--color-anthracite-900) 86%, transparent);
		padding: 0.45rem 0.75rem;
		backdrop-filter: blur(4px);
	}

	.gallery-spinner {
		display: inline-block;
		width: 0.9rem;
		height: 0.9rem;
		border-radius: 999px;
		border: 2px solid color-mix(in oklab, white 35%, transparent);
		border-top-color: var(--color-electric-400);
		animation: gallery-spin 0.8s linear infinite;
	}

	.gallery-loader-text {
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: color-mix(in oklab, white 86%, transparent);
	}

	@keyframes gallery-spin {
		to {
			transform: rotate(360deg);
		}
	}

	.media-sizer,
	.media-card {
		width: 100%;
	}

	.media-card {
		margin: 0 0 1rem;
		overflow: hidden;
		border-radius: 0.9rem;
	}

	.media-frame {
		position: relative;
		aspect-ratio: var(--media-frame-ratio, 0.8);
		background: #090c11;
	}

	.media-element {
		display: block;
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.media-element.media-fill {
		object-fit: cover;
	}
	.media-caption {
		padding: 0.9rem;
		border-top: 1px solid color-mix(in oklab, white 12%, transparent);
		background: color-mix(in oklab, var(--color-anthracite-900) 84%, transparent);
	}

	@media (min-width: 640px) {
		.media-sizer,
		.media-card {
			width: calc((100% - 1rem) / 2);
		}
	}

	@media (min-width: 1100px) {
		.media-sizer,
		.media-card {
			width: calc((100% - 2rem) / 3);
		}
	}

	@media (min-width: 1536px) {
		.media-sizer,
		.media-card {
			width: calc((100% - 3rem) / 4);
		}
	}
</style>
