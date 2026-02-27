<script lang="ts">
	import { onMount, tick } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import {
		PROJECTS_MODE_DESCRIPTIONS,
		PROJECTS_MODE_LABELS,
		createRandomEventRigs,
		devProjects,
		eventProjects,
		type EventRig
	} from '$lib/content';
	import {
		assignRandomGradientsForProjects as assignRandomGradients,
		gradientBackgroundFor as gradientBackgroundForIndex,
		gradientClassFor as gradientClassForIndex,
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
	import ProjectItem from '$lib/content/ProjectItem.svelte';
	import ProjectsModeToggle from '$lib/content/ProjectsModeToggle.svelte';
	import type { ProjectsMode } from '$lib/types';

	gsap.registerPlugin(ScrollTrigger);

	let sectionEl: HTMLElement | null = null;
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

	let activeMode = $state<ProjectsMode>('dev');
	const modeLabel = $derived(PROJECTS_MODE_LABELS[activeMode]);
	const modeDescription = $derived(PROJECTS_MODE_DESCRIPTIONS[activeMode]);
	const displayedProjects = $derived(activeMode === 'dev' ? devProjects : eventProjects);

	function assignRandomGradientsForProjects() {
		assignedGradients = assignRandomGradients(displayedProjects.length, activeMode);
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

	const sectionTitleGradientClass = $derived(
		gradientClassForIndex(activeProjectIndex, assignedGradients, activeMode)
	);
	const sectionTitleClass = $derived(
		activeMode === 'dev' && !devBackgroundActive
			? 'text-5xl font-black tracking-[-0.04em] text-mist-100 uppercase sm:text-6xl lg:text-7xl xl:text-8xl'
			: sectionTitleClassForMode(activeMode, sectionTitleGradientClass)
	);
	const projectMetaClass = $derived(projectMetaClassForMode(activeMode));
	const techTagClass = $derived(techTagClassForMode(activeMode));

	async function setupProjectsFlyIn(options: { randomizeGradients?: boolean } = {}) {
		if (!sectionEl) return;

		if (options.randomizeGradients || assignedGradients.length !== displayedProjects.length) {
			assignRandomGradientsForProjects();
		}
		if (activeMode === 'event' && eventRigs.length === 0) assignRandomEventRigs();

		projectsPinTrigger?.kill();
		projectsPinTrigger = null;
		gsap.killTweensOf(projectCards);

		projectCards = Array.from(sectionEl.querySelectorAll<HTMLElement>('[data-project-card]'));
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
							displayedProjects[activeProjectIndex]
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
							displayedProjects[activeProjectIndex]
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
							displayedProjects[nextIndex]
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
		showSmallerProjects = false;
		devBackgroundActive = false;
		activeMode = mode;
		if (mode === 'event') assignRandomEventRigs();
		await tick();
		await setupProjectsFlyIn({ randomizeGradients: true });
		showSmallerProjects = mode === 'dev';
		await tick();
		ScrollTrigger.refresh();
	}

	onMount(() => {
		void (async () => {
			await setupProjectsFlyIn({ randomizeGradients: true });
			showSmallerProjects = activeMode === 'dev';
			await tick();
			ScrollTrigger.refresh();
		})();

		return () => {
			projectsPinTrigger?.kill();
			projectsPinTrigger = null;
			stopEntryProtection();
			gsap.killTweensOf(projectCards);
			fadeBackgroundToBase();
		};
	});

	$effect(() => {
		$fxDisabled;
		if (!sectionEl) return;
		void (async () => {
			await tick();
			await setupProjectsFlyIn();
		})();
	});
</script>

<section
	bind:this={sectionEl}
	id="projects"
	class="relative w-full overflow-hidden bg-anthracite-900 px-6 pt-16 pb-20 sm:px-10 sm:pt-18 sm:pb-22 lg:px-16 lg:pt-20"
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
				<h2 class={sectionTitleClass}>
					{modeLabel}
				</h2>
				<p class="mt-4 max-w-4xl text-base font-semibold text-mist-100 sm:text-lg">
					{modeDescription}
				</p>
			</div>

			<ProjectsModeToggle {activeMode} onSwitch={switchMode} />
		</div>

		<div class="relative z-10 h-[62vh] min-h-105 sm:mt-6 sm:h-[66vh] lg:h-[70vh]">
			<div class="relative h-full w-full">
				{#each displayedProjects as project, index}
					<ProjectItem
						{project}
						{index}
						{activeMode}
						{projectMetaClass}
						projectTitleClass={projectTitleClassForMode(activeMode, project)}
						{techTagClass}
						gradientClass={gradientClassForIndex(index, assignedGradients, activeMode, project)}
						gradientStyle={projectGradientTextStyle(project)}
					/>
				{/each}
			</div>
		</div>
	</div>
</section>

{#if activeMode === 'dev' && showSmallerProjects}
	<SmallerProjectsSection />
{/if}
