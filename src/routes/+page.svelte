<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import Footer from '$lib/page/Footer.svelte';
	import Navbar from '$lib/page/Navbar.svelte';
	import AboutSection from '$lib/content/AboutSection.svelte';
	import SkillsSection from '$lib/content/SkillsSection.svelte';
	import ProjectsSection from '$lib/content/ProjectsSection.svelte';
	import { skillGroups } from '$lib/content/skills';

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
		let heroPinTrigger: ScrollTrigger | null = null;
		let contentScrubTrigger: ScrollTrigger | null = null;
		let removeFirstScrollListeners: () => void = () => {};
		let isReverseResetRunning = false;
		let reverseResetTween: gsap.core.Timeline | null = null;

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
			const getLine2StartY = () => window.innerHeight * 0.72;
			gsap.set('[data-hero-line2]', { y: getLine2StartY(), opacity: 0 });
			gsap.set('[data-hero-content]', { y: 0, scale: 1, transformOrigin: 'left top' });

			// Phase 1: trigger-only intro (line2 snaps in + video starts)
			const introTl = gsap.timeline({ paused: true });
			introTl
				.to('[data-hero-line2]', {
					y: -18,
					opacity: 1,
					ease: 'power4.out',
					duration: 0.24
				})
				.add(() => transitionToEventMode(), 0.16)
				.to('[data-hero-line2]', { y: 0, duration: 0.1, ease: 'power2.out' })
				;

			// Phase 2: user-controlled scroll motion (move/shrink to top-left)
			const scrollTl = gsap.timeline({ paused: true });
			scrollTl
				.to('[data-hero-content]', {
					y: () => -(window.innerHeight * 0.2),
					scale: 0.42,
					transformOrigin: 'left top',
					duration: 1,
					ease: 'power2.out'
				});

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
				gsap.to(videoEl, {
					opacity: 0,
					filter: 'brightness(1) saturate(1)',
					duration: 0.22,
					ease: 'power1.inOut'
				});
				gsap.to(overlayEl, { opacity: 1, duration: 0.22, ease: 'power1.inOut' });
				gsap.to(scrimEl, { opacity: 0, duration: 0.2, ease: 'power1.inOut' });
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

			let firstScrollSequenceTriggered = false;

			function resetHeroSequenceState() {
				if (isReverseResetRunning) return;
				if (!firstScrollSequenceTriggered && !isEventMode) return;

				introTl.pause();
				scrollTl.pause();
				if (contentScrubTrigger) {
					contentScrubTrigger.kill();
					contentScrubTrigger = null;
				}

				if (reverseResetTween) {
					reverseResetTween.kill();
					reverseResetTween = null;
				}
				isReverseResetRunning = true;
				transitionToDevMode();

				reverseResetTween = gsap.timeline({
					onComplete() {
						isReverseResetRunning = false;
						firstScrollSequenceTriggered = false;
						reverseResetTween = null;
					}
				});

				reverseResetTween
					.to(
						'[data-hero-content]',
						{ y: 0, scale: 1, duration: 0.18, ease: 'power2.out' },
						0
					)
					.to(
						'[data-hero-line2]',
						{ y: getLine2StartY(), opacity: 0, duration: 0.28, ease: 'power2.in' },
						0
					);
			}

			function enableScrollControlPhase() {
				if (contentScrubTrigger) return;
				const startAt = window.scrollY + 8;
				const endAt = startAt + 1700;
				contentScrubTrigger = ScrollTrigger.create({
					start: startAt,
					end: endAt,
					scrub: 0.35,
					animation: scrollTl,
					onLeaveBack() {
						resetHeroSequenceState();
					}
				});
			}

			function triggerHeroSequence() {
				if (firstScrollSequenceTriggered) return;
				firstScrollSequenceTriggered = true;
				introTl.eventCallback('onComplete', enableScrollControlPhase);
				introTl.play(0);
			}

			function onFirstUserScrollIntent(event?: KeyboardEvent) {
				if (firstScrollSequenceTriggered || isReverseResetRunning) return;
				if (event) {
					const isScrollKey =
						event.key === 'ArrowDown' ||
						event.key === 'PageDown' ||
						event.key === ' ' ||
						event.key === 'End';
					if (!isScrollKey) return;
				}
				triggerHeroSequence();
			}

			let lastScrollY = window.scrollY;
			let touchStartY: number | null = null;

			const onWheel = (event: WheelEvent) => {
				if (event.deltaY > 0) onFirstUserScrollIntent();
				else if (window.scrollY <= 2) resetHeroSequenceState();
			};

			const onTouchStart = (event: TouchEvent) => {
				touchStartY = event.touches[0]?.clientY ?? null;
			};

			const onTouchMove = (event: TouchEvent) => {
				if (touchStartY == null) return;
				const currentY = event.touches[0]?.clientY ?? touchStartY;
				const delta = touchStartY - currentY;
				if (delta > 3) onFirstUserScrollIntent();
				else if (delta < -3 && window.scrollY <= 2) resetHeroSequenceState();
				touchStartY = currentY;
			};

			const onScroll = () => {
				const currentY = window.scrollY;
				const isScrollingDown = currentY > lastScrollY + 0.5;
				const isScrollingUp = currentY < lastScrollY - 0.5;
				lastScrollY = currentY;
				if (isScrollingDown) onFirstUserScrollIntent();
				else if (isScrollingUp && currentY <= 2) resetHeroSequenceState();
			};

			const onFirstUserKeydown = (event: KeyboardEvent) => onFirstUserScrollIntent(event);
			window.addEventListener('wheel', onWheel, { passive: true });
			window.addEventListener('touchstart', onTouchStart, { passive: true });
			window.addEventListener('touchmove', onTouchMove, { passive: true });
			window.addEventListener('scroll', onScroll, { passive: true });
			window.addEventListener('keydown', onFirstUserKeydown);
			removeFirstScrollListeners = () => {
				window.removeEventListener('wheel', onWheel);
				window.removeEventListener('touchstart', onTouchStart);
				window.removeEventListener('touchmove', onTouchMove);
				window.removeEventListener('scroll', onScroll);
				window.removeEventListener('keydown', onFirstUserKeydown);
			};

			heroPinTrigger = ScrollTrigger.create({
				trigger: '[data-hero-pin]',
				start: 'top top',
				end: '+=2800',
				pin: true,
				anticipatePin: 1,
				onLeaveBack() {
					resetHeroSequenceState();
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
			if (reverseResetTween) reverseResetTween.kill();
			if (contentScrubTrigger) contentScrubTrigger.kill();
			removeFirstScrollListeners();
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
	<ProjectsSection />
	<SkillsSection {skillGroups} />

	<div id="footer">
		<Footer
			name="Ben"
			promo="Cloud-native developer and event lighting technician focused on robust software, modern infrastructure, and high-energy live experiences."
			{profileLinks}
			{legalLinks}
		/>
	</div>
</main>
