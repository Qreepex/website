<script lang="ts">
	import { goto } from '$app/navigation';
	import { fxDisabled } from '$lib/stores/reducedMotion';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { onMount } from 'svelte';

	gsap.registerPlugin(ScrollTrigger);

	let sectionEl: HTMLElement | null = null;
	let transitionLayerEl: HTMLDivElement | null = null;
	let navigating = $state(false);

	function playTransition(accent: 'violet' | 'electric', originEl: HTMLElement | null) {
		navigating = true;
		const layer = transitionLayerEl;
		if (!layer) return;

		layer.style.setProperty(
			'--transition-accent',
			accent === 'violet' ? 'var(--color-violet-500)' : 'var(--color-electric-400)'
		);

		const rect = originEl?.getBoundingClientRect();
		const clipAt = (percent: number) => {
			if (!rect) return `inset(${(100 - percent) / 2}% ${(100 - percent) / 2}%)`;
			const centerY = ((rect.top + rect.bottom) / 2 / window.innerHeight) * 100;
			const centerX = ((rect.left + rect.right) / 2 / window.innerWidth) * 100;
			const half = (percent * 150) / 2;
			return `inset(${centerY - half}% ${100 - centerX - half}% ${100 - centerY - half}% ${centerX - half}%)`;
		};

		if (rect) {
			gsap.fromTo(
				layer,
				{ clipPath: clipAt(0), opacity: 0.55 },
				{
					clipPath: clipAt(100),
					opacity: 1,
					duration: 0.55,
					ease: 'power3.inOut',
					onComplete: () => layer.classList.add('is-solid')
				}
			);
		} else {
			gsap.to(layer, {
				opacity: 1,
				duration: 0.3,
				ease: 'power1.inOut',
				onComplete: () => layer.classList.add('is-solid')
			});
		}
	}

	async function chooseEventTech(event: MouseEvent) {
		event.preventDefault();
		if (navigating) return;

		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			void goto('/event-tech');
			return;
		}

		playTransition('violet', event.currentTarget as HTMLElement);
		await goto('/event-tech');
	}

	onMount(() => {
		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		let pinTrigger: ScrollTrigger | null = null;

		function setup() {
			if (!sectionEl || pinTrigger) return;
			const face = sectionEl.querySelector<HTMLElement>('[data-split-face]');
			if (!face) return;

			// Pre-set entrance state so the scrub starts from a thumbnail.
			gsap.set(face, { scale: 0.82, yPercent: 6, opacity: 0.35, force3D: true });

			const expandTl = gsap.timeline({ paused: true });
			expandTl
				.to(face, {
					scale: 1,
					yPercent: 0,
					opacity: 1,
					duration: 4,
					ease: 'power2.out',
					force3D: true
				})
				// Hold at full expansion for the remaining scroll runway.
				.to(face, { duration: 5 });

			pinTrigger = ScrollTrigger.create({
				trigger: sectionEl,
				start: 'top top',
				end: 'bottom bottom',
				scrub: 0.35,
				animation: expandTl
			});
		}

		function teardown() {
			pinTrigger?.kill();
			pinTrigger = null;
			const face = sectionEl?.querySelector<HTMLElement>('[data-split-face]');
			if (face) gsap.set(face, { clearProps: 'all', opacity: 1, scale: 1, yPercent: 0 });
		}

		// React to the global FX toggle as well as prefers-reduced-motion so the
		// animation mounts/unmounts live instead of being decided once at page load.
		if (!reduced) setup();
		const unsubFx = fxDisabled.subscribe((disabled) => {
			if (reduced) return;
			if (disabled) teardown();
			else if (!pinTrigger) setup();
		});

		// If the user navigates back from /event-tech, reveal any stale state
		// left behind by the outgoing transition instead of staying dark.
		const onPageShow = (event: PageTransitionEvent) => {
			if (!event.persisted) return;
			navigating = false;
			gsap.set(transitionLayerEl, { clearProps: 'all', opacity: 0 });
		};
		window.addEventListener('pageshow', onPageShow);

		return () => {
			window.removeEventListener('pageshow', onPageShow);
			unsubFx();
			teardown();
		};
	});
</script>

<section bind:this={sectionEl} data-split-screen class="relative h-[210svh] bg-[#020203]">
	<div
		data-split-face
		class="sticky top-0 flex h-screen w-full flex-col items-center justify-center px-6 sm:px-10 lg:px-16"
	>
		<h2 class="mb-8 text-center text-xs font-semibold tracking-[0.24em] text-mist-100/60 uppercase">
			Two worlds - pick yours
		</h2>

		<div
			class="grid w-full max-w-6xl gap-4 sm:grid-cols-2 sm:gap-6"
			role="group"
			aria-label="Choose which side of my portfolio to explore"
		>
			<a
				href="/event-tech"
				data-split-side
				onclick={chooseEventTech}
				class="split-half split-event group relative flex min-h-[42svh] flex-col justify-center overflow-hidden border p-8 sm:min-h-[56svh] sm:p-12"
				class:pointer-events-none={navigating}
			>
				<div class="split-bg split-bg-event" aria-hidden="true"></div>
				<div class="relative">
					<p class="split-kicker text-violet-300">Looking for event tech?</p>
					<p class="split-title title-gradient-vivid">Event Tech</p>
					<p class="split-sub">Sound · Light · Lasers · Stages</p>
					<p class="split-desc">
						Hamburg-based tech for concerts, clubs, festivals and corporate - FOH sound, light
						design, licensed laser shows and full production.
					</p>
					<span class="split-cta split-cta-event">
						Continue to Event Work
						<span class="split-arrow" aria-hidden="true">→</span>
					</span>
				</div>
			</a>

			<a
				href="#about"
				data-split-side
				class="split-half split-dev group relative flex min-h-[42svh] flex-col justify-center overflow-hidden border p-8 sm:min-h-[56svh] sm:p-12"
				class:pointer-events-none={navigating}
			>
				<div class="split-bg split-bg-dev" aria-hidden="true"></div>
				<div class="relative">
					<p class="split-kicker text-electric-400">Looking for a developer?</p>
					<p class="split-title title-gradient-electric">Dev Work</p>
					<p class="split-sub">Cloud · Backend · Svelte</p>
					<p class="split-desc">
						Fullstack engineering for cloud-native systems - scroll down for projects, skills and
						references.
					</p>
					<span class="split-cta split-cta-dev">
						Continue to Dev
						<span class="split-arrow" aria-hidden="true">↓</span>
					</span>
				</div>
			</a>
		</div>

		<p class="sr-only">
			This section lets you jump directly to the event technology portfolio or continue scrolling to
			the developer portfolio below.
		</p>
	</div>
</section>

<div
	bind:this={transitionLayerEl}
	data-page-transition
	class:pointer-events-none={!navigating}
	class="transition-layer"
	class:is-solid={navigating}
	aria-hidden="true"
></div>

<style>
	.split-half {
		border-color: color-mix(in oklab, white 14%, transparent);
		background: rgb(2 2 3 / 60%);
		transition:
			border-color 0.25s ease,
			transform 0.25s cubic-bezier(0.22, 0.85, 0.3, 1.35),
			box-shadow 0.25s ease;
	}

	.split-event {
		--half-accent: var(--color-violet-400);
	}

	.split-dev {
		--half-accent: var(--color-electric-400);
	}

	.split-half:hover {
		border-color: var(--half-accent);
		transform: translateY(-3px);
		box-shadow:
			0 0 0 2px var(--half-accent),
			0 30px 60px -22px color-mix(in oklab, var(--half-accent) 55%, transparent),
			0 0 70px -14px color-mix(in oklab, var(--half-accent) 40%, transparent);
	}

	.split-bg {
		position: absolute;
		inset: 0;
		pointer-events: none;
		opacity: 0.85;
		transition: opacity 0.3s ease;
	}

	.split-bg-event {
		background:
			radial-gradient(
				75% 85% at 20% 90%,
				color-mix(in oklab, var(--color-violet-500) 26%, transparent),
				transparent
			),
			radial-gradient(
				60% 70% at 85% 15%,
				color-mix(in oklab, #ff2f92 14%, transparent),
				transparent
			);
	}

	.split-bg-dev {
		background:
			radial-gradient(
				75% 85% at 18% 12%,
				color-mix(in oklab, var(--color-electric-500) 24%, transparent),
				transparent
			),
			radial-gradient(
				60% 70% at 88% 92%,
				color-mix(in oklab, var(--color-cyan-400) 15%, transparent),
				transparent
			);
	}

	.split-half:hover .split-bg {
		opacity: 1;
	}

	.split-kicker {
		font-size: 0.72rem;
		font-weight: 800;
		letter-spacing: 0.22em;
		text-transform: uppercase;
	}

	.split-title {
		display: block;
		margin-top: 0.9rem;
		font-size: clamp(2.2rem, 6vw, 4.5rem);
		font-weight: 900;
		line-height: 0.95;
		letter-spacing: -0.045em;
		text-transform: uppercase;
	}

	.split-sub {
		margin-top: 0.85rem;
		font-size: 0.85rem;
		font-weight: 800;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		color: color-mix(in oklab, var(--color-mist-100) 75%, transparent);
	}

	.split-desc {
		margin-top: 1.1rem;
		max-width: 40ch;
		font-size: 0.95rem;
		line-height: 1.65;
		font-weight: 600;
		color: color-mix(in oklab, var(--color-mist-100) 72%, transparent);
	}

	.split-cta {
		margin-top: 2rem;
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.75rem 1.3rem;
		border: 2px solid var(--half-accent);
		background: color-mix(in oklab, var(--half-accent) 14%, transparent);
		color: var(--color-mist-100);
		font-size: 0.8rem;
		font-weight: 900;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		clip-path: polygon(5% 0, 100% 0, 95% 100%, 0 100%);
		transition:
			background-color 0.2s ease,
			color 0.2s ease;
	}

	.split-half:hover .split-cta {
		background: var(--half-accent);
		color: #050505;
	}

	.split-arrow {
		display: inline-block;
		transition: transform 0.2s cubic-bezier(0.22, 0.85, 0.3, 1.35);
	}

	.split-half:hover .split-arrow {
		transform: translateX(4px);
	}

	.split-dev:hover .split-arrow {
		transform: translateY(3px);
	}

	.transition-layer {
		position: fixed;
		inset: 0;
		z-index: 80;
		pointer-events: none;
		opacity: 0;
		background: #020203;
		background-image: radial-gradient(
			85% 85% at 50% 50%,
			color-mix(in oklab, var(--transition-accent, var(--color-violet-500)) 24%, transparent),
			transparent
		);
	}

	.transition-layer.is-solid {
		opacity: 1;
		clip-path: inset(0 0 0 0) !important;
	}
</style>
