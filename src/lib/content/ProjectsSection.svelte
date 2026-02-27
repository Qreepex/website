<script lang="ts">
	import { onMount, tick } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import {
		PROJECTS_MODE_DESCRIPTIONS,
		PROJECTS_MODE_LABELS,
		createRandomEventRigs,
		devProjects,
		eventShowcaseImages,
		eventTechOverview,
		type EventRig
	} from '$lib/content';
	import {
		assignRandomGradientsForProjects as assignRandomGradients,
		gradientBackgroundFor as gradientBackgroundForIndex,
		gradientClassFor as gradientClassForIndex,
		projectHasSolidColor,
		projectGradientTextStyle,
		projectMetaClass as projectMetaClassForMode,
		projectTitleClass as projectTitleClassForMode,
		sectionTitleClass as sectionTitleClassForMode,
		techTagClass as techTagClassForMode,
		type GradientPreset
	} from '$lib/styles';
	import { fxDisabled } from '$lib/stores/reducedMotion';
	import SmallerProjectsSection from '$lib/content/SmallerProjectsSection.svelte';
	import EventRigsOverlay from '$lib/content/EventRigsOverlay.svelte';
	import EventTechGallery from '$lib/content/EventTechGallery.svelte';
	import ProjectItem from '$lib/content/ProjectItem.svelte';
	import ProjectsModeToggle from '$lib/content/ProjectsModeToggle.svelte';
	import type { ProjectsMode } from '$lib/types';

	gsap.registerPlugin(ScrollTrigger);

	let sectionEl: HTMLElement | null = null;
	let devPanelEl = $state<HTMLElement | null>(null);
	let projectCards: HTMLElement[] = [];
	let projectsPinTrigger: ScrollTrigger | null = null;
	let activeProjectIndex = $state(0);
	let assignedGradients = $state<GradientPreset[]>([]);
	let backgroundLayerA: HTMLDivElement | null = null;
	let backgroundLayerB: HTMLDivElement | null = null;
	let activeBackgroundLayer: 'a' | 'b' = 'a';
	let eventRigs = $state<EventRig[]>([]);
	let showSmallerProjects = $state(false);
	let devBackgroundActive = $state(false);
	let entryProtectionActive = $state(false);
	let entryProtectionAnchorIndex = 0;
	let entryProtectionTimer: ReturnType<typeof setTimeout> | null = null;
	let projectsInView = $state(false);
	let sectionObserver: IntersectionObserver | null = null;
	let onHashChange: (() => void) | null = null;

	let activeMode = $state<ProjectsMode>('dev');

	const MODE_HASH: Record<ProjectsMode, '#dev' | '#event-tech'> = {
		dev: '#dev',
		event: '#event-tech'
	};

	function modeFromHash(hash: string): ProjectsMode | null {
		if (hash === '#dev') return 'dev';
		if (hash === '#event-tech') return 'event';
		return null;
	}

	function replaceHashForMode(mode: ProjectsMode) {
		if (typeof window === 'undefined') return;
		const nextHash = MODE_HASH[mode];
		if (window.location.hash === nextHash) return;
		window.history.replaceState(
			window.history.state,
			document.title,
			`${window.location.pathname}${window.location.search}${nextHash}`
		);
	}

	function assignRandomGradientsForProjects() {
		assignedGradients = assignRandomGradients(devProjects.length, 'dev');
	}

	function assignRandomEventRigs() {
		eventRigs = createRandomEventRigs();
	}

	function crossfadeBackground(gradient: string) {
		if (activeMode !== 'dev') {
			devBackgroundActive = false;
			fadeBackgroundToBase();
			return;
		}

		if (!gradient) {
			devBackgroundActive = false;
			fadeBackgroundToBase();
			return;
		}

		const active = activeBackgroundLayer === 'a' ? backgroundLayerA : backgroundLayerB;
		const inactive = activeBackgroundLayer === 'a' ? backgroundLayerB : backgroundLayerA;
		if (!active || !inactive) return;

		devBackgroundActive = true;
		inactive.style.backgroundImage = gradient;
		gsap.to(inactive, { opacity: 0.12, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
		gsap.to(active, { opacity: 0, duration: 0.35, ease: 'power2.out', overwrite: 'auto' });
		activeBackgroundLayer = activeBackgroundLayer === 'a' ? 'b' : 'a';
	}

	function fadeBackgroundToBase() {
		if (!backgroundLayerA || !backgroundLayerB) return;
		gsap.to([backgroundLayerA, backgroundLayerB], {
			opacity: 0,
			duration: 0.35,
			ease: 'power2.out',
			overwrite: 'auto'
		});
	}

	function clearEntryProtectionTimer() {
		if (entryProtectionTimer) {
			clearTimeout(entryProtectionTimer);
			entryProtectionTimer = null;
		}
	}

	function startEntryProtection(durationMs: number, anchorIndex: number) {
		entryProtectionAnchorIndex = anchorIndex;
		entryProtectionActive = true;
		clearEntryProtectionTimer();
		entryProtectionTimer = setTimeout(() => {
			entryProtectionActive = false;
			entryProtectionTimer = null;
		}, durationMs);
	}

	function stopEntryProtection() {
		entryProtectionActive = false;
		clearEntryProtectionTimer();
	}

	function showOnlyProjectCard(index: number) {
		projectCards.forEach((card, cardIndex) => {
			gsap.set(card, {
				autoAlpha: cardIndex === index ? 1 : 0,
				yPercent: cardIndex === index ? 0 : 26
			});
		});
		activeProjectIndex = index;
	}

	const devSectionTitleGradientClass = $derived(
		gradientClassForIndex(activeProjectIndex, assignedGradients, 'dev')
	);
	const activeDevProject = $derived(devProjects[activeProjectIndex]);
	const devSectionTitleClass = $derived(
		activeMode === 'dev' && !devBackgroundActive && !projectHasSolidColor(activeDevProject)
			? 'text-5xl font-black tracking-[-0.04em] text-mist-100 uppercase sm:text-6xl lg:text-7xl xl:text-8xl'
			: sectionTitleClassForMode('dev', devSectionTitleGradientClass, activeDevProject)
	);
	const devSectionTitleStyle = $derived(projectGradientTextStyle(activeDevProject));
	const eventSectionTitleClass = sectionTitleClassForMode('event', '');
	const devProjectMetaClass = projectMetaClassForMode('dev');
	const devTechTagClass = techTagClassForMode('dev');

	async function setupProjectsFlyIn(options: { randomizeGradients?: boolean } = {}) {
		if (!sectionEl) return;
		if (activeMode !== 'dev') {
			projectsPinTrigger?.kill();
			projectsPinTrigger = null;
			stopEntryProtection();
			gsap.killTweensOf(projectCards);
			fadeBackgroundToBase();
			projectCards = [];
			return;
		}

		if (options.randomizeGradients || assignedGradients.length !== devProjects.length) {
			assignRandomGradientsForProjects();
		}

		projectsPinTrigger?.kill();
		projectsPinTrigger = null;
		gsap.killTweensOf(projectCards);

		const activePanel = devPanelEl;
		if (!activePanel) return;

		projectCards = Array.from(activePanel.querySelectorAll<HTMLElement>('[data-project-card]'));
		if (projectCards.length === 0) return;

		if ($fxDisabled) {
			gsap.set(projectCards, { clearProps: 'all', autoAlpha: 1, yPercent: 0 });
			return;
		}

		showOnlyProjectCard(0);
		devBackgroundActive = false;

		const entryProtectionDurationMs = 450;

		projectsPinTrigger = ScrollTrigger.create({
			trigger: sectionEl,
			start: 'top top',
			end: `+=${projectCards.length * 550}`,
			pin: true,
			scrub: 0.22,
			anticipatePin: 1,
			onEnter: () => {
				startEntryProtection(entryProtectionDurationMs, 0);
				showOnlyProjectCard(0);
				if (activeMode === 'dev')
					crossfadeBackground(
						gradientBackgroundForIndex(
							activeProjectIndex,
							assignedGradients,
							activeMode,
							devProjects[activeProjectIndex]
						)
					);
				else fadeBackgroundToBase();
			},
			onEnterBack: () => {
				const lastProjectIndex = projectCards.length - 1;
				startEntryProtection(entryProtectionDurationMs, lastProjectIndex);
				showOnlyProjectCard(lastProjectIndex);
				if (activeMode === 'dev')
					crossfadeBackground(
						gradientBackgroundForIndex(
							activeProjectIndex,
							assignedGradients,
							activeMode,
							devProjects[activeProjectIndex]
						)
					);
				else fadeBackgroundToBase();
			},
			onLeave: () => {
				stopEntryProtection();
				fadeBackgroundToBase();
			},
			onLeaveBack: () => {
				stopEntryProtection();
				fadeBackgroundToBase();
			},
			onUpdate(self) {
				if (entryProtectionActive) {
					const shouldKeepProtected =
						entryProtectionAnchorIndex === 0 ? self.progress <= 0.015 : self.progress >= 0.985;
					if (shouldKeepProtected) {
						if (activeProjectIndex !== entryProtectionAnchorIndex)
							showOnlyProjectCard(entryProtectionAnchorIndex);
						return;
					}
					stopEntryProtection();
				}

				const normalizedProgress = self.progress;
				const targetIndex = Math.min(
					projectCards.length - 1,
					Math.floor(normalizedProgress * projectCards.length)
				);
				if (targetIndex === activeProjectIndex) return;

				const nextIndex = activeProjectIndex + Math.sign(targetIndex - activeProjectIndex);
				if (nextIndex < 0 || nextIndex >= projectCards.length) return;

				const scrollDirection = self.direction >= 0 ? 1 : -1;

				const outgoing = projectCards[activeProjectIndex];
				const incoming = projectCards[nextIndex];

				activeProjectIndex = nextIndex;
				if (!incoming) return;
				if (activeMode === 'dev')
					crossfadeBackground(
						gradientBackgroundForIndex(
							nextIndex,
							assignedGradients,
							activeMode,
							devProjects[nextIndex]
						)
					);

				gsap.killTweensOf([outgoing, incoming]);

				const tl = gsap.timeline({ defaults: { overwrite: 'auto' } });
				if (outgoing) {
					tl.to(
						outgoing,
						{
							autoAlpha: 0,
							yPercent: scrollDirection > 0 ? -18 : 18,
							duration: 0.28,
							ease: 'power2.in'
						},
						0
					);
				}

				tl.fromTo(
					incoming,
					{ autoAlpha: 0, yPercent: scrollDirection > 0 ? 42 : -42 },
					{
						autoAlpha: 1,
						yPercent: 0,
						duration: 0.72,
						ease: 'back.out(1.55)'
					},
					0.02
				);
			}
		});
	}

	async function switchMode(mode: 'dev' | 'event') {
		if (activeMode === mode) return;
		const switchingFromDevToEvent = activeMode === 'dev' && mode === 'event';
		const projectsSectionTop =
			switchingFromDevToEvent && projectsPinTrigger ? Math.max(projectsPinTrigger.start, 0) : null;
		if (projectsSectionTop !== null && projectsPinTrigger) {
			projectsPinTrigger.scroll(projectsSectionTop);
		}
		showSmallerProjects = false;
		devBackgroundActive = false;
		activeMode = mode;
		if (mode === 'event') assignRandomEventRigs();
		await tick();
		if (mode === 'dev') {
			await setupProjectsFlyIn({ randomizeGradients: true });
		} else {
			projectsPinTrigger?.kill();
			projectsPinTrigger = null;
			stopEntryProtection();
			gsap.killTweensOf(projectCards);
			fadeBackgroundToBase();
			if (projectsSectionTop !== null) {
				window.scrollTo({ top: projectsSectionTop, behavior: 'auto' });
			}
		}
		showSmallerProjects = mode === 'dev';
		await tick();
		ScrollTrigger.refresh();
	}

	onMount(() => {
		void (async () => {
			const initialMode = typeof window === 'undefined' ? null : modeFromHash(window.location.hash);
			if (initialMode) {
				activeMode = initialMode;
				if (initialMode === 'event') assignRandomEventRigs();
			}

			await setupProjectsFlyIn({ randomizeGradients: true });
			showSmallerProjects = activeMode === 'dev';
			await tick();
			ScrollTrigger.refresh();

			if (sectionEl) {
				sectionObserver = new IntersectionObserver(
					(entries) => {
						const [entry] = entries;
						if (!entry) return;
						const inView = entry.isIntersecting && entry.intersectionRatio >= 0.35;
						projectsInView = inView;
						if (inView) replaceHashForMode(activeMode);
					},
					{ threshold: [0.2, 0.35, 0.5] }
				);

				sectionObserver.observe(sectionEl);

				if (initialMode) {
					window.requestAnimationFrame(() => {
						if (!sectionEl) return;
						const targetTop = sectionEl.getBoundingClientRect().top + window.scrollY;
						window.scrollTo({ top: targetTop, behavior: 'auto' });
					});
				}

				onHashChange = () => {
					const requestedMode = modeFromHash(window.location.hash);
					if (!requestedMode || requestedMode === activeMode) return;
					void switchMode(requestedMode);
				};

				window.addEventListener('hashchange', onHashChange);
			}
		})();

		return () => {
			sectionObserver?.disconnect();
			sectionObserver = null;
			if (onHashChange) {
				window.removeEventListener('hashchange', onHashChange);
				onHashChange = null;
			}
			projectsPinTrigger?.kill();
			projectsPinTrigger = null;
			stopEntryProtection();
			gsap.killTweensOf(projectCards);
			fadeBackgroundToBase();
		};
	});

	$effect(() => {
		activeMode;
		if (!projectsInView) return;
		replaceHashForMode(activeMode);
	});

	$effect(() => {
		$fxDisabled;
		if (!sectionEl || activeMode !== 'dev') return;
		void (async () => {
			await tick();
			await setupProjectsFlyIn();
		})();
	});
</script>

<section
	bind:this={sectionEl}
	id="projects"
	class="relative w-full overflow-hidden bg-anthracite-900 px-6 pt-16 pb-16 sm:px-10 sm:pt-18 lg:px-16 lg:pt-20"
>
	<div
		bind:this={backgroundLayerA}
		class="pointer-events-none absolute inset-0 z-0 opacity-0"
	></div>
	<div
		bind:this={backgroundLayerB}
		class="pointer-events-none absolute inset-0 z-0 opacity-0"
	></div>
	{#if activeMode === 'event'}
		<EventRigsOverlay rigs={eventRigs} />
	{/if}
	<div class="w-full">
		<div class="mb-8 flex flex-wrap items-center justify-between gap-6 sm:mb-10">
			<div class="relative z-10">
				<div
					class={`project-mode-panel ${activeMode === 'dev' ? 'is-active' : ''}`}
					aria-hidden={activeMode !== 'dev'}
				>
					<h2 class={devSectionTitleClass} style={devSectionTitleStyle}>
						{PROJECTS_MODE_LABELS.dev}
					</h2>
					<p class="mt-4 max-w-4xl text-base font-semibold text-mist-100 sm:text-lg">
						{PROJECTS_MODE_DESCRIPTIONS.dev}
					</p>
				</div>
				<div
					class={`project-mode-panel ${activeMode === 'event' ? 'is-active' : ''}`}
					aria-hidden={activeMode !== 'event'}
				>
					<h2 class={eventSectionTitleClass}>
						{PROJECTS_MODE_LABELS.event}
					</h2>
					<p class="mt-4 max-w-4xl text-base font-semibold text-mist-100 sm:text-lg">
						{PROJECTS_MODE_DESCRIPTIONS.event}
					</p>
				</div>
			</div>

			<ProjectsModeToggle {activeMode} onSwitch={switchMode} />
		</div>

		{#if activeMode === 'dev'}
			<div class="relative z-10 h-[62vh] min-h-105 sm:mt-6 sm:h-[66vh] lg:h-[70vh]">
				<div
					bind:this={devPanelEl}
					class={`project-mode-panel relative h-full w-full ${activeMode === 'dev' ? 'is-active' : ''}`}
					aria-hidden={activeMode !== 'dev'}
				>
					{#each devProjects as project, index}
						<ProjectItem
							{project}
							{index}
							activeMode="dev"
							projectMetaClass={devProjectMetaClass}
							projectTitleClass={projectTitleClassForMode('dev', project)}
							techTagClass={devTechTagClass}
							gradientClass={gradientClassForIndex(index, assignedGradients, 'dev', project)}
							gradientStyle={projectGradientTextStyle(project)}
						/>
					{/each}
				</div>
			</div>
		{:else}
			<div class="relative z-10 sm:mt-6">
				<EventTechGallery />
				<div class="mt-8 flex justify-center sm:mt-10">
					<a
						href="/event-tech"
						class="inline-flex items-center rounded-lg border border-mist-100/30 bg-mist-100/8 px-5 py-3 text-sm font-bold tracking-[0.12em] text-mist-100 uppercase transition-colors hover:border-mist-100/50 hover:bg-mist-100/14"
					>
						More about Ben as an Event Tech
					</a>
				</div>
			</div>
		{/if}
	</div>
</section>

{#if activeMode === 'dev' && showSmallerProjects}
	<SmallerProjectsSection />
{/if}

<style>
	.project-mode-panel {
		display: none;
	}

	.project-mode-panel.is-active {
		display: block;
	}
</style>
