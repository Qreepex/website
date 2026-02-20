<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import Footer from '$lib/page/Footer.svelte';
	import Navbar from '$lib/page/Navbar.svelte';
	import AboutSection from '$lib/content/AboutSection.svelte';
	import SkillsSection from '$lib/content/SkillsSection.svelte';
	import ProjectsSection from '$lib/content/ProjectsSection.svelte';

	gsap.registerPlugin(ScrollTrigger);

	// ── FX store ─────────────────────────────────────────────────────────
	import { fxDisabled } from '$lib/stores/reducedMotion';

	// Module-level refs so the $effect can reach inside onMount closures
	let _stopFn: () => void = () => {};
	let _videoElRef: HTMLVideoElement | null = null;
	let _isEventModeRef = { value: false };

	$effect(() => {
		const rm = $fxDisabled;
		if (!_videoElRef) return;
		if (rm) {
			_videoElRef.pause();
			_stopFn();
		} else {
			// Re-enable: play video only if in event mode, otherwise glitch restarts naturally
			if (_isEventModeRef.value) _videoElRef.play().catch(() => {});
		}
	});
	// ─────────────────────────────────────────────────────────────────────

	const skillGroups = [
		{
			title: 'Fullstack & Platform',
			items: ['Cloud Native', 'AI Integration', 'Rust', 'Go', 'TypeScript', 'Java']
		},
		{
			title: 'Event Technology',
			items: [
				'grandMA2',
				'grandMA3',
				'L-Acoustics',
				'Show Networking',
				'Lighting Design',
				'Live Systems'
			]
		}
	];

	const projects = [
		{
			title: 'Aurora Control Mesh',
			domain: 'Cloud + Event Ops',
			description:
				'Placeholder project for a distributed control plane connecting venue hardware telemetry with real-time cloud dashboards.',
			tech: ['Go', 'Kubernetes', 'NATS', 'TypeScript']
		},
		{
			title: 'Lumen AI Programmer',
			domain: 'Lighting + AI',
			description:
				'Placeholder concept for AI-assisted fixture programming that proposes cues and transitions for live shows.',
			tech: ['Rust', 'Python', 'WebAssembly', 'grandMA3']
		},
		{
			title: 'StagePulse Runtime',
			domain: 'Realtime Systems',
			description:
				'Placeholder runtime orchestrating video, audio and lighting trigger timelines with millisecond precision.',
			tech: ['Java', 'gRPC', 'Redis', 'L-Acoustics']
		}
	];

	const profileLinks = [
		{ label: 'GitHub', href: 'https://github.com/', external: true },
		{ label: 'LinkedIn', href: 'https://linkedin.com/', external: true },
		{ label: 'X / Twitter', href: 'https://x.com/', external: true }
	];

	const legalLinks = [
		{ label: 'Impressum', href: '/impressum' },
		{ label: 'Datenschutz', href: '/privacy' },
		{ label: 'Kontakt', href: '/contact' }
	];

	const navLinks = [
		{ label: 'About', href: '#about' },
		{ label: 'Projects', href: '#projects' },
		{ label: 'Links', href: '#footer' }
	];

	const APP_READY_EVENT = 'app:ready';

	onMount(() => {
		let glitchStart: ReturnType<typeof setTimeout> | null = null;
		let typingTimer: ReturnType<typeof setTimeout> | null = null;
		let stopGlitch: () => void = () => {};
		let startHeroTyping: () => void = () => {};

		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			ScrollTrigger.create({
				trigger: '[data-hero-pin]',
				start: 'top top',
				end: '+=2800',
				pin: true,
				anticipatePin: 1
			});
			gsap.set('[data-hero-line2]', { yPercent: 0, opacity: 1 });
		} else {
			// Page-load entrance animations
			gsap.fromTo(
				'[data-hero-eyebrow]',
				{ y: 20, opacity: 0 },
				{ y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
			);

			// Start line2 near the bottom of the viewport, transparent
			gsap.set('[data-hero-line2]', { y: window.innerHeight * 0.72, opacity: 0 });

			// Timeline: travel up from bottom + fade in, slam content to top, then long dwell
			const pinTl = gsap.timeline();
			pinTl
				// Phase 1: line2 travels up from bottom (~33% of total scroll)
				.to('[data-hero-line2]', {
					y: 0,
					opacity: 1,
					ease: 'power2.out',
					duration: 1
				})
				// Phase 2: brief pause (~3%)
				.to('[data-hero-line2]', { duration: 0.1 })
				// Phase 3: content slams to top + shrinks so video breathes (~12%)
				.to('[data-hero-content]', {
					y: () => -(window.innerHeight * 0.2),
					scale: 0.42,
					transformOrigin: 'left top',
					duration: 0.35,
					ease: 'power3.in'
				})
				// Phase 4: long dwell — users sit in event-tech mode (~52%)
				.to('[data-hero-content]', { duration: 1.6 });

			// — Video starts hidden; fades in when event-tech line arrives —
			const videoEl = document.querySelector<HTMLVideoElement>('[data-hero-video]');
			const overlayEl = document.querySelector<HTMLElement>('[data-hero-overlay]');
			const scrimEl = document.querySelector<HTMLElement>('[data-hero-text-scrim]');
			_videoElRef = videoEl;
			gsap.set(videoEl, { opacity: 0 });

			// — Glitch / hack effect on line 1 —
			const originalLine1 = 'FULLSTACK DEVELOPER';
			// Per-character lookalike substitution map (visually similar glyphs only)
			const glitchMap: Record<string, string[]> = {
				F: ['Ƒ', '⊦', '⌐', 'Ϝ'],
				U: ['Ʊ', '∪', 'Ü', 'Ц', 'Ũ'],
				L: ['|_', '[', '('],
				S: ['§', 'Ƨ', '$', 'Ś'],
				T: ['†', '⊤', 'Ţ', 'Ť', 'Ƭ'],
				A: ['Λ', 'Δ', '#', 'Ā', '/\\', '4'],
				C: ['⊂', 'Ç', 'Ć', '©', 'Ĉ'],
				K: ['|<', '⋊', 'X', 'Κ', 'ĸ'],
				D: ['Ð', '0', 'Đ', '[)', '|)'],
				E: ['Ξ', '∃', 'Ë', '€', 'Ę', '3'],
				V: ['∨', '⋁', '√', '>', '<', '\\/'],
				O: ['Ø', 'Θ', '0', 'Ö', '()', '[]', 'Q'],
				P: ['Þ', '?', 'Ρ', '|0', 'Ƥ'],
				R: ['Ȓ', 'Ŗ', 'Ɍ', 'Ṙ']
			};
			const line1El = document.querySelector<HTMLElement>('[data-hero-line1]');
			let glitchTimer: ReturnType<typeof setInterval> | null = null;
			let isEventMode = false;
			let isGlitching = false;
			let hasTypedLine1 = false;

			// Dev-mode: vivid spectrum gradient on line 1
			const devGradient =
				'linear-gradient(90deg,#06b6d4 0%,#818cf8 20%,#f472b6 42%,#facc15 64%,#4ade80 82%,#06b6d4 100%)';

			function applyDevMode() {
				if (line1El) line1El.style.backgroundImage = devGradient;
			}
			function clearDevMode() {
				if (line1El) line1El.style.backgroundImage = '';
			}

			applyDevMode();

			function typeLine1(onComplete?: () => void) {
				if (!line1El || hasTypedLine1) {
					onComplete?.();
					return;
				}

				if ($fxDisabled) {
					hasTypedLine1 = true;
					line1El.textContent = originalLine1;
					typingTimer = null;
					onComplete?.();
					return;
				}

				hasTypedLine1 = true;
				line1El.textContent = '';

				let index = 0;
				const nextDelay = (char: string) => {
					if (char === ' ') return 45 + Math.random() * 75;
					if (Math.random() < 0.18) return 55 + Math.random() * 65;
					return 18 + Math.random() * 52;
				};

				const step = () => {
					if (!line1El) {
						onComplete?.();
						return;
					}
					if ($fxDisabled) {
						line1El.textContent = originalLine1;
						typingTimer = null;
						onComplete?.();
						return;
					}

					index += 1;
					line1El.textContent = originalLine1.slice(0, index);

					if (index < originalLine1.length) {
						typingTimer = setTimeout(step, nextDelay(originalLine1[index - 1]));
						return;
					}

					typingTimer = null;
					onComplete?.();
				};

				typingTimer = setTimeout(step, 70 + Math.random() * 110);
			}

			function scramble(text: string): string {
				return text
					.split('')
					.map((ch) => {
						if (ch === ' ') return ch;
						const alts = glitchMap[ch];
						if (!alts || Math.random() > 0.45) return ch;
						return alts[Math.floor(Math.random() * alts.length)];
					})
					.join('');
			}

			stopGlitch = () => {
				if (glitchTimer) {
					clearInterval(glitchTimer);
					clearTimeout(glitchTimer as unknown as ReturnType<typeof setTimeout>);
					glitchTimer = null;
				}
				isGlitching = false;
				if (line1El) {
					line1El.textContent = originalLine1;
					line1El.style.fontFamily = '';
				}
			};
			// Store a delegate so the $effect can invoke the real stopGlitch
			_stopFn = () => stopGlitch();

			// One scrambled variant per burst, reused across all steps.
			// Each step: show glitch 50–150 ms, then normal 50–115 ms.
			function runBurst() {
				if (!line1El || isEventMode || $fxDisabled) return;
				isGlitching = true;

				const steps = 3 + Math.floor(Math.random() * 8); // 3–10
				const glitchedText = scramble(originalLine1);
				let currentTimer: ReturnType<typeof setTimeout>;

				function scheduleNext(step: number) {
					if (isEventMode || $fxDisabled) {
						// Aborted mid-burst — restore cleanly
						line1El!.textContent = originalLine1;
						line1El!.style.fontFamily = '';
						isGlitching = false;
						return;
					}
					if (step >= steps) {
						line1El!.textContent = originalLine1;
						line1El!.style.fontFamily = '';
						const pause = 2000 + Math.random() * 5000; // 2–7 s
						currentTimer = setTimeout(runBurst, pause);
						glitchTimer = currentTimer as unknown as ReturnType<typeof setInterval>;
						return;
					}

					// Show glitch
					const glitchDuration = 50 + Math.random() * 100; // 50–150 ms
					line1El!.textContent = glitchedText;

					currentTimer = setTimeout(() => {
						line1El!.textContent = originalLine1;
						line1El!.style.fontFamily = '';
						const normalDuration = 50 + Math.random() * 65; // 50–115 ms
						currentTimer = setTimeout(() => scheduleNext(step + 1), normalDuration);
						glitchTimer = currentTimer as unknown as ReturnType<typeof setInterval>;
					}, glitchDuration);

					glitchTimer = currentTimer as unknown as ReturnType<typeof setInterval>;
				}

				scheduleNext(0);
			}

			function transitionToEventMode() {
				if (isEventMode) return;
				isEventMode = true;
				_isEventModeRef.value = true;
				stopGlitch();
				clearDevMode();
				gsap.killTweensOf(overlayEl);
				gsap.to(overlayEl, { opacity: 0, duration: 0.25, ease: 'power1.out' });
				gsap.killTweensOf(scrimEl);
				gsap.to(scrimEl, { opacity: 1, duration: 0.35, ease: 'power1.out' });
				gsap.killTweensOf(videoEl);
				gsap.fromTo(
					videoEl,
					{ opacity: 1, filter: 'brightness(3.5) saturate(1.8)' },
					{ opacity: 1, filter: 'brightness(1) saturate(1)', duration: 0.55, ease: 'power2.out' }
				);
			}

			function transitionToDevMode() {
				if (!isEventMode) return;
				isEventMode = false;
				_isEventModeRef.value = false;
				gsap.killTweensOf(videoEl);
				gsap.killTweensOf(overlayEl);
				gsap.killTweensOf(scrimEl);
				gsap.set(videoEl, { opacity: 0, filter: 'brightness(1) saturate(1)' });
				gsap.set(overlayEl, { opacity: 1 });
				gsap.set(scrimEl, { opacity: 0 });
				applyDevMode();
				if (!isGlitching && !$fxDisabled) runBurst();
			}

			startHeroTyping = () => {
				typeLine1(() => {
					glitchStart = setTimeout(() => {
						if (!$fxDisabled) runBurst();
					}, 1250);
				});
			};

			if (!document.body.classList.contains('is-loading')) startHeroTyping();
			else {
				window.addEventListener(APP_READY_EVENT, startHeroTyping, { once: true });
			}

			ScrollTrigger.create({
				trigger: '[data-hero-pin]',
				start: 'top top',
				end: '+=2800',
				scrub: 0.8,
				pin: true,
				anticipatePin: 1,
				animation: pinTl,
				onUpdate(self) {
					// Video snaps when line2 is at ~90% of its travel (phase 1 ends at ~0.328)
					// Hysteresis: enter at 0.295, leave at 0.18
					if (self.progress >= 0.295) transitionToEventMode();
					else if (self.progress < 0.18) transitionToDevMode();
					// Stop glitch while line 2 is mid-travel
					else if (isGlitching) stopGlitch();
				}
			});
		}

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) {
						return;
					}

					gsap.fromTo(
						entry.target,
						{ y: 36, opacity: 0 },
						{ y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
					);

					observer.unobserve(entry.target);
				});
			},
			{ threshold: 0.25 }
		);

		document.querySelectorAll('[data-animate]').forEach((element) => observer.observe(element));

		return () => {
			if (glitchStart) clearTimeout(glitchStart);
			if (typingTimer) clearTimeout(typingTimer);
			window.removeEventListener(APP_READY_EVENT, startHeroTyping);
			stopGlitch();
			observer.disconnect();
			ScrollTrigger.getAll().forEach((t) => t.kill());
		};
	});
</script>

<main class="relative isolate overflow-x-clip">
	<Navbar brand="Ben" links={navLinks} />

	<section
		data-hero-pin
		class="section-dark-a relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
	>
		<div class="grid-overlay absolute inset-0 -z-20 opacity-20"></div>
		<div
			class="glow-pulse absolute top-16 -left-30 -z-10 h-80 w-80 rounded-full bg-electric-500/25"
		></div>
		<div
			class="glow-pulse absolute top-34 -right-12 -z-10 h-96 w-96 rounded-full bg-violet-500/25 [animation-delay:1.1s]"
		></div>

		<video
			data-hero-video
			class="absolute inset-0 -z-30 h-full w-full object-cover"
			autoplay
			muted
			loop
			playsinline
			preload="metadata"
			poster="/media/hero-poster.svg"
			aria-hidden="true"
		>
			<source src="/media/hero-placeholder.webm" type="video/webm" />
			<source src="/media/hero-placeholder.mp4" type="video/mp4" />
		</video>
		<div
			data-hero-overlay
			class="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_20%_22%,color-mix(in_oklab,var(--color-electric-500)_26%,transparent)_0%,transparent_55%),linear-gradient(180deg,color-mix(in_oklab,var(--color-anthracite-900)_82%,transparent)_0%,var(--color-anthracite-900)_90%)]"
		></div>

		<div data-hero-content class="relative z-10 w-full px-6 sm:px-10 lg:px-16">
			<div class="relative w-fit">
				<!-- Soft scrim that fades in behind the text in event mode -->
				<div
					data-hero-text-scrim
					class="pointer-events-none absolute -inset-10 -z-10 opacity-0"
					style="background: rgba(0,0,0,0.38); -webkit-mask-image: linear-gradient(to right, transparent, black 18%, black 82%, transparent), linear-gradient(to bottom, transparent, black 18%, black 82%, transparent); -webkit-mask-composite: source-in; mask-image: linear-gradient(to right, transparent, black 18%, black 82%, transparent), linear-gradient(to bottom, transparent, black 18%, black 82%, transparent); mask-composite: intersect;"
				></div>
				<p
					data-hero-eyebrow
					class="mb-3 text-lg font-medium tracking-widest text-electric-400 sm:text-xl ps-2"
				>
					Hey, I'm Ben!
				</p>

				<div class="leading-[0.88] font-black tracking-tighter">
					<!-- Line 1: visible on page load -->
					<div class="overflow-hidden">
						<h1
							data-hero-line1
							class="title-gradient-vivid block text-[clamp(2rem,7vw,8rem)] whitespace-nowrap"
						>
							FULLSTACK DEVELOPER
						</h1>
					</div>
					<!-- Line 2: revealed via scroll pin, starts near bottom of viewport -->
					<div>
						<h1
							data-hero-line2
							class="title-gradient-vivid block text-[clamp(2rem,7vw,8rem)] whitespace-nowrap"
						>
							AND LIGHTING TECH
						</h1>
					</div>
				</div>
			</div>
		</div>

		<div class="wave-separator text-anthracite-800">
			<svg
				viewBox="0 0 1440 170"
				class="h-22 w-full"
				preserveAspectRatio="none"
				aria-hidden="true"
			>
				<path
					fill="currentColor"
					d="M0,96L60,90.7C120,85,240,75,360,80C480,85,600,107,720,122.7C840,139,960,149,1080,138.7C1200,128,1320,96,1380,80L1440,64L1440,171L1380,171C1320,171,1200,171,1080,171C960,171,840,171,720,171C600,171,480,171,360,171C240,171,120,171,60,171L0,171Z"
				></path>
			</svg>
		</div>
	</section>

	<AboutSection />
	<SkillsSection {skillGroups} />
	<ProjectsSection {projects} />

	<div id="footer">
		<Footer
			name="Ben Sc"
			promo="Cloud-native developer and event lighting technician focused on robust software, modern infrastructure, and high-energy live experiences."
			{profileLinks}
			{legalLinks}
		/>
	</div>
</main>
