<script lang="ts">
	import { ASSETS_HOST } from '$lib';
	import { eventCapabilitySections, type EventCapabilitySection } from '$lib/content/eventTech';
	import { fxDisabled } from '$lib/stores/reducedMotion';

	// Decorative layer geometry. Kept deterministic so SSR and client markup match.
	const eqBars = Array.from({ length: 26 }, (_, index) => index);
	const laserBeams = Array.from({ length: 7 }, (_, index) => index);
	const shockwaves = Array.from({ length: 3 }, (_, index) => index);
	const embers = Array.from({ length: 16 }, (_, index) => index);
	// Precomputed horizontal drift per ember: CSS calc() has no modulo operator.
	const emberDrift = embers.map((index) => `${((index % 5) - 2) * 16}px`);

	function sectionClass(section: EventCapabilitySection) {
		return `capability capability-${section.accent}`;
	}

	function mediaClasses(section: EventCapabilitySection) {
		return `capability-media layout-${section.layout} media-count-${Math.min(Math.max(section.images.length, 1), 4)}`;
	}

	/**
	 * Fades a tile in the first time it enters the viewport. Deliberately not a
	 * CSS scroll timeline: those report stale progress under some engines and can
	 * leave a tile stuck at partial opacity.
	 */
	function revealOnView(node: HTMLElement) {
		if (
			typeof IntersectionObserver === 'undefined' ||
			window.matchMedia('(prefers-reduced-motion: reduce)').matches
		) {
			node.classList.add('is-in-view');
			return {};
		}

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					node.classList.add('is-in-view');
					observer.disconnect();
				}
			},
			{ threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
		);

		observer.observe(node);
		return { destroy: () => observer.disconnect() };
	}
</script>

{#each eventCapabilitySections as section, sectionIndex (section.id)}
	<section
		id={section.slug}
		class={[
			sectionClass(section),
			sectionIndex % 2 === 1 ? 'section-flip' : '',
			'relative flex min-h-svh flex-col justify-center overflow-hidden px-6 py-[clamp(1rem,3.5svh,3.5rem)] sm:px-10 lg:h-svh lg:px-16'
		]}
		class:fx-paused={$fxDisabled}
		aria-labelledby={`${section.slug}-title`}
	>
		<!-- Per-section special effect layer -->
		<div
			class="capability-fx pointer-events-none absolute inset-0 z-0 overflow-hidden"
			aria-hidden="true"
		>
			{#if section.accent === 'multicolor'}
				<div class="fx-hue-blob"></div>
				<div class="fx-hue-blob fx-hue-blob-alt"></div>
				<div class="fx-scanlines"></div>
			{:else if section.accent === 'loud'}
				<div class="fx-eq">
					{#each eqBars as bar}
						<span class="fx-eq-bar" style={`--bar-index:${bar};`}></span>
					{/each}
				</div>
				<div class="fx-pulse-ring fx-pulse-ring-a"></div>
				<div class="fx-pulse-ring fx-pulse-ring-b"></div>
			{:else if section.accent === 'bright'}
				<div class="fx-laser-fan">
					{#each laserBeams as beam}
						<span class="fx-laser-beam" style={`--beam-index:${beam};`}></span>
					{/each}
				</div>
				<div class="fx-strobe"></div>
			{:else}
				<div class="fx-shockwaves">
					{#each shockwaves as wave}
						<span class="fx-shockwave" style={`--wave-index:${wave};`}></span>
					{/each}
				</div>
				<div class="fx-embers">
					{#each embers as ember}
						<span
							class="fx-ember"
							style={`--ember-index:${ember}; --ember-drift:${emberDrift[ember]};`}
						></span>
					{/each}
				</div>
				<div class="fx-flash"></div>
			{/if}
			<div class="capability-veil"></div>
		</div>

		<div class="relative z-10 mx-auto flex w-full max-w-7xl flex-col lg:h-full">
			<h2
				id={`${section.slug}-title`}
				class="capability-title mt-3 leading-[0.82] font-black tracking-tighter uppercase"
			>
				<span class="capability-lead block text-[clamp(1.15rem,min(4vw,3.2svh),3rem)]">
					I can do
				</span>
				<span
					class={`capability-keyword block text-[clamp(2.75rem,min(12vw,11svh),11rem)] keyword-${section.accent}`}
				>
					{section.keyword}
				</span>
			</h2>

			<div
				class="capability-grid mt-[clamp(1rem,3svh,2.75rem)] grid gap-9 lg:min-h-0 lg:flex-1 lg:grid-cols-[minmax(0,0.72fr)_minmax(0,1.28fr)] lg:items-stretch lg:gap-8"
			>
				<div class="capability-copy" data-animate>
					{#each section.body as paragraph}
						<p
							class="capability-body mt-[clamp(0.5rem,1.2svh,1rem)] text-[clamp(0.85rem,min(1.2vw,2.1svh),1.125rem)] leading-relaxed font-semibold text-mist-100/88 first:mt-0"
						>
							{paragraph}
						</p>
					{/each}

					<p
						class="capability-tools-label mt-[clamp(0.9rem,2.4svh,2rem)] text-[11px] font-black tracking-[0.2em] uppercase"
					>
						{section.toolsLabel}
					</p>
					<ul class="mt-2.5 grid gap-x-6 gap-y-1 sm:grid-cols-2">
						{#each section.tools as tool}
							<li
								class="capability-tool text-[clamp(0.76rem,min(1vw,1.7svh),0.92rem)] font-semibold text-mist-100/80"
							>
								{tool}
							</li>
						{/each}
					</ul>

					<p class="capability-credits mt-[clamp(1rem,2.6svh,2.25rem)]">
						<span class="capability-credits-label">Seen at</span>
						{section.credits}
					</p>
				</div>

				<div class={mediaClasses(section)} data-animate>
					{#each section.images as image, index}
						<figure class="media-tile" use:revealOnView>
							<img
								src={ASSETS_HOST + image.url}
								alt={image.alt}
								class="media-img"
								style={`object-position: ${image.focus ?? '50% 50%'};`}
								loading="lazy"
								decoding="async"
							/>
							<figcaption class="media-caption">{image.caption}</figcaption>
						</figure>
					{/each}
				</div>
			</div>
		</div>
	</section>
{/each}

<style>
	/* ── Section shells ──────────────────────────────────────────────────── */

	.capability {
		/* Anchor jumps must clear the fixed navbar. */
		scroll-margin-top: 4.5rem;
		isolation: isolate;
		background:
			radial-gradient(
				75% 60% at var(--glow-x, 12%) var(--glow-y, 0%),
				color-mix(in oklab, var(--accent) 13%, transparent),
				transparent 68%
			),
			linear-gradient(180deg, #05060a 0%, #020203 100%);
		border-top: 1px solid color-mix(in oklab, var(--accent) 16%, transparent);
	}

	.capability-colorful {
		--accent: #c026d3;
		--glow-x: 88%;
		--glow-y: 6%;
	}

	.capability-loud {
		--accent: var(--color-cyan-400);
		--glow-x: 6%;
		--glow-y: 100%;
	}

	.capability-bright {
		--accent: var(--color-electric-400);
		--glow-x: 92%;
		--glow-y: 92%;
	}

	.capability-boom {
		--accent: #ff8a1f;
		--glow-x: 50%;
		--glow-y: 0%;
	}

	/* Every other section mirrors: mosaic left, copy right. Alternating sides
	   keeps the eye moving down the page instead of hitting the same layout. */
	@media (min-width: 1024px) {
		/* Mirroring swaps the DOM order, so the column ratio must swap with it,
		   otherwise the copy ends up in the wide column. */
		.section-flip .capability-grid {
			grid-template-columns: minmax(0, 1.28fr) minmax(0, 0.72fr);
		}

		.section-flip .capability-grid > .capability-copy {
			order: 2;
		}

		.section-flip .capability-grid > .capability-media {
			order: 1;
		}

		.section-flip .capability-title,
		.section-flip .capability-eyebrow {
			text-align: right;
		}
	}

	/* Per-section keyword anchoring: each catch phrase enters differently. */
	.capability-colorful .capability-keyword {
		margin-left: -0.02em;
	}

	.capability-loud .capability-title {
		letter-spacing: -0.06em;
	}

	.capability-bright .capability-title {
		letter-spacing: -0.035em;
	}

	.capability-boom .capability-keyword {
		letter-spacing: -0.065em;
	}

	.capability-veil {
		position: absolute;
		inset: 0;
		background: linear-gradient(
			180deg,
			rgb(2 2 3 / 0.55) 0%,
			rgb(2 2 3 / 0.28) 55%,
			rgb(2 2 3 / 0.6) 100%
		);
	}

	/* ── Catch phrase ────────────────────────────────────────────────────── */

	.capability-lead {
		color: color-mix(in oklab, var(--color-mist-100) 55%, transparent);
		letter-spacing: 0.02em;
	}

	.capability-keyword {
		will-change: filter;
	}

	.keyword-multicolor {
		background-image: linear-gradient(100deg, #ff2f92, #ffd400, #22d3ee, #8b5cf6, #ff2f92);
		background-size: 300% 100%;
		background-clip: text;
		color: transparent;
		animation: keyword-hue 14s linear infinite;
	}

	.keyword-loud {
		color: #eaf6ff;
		text-shadow:
			0 0 24px color-mix(in oklab, var(--color-cyan-400) 55%, transparent),
			0 0 90px color-mix(in oklab, var(--color-cyan-400) 28%, transparent);
		animation: keyword-thump 2.4s ease-in-out infinite;
	}

	.keyword-bright {
		color: #ffffff;
		text-shadow:
			0 0 18px rgb(255 255 255 / 0.55),
			0 0 80px color-mix(in oklab, var(--color-electric-400) 60%, transparent),
			0 0 160px color-mix(in oklab, var(--color-electric-400) 30%, transparent);
		animation: keyword-flicker 6s ease-in-out infinite;
	}

	.keyword-boom {
		background-image: linear-gradient(100deg, #ffd166 0%, #ff8a1f 45%, #ff4d1f 100%);
		background-clip: text;
		color: transparent;
		filter: drop-shadow(0 0 34px rgb(255 122 24 / 0.45));
		animation: keyword-flicker 4.5s ease-in-out infinite;
	}

	@keyframes keyword-hue {
		to {
			background-position: 300% 0;
		}
	}

	@keyframes keyword-thump {
		0%,
		100% {
			transform: scale(1);
		}

		6% {
			transform: scale(1.014);
		}

		12% {
			transform: scale(1);
		}

		18% {
			transform: scale(1.008);
		}

		24% {
			transform: scale(1);
		}
	}

	@keyframes keyword-flicker {
		0%,
		100% {
			filter: brightness(1);
		}

		42% {
			filter: brightness(1);
		}

		44% {
			filter: brightness(1.35);
		}

		46% {
			filter: brightness(1);
		}

		70% {
			filter: brightness(1.18);
		}

		72% {
			filter: brightness(1);
		}
	}

	.capability-tools-label {
		color: color-mix(in oklab, var(--accent) 85%, white);
	}

	.capability-tool {
		position: relative;
		padding-left: 0.9rem;
		line-height: 1.45;
	}

	.capability-tool::before {
		content: '';
		position: absolute;
		top: 0.55em;
		left: 0;
		height: 0.4em;
		width: 0.4em;
		background: var(--accent);
		box-shadow: 0 0 10px color-mix(in oklab, var(--accent) 70%, transparent);
		transform: rotate(45deg);
	}

	/* No max-width: the copy fills its column, so there is no unused band
	   between the text and the photos. */
	.capability-copy {
		min-width: 0;
	}

	/* The row is now as tall as the screen allows, so the photos are large.
	   `space-between` spreads the copy's blocks over that height instead of
	   pooling the slack above and below the text. */
	@media (min-width: 1024px) {
		.capability-copy {
			display: flex;
			flex-direction: column;
			/* justify-content: space-between; */
			gap: clamp(0.75rem, 2svh, 1.6rem);
		}
	}

	.capability-credits {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		gap: 0.5rem;
		max-width: 30rem;
		padding-top: clamp(0.7rem, 1.8svh, 1.2rem);
		border-top: 1px solid color-mix(in oklab, var(--accent) 28%, transparent);
		font-size: clamp(0.72rem, min(0.9vw, 1.5svh), 0.82rem);
		font-weight: 700;
		letter-spacing: 0.06em;
		line-height: 1.5;
		text-transform: uppercase;
		color: color-mix(in oklab, var(--color-mist-100) 62%, transparent);
	}

	.capability-credits-label {
		font-size: 0.66rem;
		font-weight: 900;
		letter-spacing: 0.18em;
		color: color-mix(in oklab, var(--accent) 88%, white);
	}

	/* ── Media mosaic: shared tiles ─────────────────────────────────────── */

	.capability-media {
		position: relative;
		/* Grid children default to min-width:auto, which would let a wide track
		   blow the columns out. */
		min-width: 0;
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 0.7rem;
		/* Stacked layouts have no copy column to size against, so the mosaic
		   supplies its own height instead of stretching to the row. */
		align-self: start;
		height: clamp(14rem, 42svh, 26rem);
	}

	.media-tile {
		position: relative;
		overflow: hidden;
		aspect-ratio: 4 / 3;
		background: #06070c;
		border: 1px solid color-mix(in oklab, var(--accent) 26%, transparent);
		transition:
			opacity 0.55s ease,
			translate 0.55s cubic-bezier(0.22, 0.85, 0.3, 1),
			transform 0.55s cubic-bezier(0.22, 0.85, 0.3, 1),
			border-color 0.25s ease,
			box-shadow 0.25s ease;
	}

	.media-img {
		height: 100%;
		width: 100%;
		object-fit: cover;
		filter: saturate(1.08);
		transition:
			transform 0.55s cubic-bezier(0.22, 0.85, 0.3, 1),
			filter 0.4s ease;
	}

	.media-tile:hover {
		border-color: var(--accent);
		box-shadow:
			0 0 0 1px color-mix(in oklab, var(--accent) 60%, transparent),
			0 22px 44px -16px color-mix(in oklab, var(--accent) 65%, transparent);
	}

	.media-tile:hover .media-img {
		transform: scale(1.06);
		filter: saturate(1.2);
	}

	.media-caption {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		padding: 1.4rem 0.7rem 0.5rem;
		font-size: 0.66rem;
		font-weight: 800;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: color-mix(in oklab, var(--accent) 80%, white);
		background: linear-gradient(to top, rgb(0 0 0 / 0.88), transparent);
		opacity: 0;
		transform: translateY(6px);
		transition:
			opacity 0.22s ease,
			transform 0.22s ease;
	}

	.media-tile:hover .media-caption,
	.media-tile:focus-within .media-caption {
		opacity: 1;
		transform: translateY(0);
	}

	@media (hover: none) {
		.media-caption {
			opacity: 1;
			transform: none;
		}
	}

	/* ── Layouts ────────────────────────────────────────────────────────── */

	/* Every layout is a plain CSS grid of tiles: no rotation, no absolute
	   positioning, no negative margins, no vertical offsets. The tiles fill
	   their cells, so they are always aligned with each other and always inside
	   their column. The four layouts differ only in how the grid is divided
	   and in the proportions of its tracks.

	   Spans are written out per image count, because a tile with nowhere to go
	   lands in an implicit row that collapses to nothing. */

	/* 1 · GRID - even 2x2. */
	.layout-grid {
		grid-template-columns: repeat(2, minmax(0, 1fr));
		grid-template-rows: repeat(2, minmax(0, 1fr));
	}

	.layout-grid.media-count-2 {
		grid-template-columns: repeat(2, minmax(0, 1fr));
		grid-template-rows: minmax(0, 1fr);
	}

	.layout-grid.media-count-3 > .media-tile:first-child {
		grid-column: 1 / -1;
	}

	/* 2 · FAN - one tall feature frame, the rest stacked beside it. */
	.layout-fan {
		grid-template-columns: 1.25fr 1fr;
		grid-template-rows: repeat(3, minmax(0, 1fr));
	}

	.layout-fan > .media-tile:nth-child(1) {
		grid-column: 1;
		grid-row: 1 / -1;
	}

	.layout-fan > .media-tile:nth-child(2) {
		grid-column: 2;
		grid-row: 1;
	}

	.layout-fan > .media-tile:nth-child(3) {
		grid-column: 2;
		grid-row: 2;
	}

	.layout-fan > .media-tile:nth-child(4) {
		grid-column: 2;
		grid-row: 3;
	}

	.layout-fan.media-count-2 {
		grid-template-columns: repeat(2, minmax(0, 1fr));
		grid-template-rows: minmax(0, 1fr);
	}

	.layout-fan.media-count-2 > .media-tile:nth-child(1) {
		grid-row: auto;
	}

	.layout-fan.media-count-3 {
		grid-template-columns: 1.25fr 1fr;
		grid-template-rows: repeat(2, minmax(0, 1fr));
	}

	.layout-fan.media-count-3 > .media-tile:nth-child(3) {
		grid-row: 2;
	}

	/* 3 · STRIP - a tall frame, a column of two, and a wide one underneath. */
	.layout-strip {
		grid-template-columns: 1.1fr 1fr 1fr;
		grid-template-rows: repeat(2, minmax(0, 1fr));
	}

	.layout-strip > .media-tile:nth-child(1) {
		grid-column: 1;
		grid-row: 1 / -1;
	}

	.layout-strip > .media-tile:nth-child(2) {
		grid-column: 2;
		grid-row: 1;
	}

	.layout-strip > .media-tile:nth-child(3) {
		grid-column: 3;
		grid-row: 1;
	}

	.layout-strip > .media-tile:nth-child(4) {
		grid-column: 2 / -1;
		grid-row: 2;
	}

	.layout-strip.media-count-2 {
		grid-template-columns: repeat(2, minmax(0, 1fr));
		grid-template-rows: minmax(0, 1fr);
	}

	.layout-strip.media-count-2 > .media-tile:nth-child(1) {
		grid-row: auto;
	}

	.layout-strip.media-count-3 {
		grid-template-columns: repeat(2, minmax(0, 1fr));
		grid-template-rows: repeat(2, minmax(0, 1fr));
	}

	.layout-strip.media-count-3 > .media-tile:nth-child(1) {
		grid-column: 1 / -1;
		grid-row: 1;
	}

	.layout-strip.media-count-3 > .media-tile:nth-child(2) {
		grid-column: 1;
		grid-row: 2;
	}

	.layout-strip.media-count-3 > .media-tile:nth-child(3) {
		grid-column: 2;
		grid-row: 2;
	}

	/* 4 · SCATTER - an uneven 2x2: wide left, shorter top row. */
	.layout-scatter {
		grid-template-columns: 1.35fr 1fr;
		grid-template-rows: 1fr 1.2fr;
	}

	.layout-scatter.media-count-2 {
		grid-template-columns: repeat(2, minmax(0, 1fr));
		grid-template-rows: minmax(0, 1fr);
	}

	.layout-scatter.media-count-3 > .media-tile:first-child {
		grid-column: 1 / -1;
	}

	/* Tiles fill their cell; the ratio is only a fallback before the grid
	   supplies a height. */
	.capability-media > .media-tile {
		aspect-ratio: auto;
		height: 100%;
		min-height: 0;
	}

	/* ── Effect: COLORFUL - rotating colour wheel ───────────────────────── */

	.fx-hue-blob {
		position: absolute;
		top: -22%;
		right: -12%;
		height: 62vmax;
		width: 62vmax;
		max-height: 820px;
		max-width: 820px;
		border-radius: 50%;
		background: conic-gradient(from 0deg, #ff2f92, #ffd400, #22d3ee, #3b82f6, #a855f7, #ff2f92);
		filter: blur(90px);
		opacity: 0.22;
		animation:
			fx-spin 38s linear infinite,
			fx-breathe 9s ease-in-out infinite;
	}

	.fx-hue-blob-alt {
		top: auto;
		right: auto;
		bottom: -28%;
		left: -14%;
		height: 48vmax;
		width: 48vmax;
		max-height: 640px;
		max-width: 640px;
		opacity: 0.16;
		animation:
			fx-spin-reverse 52s linear infinite,
			fx-breathe 12s ease-in-out infinite;
	}

	.fx-scanlines {
		position: absolute;
		inset: 0;
		background: repeating-linear-gradient(
			180deg,
			rgb(255 255 255 / 0.05) 0px,
			rgb(255 255 255 / 0.05) 1px,
			transparent 1px,
			transparent 4px
		);
		opacity: 0.35;
		mix-blend-mode: overlay;
		animation: fx-scan 7s linear infinite;
	}

	@keyframes fx-spin {
		to {
			transform: rotate(360deg);
		}
	}

	@keyframes fx-spin-reverse {
		to {
			transform: rotate(-360deg);
		}
	}

	@keyframes fx-breathe {
		0%,
		100% {
			opacity: 0.16;
		}

		50% {
			opacity: 0.32;
		}
	}

	@keyframes fx-scan {
		to {
			background-position: 0 80px;
		}
	}

	/* ── Effect: LOUD - equalizer + bass pulse ──────────────────────────── */

	.fx-eq {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		display: flex;
		align-items: flex-end;
		justify-content: center;
		gap: clamp(3px, 0.6vw, 8px);
		height: 34%;
		padding: 0 2%;
		opacity: 0.5;
		mask-image: linear-gradient(to top, #000 0%, transparent 92%);
	}

	.fx-eq-bar {
		flex: 1 1 0;
		max-width: 34px;
		height: 100%;
		transform-origin: bottom;
		background: linear-gradient(
			to top,
			color-mix(in oklab, var(--color-cyan-400) 85%, transparent),
			color-mix(in oklab, var(--color-electric-400) 70%, transparent) 55%,
			transparent
		);
		transform: scaleY(0.18);
		animation: fx-eq-bounce 1.6s ease-in-out infinite;
		animation-delay: calc(var(--bar-index) * -0.13s);
	}

	@keyframes fx-eq-bounce {
		0%,
		100% {
			transform: scaleY(0.14);
		}

		35% {
			transform: scaleY(0.72);
		}

		55% {
			transform: scaleY(0.34);
		}

		75% {
			transform: scaleY(0.92);
		}
	}

	.fx-pulse-ring {
		position: absolute;
		top: 18%;
		left: 4%;
		height: 46vmin;
		width: 46vmin;
		border: 1px solid color-mix(in oklab, var(--color-cyan-400) 45%, transparent);
		border-radius: 50%;
		opacity: 0;
		animation: fx-bass-pulse 2.4s ease-out infinite;
	}

	.fx-pulse-ring-b {
		animation-delay: 1.2s;
	}

	@keyframes fx-bass-pulse {
		0% {
			transform: scale(0.55);
			opacity: 0.45;
		}

		100% {
			transform: scale(1.35);
			opacity: 0;
		}
	}

	/* ── Effect: BRIGHT - laser fan + strobe ────────────────────────────── */

	.fx-laser-fan {
		position: absolute;
		top: -8%;
		left: 62%;
		height: 150%;
		width: 2px;
		transform-origin: top center;
		animation: fx-fan-sweep 11s ease-in-out infinite alternate;
	}

	.fx-laser-beam {
		position: absolute;
		top: 0;
		left: 0;
		height: 120vmax;
		width: 2px;
		transform-origin: top center;
		background: linear-gradient(to bottom, rgb(255 255 255 / 0.85), rgb(255 255 255 / 0));
		filter: blur(0.5px) drop-shadow(0 0 6px rgb(180 220 255 / 0.85));
		transform: rotate(calc((var(--beam-index) - 3) * 6deg));
		opacity: 0.4;
		animation: fx-beam-glow 5.5s ease-in-out infinite;
		animation-delay: calc(var(--beam-index) * -0.6s);
	}

	.fx-strobe {
		position: absolute;
		inset: 0;
		background: radial-gradient(60% 50% at 50% 30%, rgb(255 255 255 / 0.5), transparent 70%);
		opacity: 0;
		animation: fx-strobe-flash 7s steps(1, end) infinite;
	}

	@keyframes fx-fan-sweep {
		from {
			transform: rotate(-13deg);
		}

		to {
			transform: rotate(13deg);
		}
	}

	@keyframes fx-beam-glow {
		0%,
		100% {
			opacity: 0.22;
		}

		50% {
			opacity: 0.6;
		}
	}

	@keyframes fx-strobe-flash {
		0%,
		92%,
		100% {
			opacity: 0;
		}

		93% {
			opacity: 0.55;
		}

		94% {
			opacity: 0;
		}

		95% {
			opacity: 0.4;
		}

		96% {
			opacity: 0;
		}
	}

	/* ── Effect: BOOM - shockwaves, embers, flash ───────────────────────── */

	.fx-shockwaves {
		position: absolute;
		top: 34%;
		right: 12%;
		height: 2px;
		width: 2px;
	}

	.fx-shockwave {
		position: absolute;
		top: 0;
		left: 0;
		height: 52vmin;
		width: 52vmin;
		margin: calc(-26vmin) 0 0 calc(-26vmin);
		border: 2px solid color-mix(in oklab, var(--accent) 55%, transparent);
		border-radius: 50%;
		opacity: 0;
		animation: fx-shock 4.5s cubic-bezier(0.2, 0.7, 0.3, 1) infinite;
		animation-delay: calc(var(--wave-index) * 1.5s);
	}

	@keyframes fx-shock {
		0% {
			transform: scale(0.08);
			opacity: 0;
			border-width: 6px;
		}

		8% {
			opacity: 0.7;
		}

		100% {
			transform: scale(1.7);
			opacity: 0;
			border-width: 1px;
		}
	}

	.fx-embers {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 65%;
	}

	.fx-ember {
		position: absolute;
		bottom: -2%;
		left: calc((var(--ember-index) * 6.3%) + 1%);
		height: 3px;
		width: 3px;
		border-radius: 50%;
		background: #ffb347;
		box-shadow: 0 0 10px 2px rgb(255 138 31 / 0.7);
		opacity: 0;
		animation: fx-ember-rise 5.5s ease-in infinite;
		animation-delay: calc(var(--ember-index) * -0.37s);
	}

	@keyframes fx-ember-rise {
		0% {
			transform: translate3d(0, 0, 0) scale(0.6);
			opacity: 0;
		}

		15% {
			opacity: 0.9;
		}

		70% {
			opacity: 0.7;
		}

		100% {
			transform: translate3d(var(--ember-drift), -42vh, 0) scale(1.1);
			opacity: 0;
		}
	}

	.fx-flash {
		position: absolute;
		inset: 0;
		background: radial-gradient(
			45% 40% at 50% 44%,
			rgb(255 176 96 / 0.55),
			rgb(255 110 30 / 0.12) 45%,
			transparent 72%
		);
		opacity: 0;
		animation: fx-boom-flash 6s ease-out infinite;
	}

	@keyframes fx-boom-flash {
		0% {
			opacity: 0;
		}

		1% {
			opacity: 0.85;
		}

		9% {
			opacity: 0.05;
		}

		16% {
			opacity: 0.25;
		}

		26%,
		100% {
			opacity: 0;
		}
	}

	/* ── FX toggle / reduced motion ─────────────────────────────────────── */

	.fx-paused * {
		animation-play-state: paused !important;
	}

	@media (prefers-reduced-motion: reduce) {
		.capability-fx * {
			animation: none !important;
		}

		.capability-fx {
			opacity: 0.55;
		}
	}

	/* ── Large screens ──────────────────────────────────────────────────── */

	@media (min-width: 1024px) {
		/* `height: 0` + `min-height: 100%` makes the mosaic exactly as tall as
		   the copy column beside it. The tiles contribute no intrinsic height,
		   so the row is sized by the text alone; the 100% then resolves against
		   that height. A plain `height: 100%` is circular here and browsers fall
		   back to the content height instead. */
		.capability-media {
			align-self: stretch;
			height: 0;
			min-height: 100%;
		}

		/* Track proportions tuned for the wide desktop columns; the tracks are
		   free to be flatter on narrow screens. */
		.layout-fan {
			grid-template-columns: 1.2fr 1fr;
		}

		.layout-strip {
			grid-template-columns: 1.1fr 1fr 1fr;
		}
	}

	/* ── Tile entrance: staggered, driven by an IntersectionObserver ─────── */

	@media (prefers-reduced-motion: no-preference) {
		.media-tile {
			opacity: 0;
			translate: 0 18px;
		}

		.media-tile.is-in-view {
			opacity: 1;
			translate: 0 0;
			transition-delay: calc(var(--tile-index, 0) * 90ms);
		}
	}
</style>
