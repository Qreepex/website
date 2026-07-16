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
	let layoutReady = $state(false);
	let initialMediaLoaded = $state(0);
	const loadedInitialMediaEvents = new Set<string>();
	const skeletonCards = Array.from({ length: 12 }, (_, i) => i);
	const sortedEventShowcaseData = [...eventShowcaseData].sort(
		(a, b) => (a.sortIndex ?? 99) - (b.sortIndex ?? 99) || a.name.localeCompare(b.name)
	);
	const initialMediaEventIds = new Set(
		sortedEventShowcaseData
			.slice(0, 4)
			.filter((event) => event.media.length > 0)
			.map((event) => event.id)
	);
	let showSkeleton = $derived(!layoutReady || initialMediaLoaded < initialMediaEventIds.size);
	const eventById = new Map(sortedEventShowcaseData.map((event) => [event.id, event]));
	const eventIndexById = new Map(sortedEventShowcaseData.map((event, index) => [event.id, index]));
	const preloadedMediaUrls = new Set<string>();
	type ResourceHintMode = 'preload' | 'prefetch';
	const preloadHintLinks = new Map<string, { link: HTMLLinkElement; mode: ResourceHintMode }>();
	const SCROLL_AHEAD_PRELOAD_COUNT = 4;

	function scheduleMasonryLayout() {
		if (!masonry) return;
		if (layoutRaf !== null) cancelAnimationFrame(layoutRaf);
		layoutRaf = requestAnimationFrame(() => {
			masonry?.layout();
			layoutRaf = null;
		});
	}

	function markInitialMediaLoaded(eventId: string) {
		if (initialMediaEventIds.size === 0) return;
		if (!initialMediaEventIds.has(eventId)) return;
		if (loadedInitialMediaEvents.has(eventId)) return;
		loadedInitialMediaEvents.add(eventId);
		initialMediaLoaded = loadedInitialMediaEvents.size;
	}

	onMount(() => {
		if (!galleryNode) return;

		let disposed = false;

		(async () => {
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

			layoutReady = true;
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

	function ensurePreloadHint(
		url: string,
		asType: 'image' | 'video',
		mode: ResourceHintMode = 'prefetch'
	) {
		const existing = preloadHintLinks.get(url);
		if (existing) {
			if (existing.mode === 'prefetch' && mode === 'preload') {
				existing.link.rel = 'preload';
				existing.link.as = asType;
				existing.mode = 'preload';
			}
			return;
		}

		const link = document.createElement('link');
		link.rel = mode;
		if (mode === 'preload') {
			link.as = asType;
		}
		link.href = url;
		document.head.appendChild(link);
		preloadHintLinks.set(url, { link, mode });
	}

	function preloadImageUrl(url: string, mode: ResourceHintMode = 'prefetch') {
		ensurePreloadHint(url, 'image', mode);
	}

	function preloadVideoUrl(url: string, mode: ResourceHintMode = 'prefetch') {
		ensurePreloadHint(url, 'video', mode);
	}

	function preloadMediaItem(
		media: EventShowcase['media'][number] | undefined,
		mode: ResourceHintMode = 'prefetch'
	) {
		if (!media) return;
		const url = ASSETS_HOST + media.url;
		if (preloadedMediaUrls.has(url)) return;

		preloadedMediaUrls.add(url);
		if (media.type === 'image') {
			preloadImageUrl(url, mode);
			return;
		}

		preloadVideoUrl(url, mode);
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
				node.addEventListener(
					'loadedmetadata',
					() => {
						registerMediaRatio(eventId, node.videoWidth, node.videoHeight);
						scheduleMasonryLayout();
					},
					{ once: true }
				);
				node.addEventListener(
					'loadeddata',
					() => {
						markInitialMediaLoaded(eventId);
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

	const ICON_PLAY =
		'<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>';
	const ICON_PAUSE =
		'<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M7 5h4v14H7zM13 5h4v14h-4z"/></svg>';
	const ICON_MUTED =
		'<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3z"/><path d="M15.5 8.5l5 7M20.5 8.5l-5 7" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';
	const ICON_UNMUTED =
		'<svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3z"/><path d="M16.5 9a4 4 0 010 6M19 6.5a7.5 7.5 0 010 11" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/></svg>';

	function videoControls(node: HTMLVideoElement) {
		const frame = node.parentElement;
		if (!frame) return {};

		const overlay = document.createElement('div');
		overlay.className = 'video-controls';

		const playToggle = document.createElement('div');
		playToggle.className = 'video-play-toggle';
		playToggle.setAttribute('aria-hidden', 'true');
		playToggle.innerHTML = ICON_PLAY;

		const bar = document.createElement('div');
		bar.className = 'video-bar';

		const progressTrack = document.createElement('div');
		progressTrack.className = 'video-progress-track';
		const progressFill = document.createElement('div');
		progressFill.className = 'video-progress-fill';
		progressTrack.appendChild(progressFill);

		const muteBtn = document.createElement('button');
		muteBtn.type = 'button';
		muteBtn.className = 'video-mute-toggle';
		muteBtn.innerHTML = ICON_MUTED;

		bar.appendChild(progressTrack);
		bar.appendChild(muteBtn);
		overlay.appendChild(playToggle);
		overlay.appendChild(bar);
		frame.appendChild(overlay);

		function updatePlayState() {
			const playing = !node.paused && !node.ended;
			playToggle.innerHTML = playing ? ICON_PAUSE : ICON_PLAY;
			overlay.classList.toggle('is-playing', playing);
		}

		function updateMuteState() {
			muteBtn.innerHTML = node.muted ? ICON_MUTED : ICON_UNMUTED;
			muteBtn.setAttribute('aria-label', node.muted ? 'Unmute video' : 'Mute video');
		}

		function updateProgress() {
			if (!node.duration) return;
			progressFill.style.width = `${(node.currentTime / node.duration) * 100}%`;
		}

		function togglePlay() {
			if (node.paused) node.play().catch(() => {});
			else node.pause();
		}

		function toggleMute(e: Event) {
			e.stopPropagation();
			node.muted = !node.muted;
			updateMuteState();
		}

		function seek(e: MouseEvent) {
			e.stopPropagation();
			if (!node.duration) return;
			const rect = progressTrack.getBoundingClientRect();
			const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
			node.currentTime = ratio * node.duration;
		}

		overlay.addEventListener('click', togglePlay);
		muteBtn.addEventListener('click', toggleMute);
		progressTrack.addEventListener('click', seek);
		node.addEventListener('play', updatePlayState);
		node.addEventListener('pause', updatePlayState);
		node.addEventListener('ended', updatePlayState);
		node.addEventListener('timeupdate', updateProgress);
		node.addEventListener('volumechange', updateMuteState);

		updatePlayState();
		updateMuteState();

		return {
			destroy() {
				overlay.removeEventListener('click', togglePlay);
				muteBtn.removeEventListener('click', toggleMute);
				progressTrack.removeEventListener('click', seek);
				node.removeEventListener('play', updatePlayState);
				node.removeEventListener('pause', updatePlayState);
				node.removeEventListener('ended', updatePlayState);
				node.removeEventListener('timeupdate', updateProgress);
				node.removeEventListener('volumechange', updateMuteState);
				overlay.remove();
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

<div class="gallery-wrap" aria-busy={showSkeleton}>
	<div class="gallery-columns" bind:this={galleryNode}>
		<div class="media-sizer" aria-hidden="true"></div>
		{#each sortedEventShowcaseData as event (event.id)}
		{@const activeMedia = getCurrentMedia(event)}
		{@const currentIndex = mediaIndices[event.id] ?? 0}
		<figure class="media-card" data-event-id={event.id}>
			<div class="card-inner">
				{#if event.media.length > 1}
					<div class="nav-bar" role="group" aria-label="Media navigation">
						<button
							type="button"
							class="nav-btn"
							onclick={(e) => prevMedia(event.id, event.media.length, e)}
							aria-label="Previous media"
						>
							<span aria-hidden="true">‹</span>
						</button>
						<span class="nav-counter"
							>{getMediaIndex(event.id) + 1}/{event.media.length}</span
						>
						<button
							type="button"
							class="nav-btn"
							onclick={(e) => nextMedia(event.id, event.media.length, e)}
							aria-label="Next media"
						>
							<span aria-hidden="true">›</span>
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
								use:videoControls
								data-src={ASSETS_HOST + activeMedia.url}
								class="media-element"
								class:media-fill={activeMedia.fill === true}
								playsinline
								preload="none"
								muted
							></video>
						{/if}
					{/key}
				</div>
			</div>

			<figcaption class="media-caption">
				<p class="media-name">{event.name}</p>
				<p class="media-meta">{event.location} · {event.year}</p>
				{#if activeMedia.title}
					<p class="media-subtitle">{activeMedia.title}</p>
				{/if}

				{#if event.eventPageUrl || activeMedia.photographer?.length}
					<div class="media-credits">
						{#if event.eventPageUrl}
							<a href={event.eventPageUrl} target="_blank" rel="noopener noreferrer">
								Event Page
							</a>
						{/if}
						{#if activeMedia.photographer?.length}
							<span class="media-credits-photo">
								<span>&copy;</span>
								{#each activeMedia.photographer as photographer, index}
									<a href={photographer.url} target="_blank" rel="noopener noreferrer">
										{photographer.name}
									</a>
									{#if index < activeMedia.photographer.length - 1}
										<span>/</span>
									{/if}
								{/each}
							</span>
						{/if}
					</div>
				{/if}

				<div class="media-tags">
					{#if event.involvement === EventInvolvement.WORKED_ON}
						<span class="tag-assisted">Assisted</span>
					{/if}

					{#each capabilityTags(event) as cap}
						<span class="tag-capability">{cap}</span>
					{/each}

					{#each event.tags as tag}
						<span class="tag-hash">#{tag}</span>
					{/each}
				</div>
			</figcaption>
		</figure>
		{/each}
	</div>

	{#if showSkeleton}
		<div class="skeleton-grid" role="status" aria-live="polite" aria-label="Loading gallery media">
			{#each skeletonCards as i (i)}
				<div class="skeleton-card" style={`--i: ${i}`}>
					<div class="skeleton-media"></div>
					<div class="skeleton-caption">
						<span class="skeleton-line skeleton-line-title"></span>
						<span class="skeleton-line skeleton-line-meta"></span>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.gallery-wrap {
		position: relative;
	}

	.gallery-columns {
		position: relative;
	}

	/* The real grid is never hidden via visibility/display — some browsers
	   deprioritize or fully defer network activity for <video> elements
	   inside invisible ancestors, which silently stalled loading behind the
	   old skeleton. Instead the skeleton is an opaque overlay drawn on top,
	   so the real grid keeps loading normally underneath it. */
	.skeleton-grid {
		position: absolute;
		inset: 0;
		z-index: 40;
		overflow: hidden;
		background: #020203;
		column-gap: 1.15rem;
		column-count: 1;
	}

	.skeleton-card {
		display: inline-block;
		width: 100%;
		margin-bottom: 1.15rem;
		break-inside: avoid;
		border: 1px solid color-mix(in oklab, white 12%, transparent);
		background: #050506;
	}

	.skeleton-media {
		position: relative;
		aspect-ratio: 0.8;
		overflow: hidden;
		background: #0a0b0d;
	}

	.skeleton-card:nth-child(5n + 2) .skeleton-media {
		aspect-ratio: 1.2;
	}

	.skeleton-card:nth-child(5n + 3) .skeleton-media {
		aspect-ratio: 0.55;
	}

	.skeleton-card:nth-child(5n + 4) .skeleton-media {
		aspect-ratio: 1;
	}

	.skeleton-card:nth-child(5n + 5) .skeleton-media {
		aspect-ratio: 0.7;
	}

	.skeleton-card:nth-child(3n + 1) .skeleton-media {
		border-bottom: 3px solid color-mix(in oklab, var(--color-electric-400) 45%, transparent);
	}

	.skeleton-card:nth-child(3n + 2) .skeleton-media {
		border-bottom: 3px solid color-mix(in oklab, var(--color-violet-400) 45%, transparent);
	}

	.skeleton-card:nth-child(3n + 3) .skeleton-media {
		border-bottom: 3px solid color-mix(in oklab, var(--color-cyan-400) 45%, transparent);
	}

	.skeleton-caption {
		padding: 0.8rem 0.9rem;
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
	}

	.skeleton-line {
		position: relative;
		display: block;
		height: 0.6rem;
		overflow: hidden;
		background: #101215;
	}

	.skeleton-line-title {
		width: 60%;
	}

	.skeleton-line-meta {
		width: 38%;
		opacity: 0.7;
	}

	.skeleton-media::after,
	.skeleton-line::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(
			100deg,
			transparent 30%,
			color-mix(in oklab, white 10%, transparent) 46%,
			color-mix(in oklab, white 18%, transparent) 50%,
			color-mix(in oklab, white 10%, transparent) 54%,
			transparent 70%
		);
		transform: translateX(-120%);
		animation: skeleton-sweep 1.8s ease-in-out infinite;
		animation-delay: calc(var(--i, 0) * -0.15s);
	}

	@keyframes skeleton-sweep {
		to {
			transform: translateX(120%);
		}
	}

	@media (min-width: 640px) {
		.skeleton-grid {
			column-count: 2;
		}
	}

	@media (min-width: 1100px) {
		.skeleton-grid {
			column-count: 3;
		}
	}

	@media (min-width: 1536px) {
		.skeleton-grid {
			column-count: 4;
		}
	}

	.media-sizer,
	.media-card {
		width: 100%;
	}

	.media-card {
		position: relative;
		margin: 0 0 1.15rem;
		--accent: var(--color-electric-400);
	}

	.media-card:nth-child(4n + 2) {
		--accent: var(--color-violet-400);
	}

	.media-card:nth-child(4n + 3) {
		--accent: var(--color-cyan-400);
	}

	.media-card:nth-child(4n) {
		--accent: #ff2f92;
	}

	.media-card:hover {
		z-index: 30;
	}

	.card-inner {
		position: relative;
		background: #000;
		border: 1px solid color-mix(in oklab, white 16%, transparent);
		animation: card-pop-in 0.5s cubic-bezier(0.22, 0.85, 0.3, 1.35) backwards;
		transition:
			transform 0.2s cubic-bezier(0.22, 0.85, 0.3, 1.35),
			box-shadow 0.2s ease,
			border-color 0.2s ease;
	}

	@keyframes card-pop-in {
		from {
			opacity: 0;
			transform: scale(0.88) translateY(14px);
		}
		to {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
	}

	.media-card:hover .card-inner {
		border-color: var(--accent);
		transform: scale(1.045) rotate(-0.7deg);
		box-shadow:
			0 0 0 2px var(--accent),
			0 26px 50px -14px color-mix(in oklab, var(--accent) 70%, transparent),
			0 0 60px -8px color-mix(in oklab, var(--accent) 55%, transparent);
	}

	.media-card:nth-child(even):hover .card-inner {
		transform: scale(1.045) rotate(0.7deg);
	}

	.media-frame {
		position: relative;
		aspect-ratio: var(--media-frame-ratio, 0.8);
		background: #000;
		overflow: hidden;
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

	:global(.video-controls) {
		position: absolute;
		inset: 0;
		z-index: 15;
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}

	:global(.video-play-toggle) {
		display: flex;
		height: 3.6rem;
		width: 3.6rem;
		align-items: center;
		justify-content: center;
		border: 2px solid rgba(255, 255, 255, 0.75);
		background: rgba(2, 2, 3, 0.6);
		clip-path: polygon(18% 0, 100% 0, 82% 100%, 0 100%);
		color: #fff;
		transition:
			opacity 0.2s ease,
			background-color 0.2s ease,
			transform 0.15s ease;
	}

	:global(.video-controls.is-playing .video-play-toggle) {
		opacity: 0;
	}

	:global(.video-controls:hover .video-play-toggle) {
		opacity: 1;
		background: var(--accent);
		border-color: var(--accent);
		color: #050505;
		transform: scale(1.08);
	}

	:global(.video-bar) {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 16;
		display: flex;
		align-items: center;
		gap: 0.55rem;
		padding: 0.5rem 0.55rem;
		background: linear-gradient(180deg, transparent, rgba(0, 0, 0, 0.8));
		opacity: 0;
		transition: opacity 0.2s ease;
	}

	:global(.video-controls:hover .video-bar),
	:global(.video-controls.is-playing .video-bar) {
		opacity: 1;
	}

	:global(.video-progress-track) {
		position: relative;
		height: 0.35rem;
		flex: 1;
		background: rgba(255, 255, 255, 0.22);
		cursor: pointer;
	}

	:global(.video-progress-fill) {
		position: absolute;
		inset: 0;
		width: 0%;
		background: var(--accent);
	}

	:global(.video-mute-toggle) {
		display: flex;
		height: 1.9rem;
		width: 1.9rem;
		flex-shrink: 0;
		align-items: center;
		justify-content: center;
		border: 1px solid rgba(255, 255, 255, 0.4);
		background: rgba(2, 2, 3, 0.65);
		color: #fff;
		cursor: pointer;
	}

	:global(.video-mute-toggle:hover) {
		border-color: var(--accent);
		color: var(--accent);
	}

	.nav-bar {
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		z-index: 20;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.6rem;
		padding: 0.55rem 0.55rem 0;
		pointer-events: none;
	}

	.nav-btn {
		pointer-events: auto;
		display: flex;
		height: 2.75rem;
		width: 2.75rem;
		cursor: pointer;
		align-items: center;
		justify-content: center;
		border: 2px solid color-mix(in oklab, white 55%, transparent);
		background: rgba(2, 2, 3, 0.78);
		clip-path: polygon(18% 0, 100% 0, 82% 100%, 0 100%);
		color: var(--color-mist-100);
		font-size: 1.4rem;
		line-height: 1;
		font-weight: 900;
		transition:
			background-color 0.15s ease,
			border-color 0.15s ease,
			transform 0.15s ease;
	}

	.nav-btn:hover,
	.nav-btn:focus-visible {
		background: var(--accent);
		border-color: var(--accent);
		color: #050505;
		transform: scale(1.1);
		outline: none;
	}

	.nav-counter {
		pointer-events: auto;
		min-width: 2.6rem;
		border: 2px solid color-mix(in oklab, white 30%, transparent);
		background: rgba(2, 2, 3, 0.78);
		padding: 0.35rem 0.55rem;
		text-align: center;
		font-size: 0.72rem;
		font-weight: 800;
		letter-spacing: 0.06em;
		color: var(--color-mist-100);
	}

	@media (min-width: 768px) {
		.nav-btn {
			height: 2rem;
			width: 2rem;
			font-size: 1.05rem;
		}
	}

	.media-caption {
		padding: 0.8rem 0.2rem 0 0.75rem;
		border-left: 4px solid color-mix(in oklab, var(--accent) 45%, transparent);
		transition:
			border-color 0.2s ease,
			box-shadow 0.2s ease,
			background-color 0.2s ease;
	}

	.media-card:hover .media-caption {
		border-left-color: var(--accent);
		background: color-mix(in oklab, var(--accent) 5%, transparent);
		box-shadow: -14px 0 34px -18px color-mix(in oklab, var(--accent) 70%, transparent);
	}

	.media-name {
		font-size: 0.95rem;
		font-weight: 900;
		letter-spacing: 0.01em;
		text-transform: uppercase;
		color: var(--accent);
	}

	.media-meta {
		margin-top: 0.15rem;
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: color-mix(in oklab, white 60%, transparent);
	}

	.media-subtitle {
		margin-top: 0.4rem;
		font-size: 0.75rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		color: color-mix(in oklab, white 85%, transparent);
	}

	.media-credits {
		margin-top: 0.5rem;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.72rem;
		font-weight: 700;
		color: color-mix(in oklab, white 75%, transparent);
	}

	.media-credits a {
		text-decoration: underline;
		text-decoration-color: color-mix(in oklab, white 45%, transparent);
		text-underline-offset: 2px;
	}

	.media-credits a:hover {
		text-decoration-color: var(--accent);
		color: var(--accent);
	}

	.media-credits-photo {
		display: inline-flex;
		align-items: center;
		gap: 0.25rem;
	}

	.media-tags {
		margin-top: 0.65rem;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.35rem 0.85rem;
		font-size: 0.68rem;
		font-weight: 800;
		letter-spacing: 0.06em;
	}

	.tag-assisted,
	.tag-capability {
		padding: 0.2rem 0.5rem;
		text-transform: uppercase;
	}

	.tag-assisted {
		background: color-mix(in oklab, white 10%, transparent);
		color: color-mix(in oklab, white 70%, transparent);
	}

	.tag-capability {
		background: color-mix(in oklab, var(--accent) 16%, transparent);
		color: var(--accent);
	}

	.tag-hash {
		color: color-mix(in oklab, var(--accent) 78%, white 12%);
		opacity: 0.85;
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
