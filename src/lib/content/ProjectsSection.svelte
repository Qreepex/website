<script lang="ts">
	import { onMount, tick } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { devProjects, eventProjects } from '$lib/content/projects';
	import { fxDisabled } from '$lib/stores/reducedMotion';

	gsap.registerPlugin(ScrollTrigger);

	type GradientPreset = {
		className: string;
		background: string;
	};

	let sectionEl: HTMLElement | null = null;
	let projectCards: HTMLElement[] = [];
	let projectsPinTrigger: ScrollTrigger | null = null;
	let activeProjectIndex = $state(0);
	let assignedGradients = $state<GradientPreset[]>([]);
	let backgroundLayerA: HTMLDivElement | null = null;
	let backgroundLayerB: HTMLDivElement | null = null;
	let activeBackgroundLayer: 'a' | 'b' = 'a';

	let activeMode = $state<'dev' | 'event'>('dev');
	const modeLabel = $derived(activeMode === 'dev' ? 'Developer Projects' : 'Event Tech Projects');
	const displayedProjects = $derived(activeMode === 'dev' ? devProjects : eventProjects);

	const devGradientClasses: readonly GradientPreset[] = [
		{
			className: 'bg-gradient-to-r from-red-400 via-fuchsia-500 to-violet-400',
			background: 'linear-gradient(100deg, rgba(248,113,113,1) 0%, rgba(217,70,239,1) 55%, rgba(167,139,250,1) 100%)'
		},
		{
			className: 'bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400',
			background: 'linear-gradient(100deg, rgba(167,139,250,1) 0%, rgba(192,132,252,1) 52%, rgba(34,211,238,1) 100%)'
		},
		{
			className: 'bg-gradient-to-r from-rose-400 via-violet-500 to-cyan-300',
			background: 'linear-gradient(100deg, rgba(251,113,133,1) 0%, rgba(139,92,246,1) 50%, rgba(103,232,249,1) 100%)'
		},
		{
			className: 'bg-gradient-to-r from-orange-400 via-red-500 to-violet-500',
			background: 'linear-gradient(100deg, rgba(251,146,60,1) 0%, rgba(239,68,68,1) 48%, rgba(139,92,246,1) 100%)'
		},
		{
			className: 'bg-gradient-to-r from-red-500 via-orange-400 to-violet-400',
			background: 'linear-gradient(100deg, rgba(239,68,68,1) 0%, rgba(251,146,60,1) 45%, rgba(167,139,250,1) 100%)'
		},
		{
			className: 'bg-gradient-to-r from-orange-300 via-fuchsia-500 to-cyan-400',
			background: 'linear-gradient(100deg, rgba(253,186,116,1) 0%, rgba(217,70,239,1) 56%, rgba(34,211,238,1) 100%)'
		},
		{
			className: 'bg-gradient-to-r from-red-400 via-purple-500 to-cyan-300',
			background: 'linear-gradient(100deg, rgba(248,113,113,1) 0%, rgba(168,85,247,1) 52%, rgba(103,232,249,1) 100%)'
		}
	] as const;

	const eventGradientClasses: readonly GradientPreset[] = [
		{
			className: 'bg-gradient-to-r from-red-500 via-violet-500 to-cyan-400',
			background: 'linear-gradient(100deg, rgba(239,68,68,1) 0%, rgba(139,92,246,1) 52%, rgba(34,211,238,1) 100%)'
		},
		{
			className: 'bg-gradient-to-r from-violet-500 via-fuchsia-400 to-cyan-300',
			background: 'linear-gradient(100deg, rgba(139,92,246,1) 0%, rgba(232,121,249,1) 55%, rgba(103,232,249,1) 100%)'
		},
		{
			className: 'bg-gradient-to-r from-red-400 via-purple-500 to-cyan-400',
			background: 'linear-gradient(100deg, rgba(248,113,113,1) 0%, rgba(168,85,247,1) 50%, rgba(34,211,238,1) 100%)'
		},
		{
			className: 'bg-gradient-to-r from-orange-400 via-red-500 to-violet-500',
			background: 'linear-gradient(100deg, rgba(251,146,60,1) 0%, rgba(239,68,68,1) 48%, rgba(139,92,246,1) 100%)'
		},
		{
			className: 'bg-gradient-to-r from-red-500 via-orange-400 to-cyan-400',
			background: 'linear-gradient(100deg, rgba(239,68,68,1) 0%, rgba(251,146,60,1) 46%, rgba(34,211,238,1) 100%)'
		},
		{
			className: 'bg-gradient-to-r from-orange-300 via-violet-500 to-cyan-300',
			background: 'linear-gradient(100deg, rgba(253,186,116,1) 0%, rgba(139,92,246,1) 52%, rgba(103,232,249,1) 100%)'
		},
		{
			className: 'bg-gradient-to-r from-red-400 via-fuchsia-500 to-cyan-400',
			background: 'linear-gradient(100deg, rgba(248,113,113,1) 0%, rgba(217,70,239,1) 55%, rgba(34,211,238,1) 100%)'
		}
	] as const;

	function gradientClassFor(index: number): string {
		const assigned = assignedGradients[index];
		if (assigned) return assigned.className;
		const gradients = activeMode === 'dev' ? devGradientClasses : eventGradientClasses;
		return gradients[index % gradients.length].className;
	}

	function gradientBackgroundFor(index: number): string {
		const assigned = assignedGradients[index];
		if (assigned) return assigned.background;
		const gradients = activeMode === 'dev' ? devGradientClasses : eventGradientClasses;
		return gradients[index % gradients.length].background;
	}

	function assignRandomGradientsForProjects() {
		const gradients = [...(activeMode === 'dev' ? devGradientClasses : eventGradientClasses)];
		const assignments: GradientPreset[] = [];

		for (let index = 0; index < displayedProjects.length; index += 1) {
			if (gradients.length === 0) {
				gradients.push(...(activeMode === 'dev' ? devGradientClasses : eventGradientClasses));
			}

			const randomIndex = Math.floor(Math.random() * gradients.length);
			const [selected] = gradients.splice(randomIndex, 1);
			if (selected) assignments.push(selected);
		}

		assignedGradients = assignments;
	}

	function crossfadeBackground(gradient: string) {
		const active = activeBackgroundLayer === 'a' ? backgroundLayerA : backgroundLayerB;
		const inactive = activeBackgroundLayer === 'a' ? backgroundLayerB : backgroundLayerA;
		if (!active || !inactive) return;

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

	const sectionTitleGradientClass = $derived(gradientClassFor(activeProjectIndex));
	const devToggleClass = $derived(
		activeMode === 'dev'
			? 'rounded-lg px-4 py-2 transition-colors bg-electric-500/45 text-mist-100'
			: 'rounded-lg px-4 py-2 transition-colors text-mist-100/78 hover:bg-electric-500/20'
	);
	const eventToggleClass = $derived(
		activeMode === 'event'
			? 'rounded-lg px-4 py-2 transition-colors bg-violet-500/45 text-mist-100'
			: 'rounded-lg px-4 py-2 transition-colors text-mist-100/78 hover:bg-violet-500/20'
	);
	const techTagClass = $derived(
		activeMode === 'dev'
			? 'rounded-md border border-electric-400/45 px-2.5 py-1 text-xs font-semibold bg-electric-500/24 text-electric-100'
			: 'rounded-md border border-violet-400/45 px-2.5 py-1 text-xs font-semibold bg-violet-500/24 text-violet-100'
	);

	async function setupProjectsFlyIn(options: { randomizeGradients?: boolean } = {}) {
		if (!sectionEl) return;

		if (options.randomizeGradients || assignedGradients.length !== displayedProjects.length) {
			assignRandomGradientsForProjects();
		}

		projectsPinTrigger?.kill();
		projectsPinTrigger = null;
		gsap.killTweensOf(projectCards);

		projectCards = Array.from(sectionEl.querySelectorAll<HTMLElement>('[data-project-card]'));
		if (projectCards.length === 0) return;

		if ($fxDisabled) {
			gsap.set(projectCards, { clearProps: 'all', autoAlpha: 1, yPercent: 0 });
			return;
		}

		gsap.set(projectCards, {
			autoAlpha: 0,
			yPercent: 26
		});
		gsap.set(projectCards[0], { autoAlpha: 1, yPercent: 0 });
		activeProjectIndex = 0;

		const steps = Math.max(projectCards.length - 1, 1);

		projectsPinTrigger = ScrollTrigger.create({
			trigger: sectionEl,
			start: 'top top',
			end: `+=${projectCards.length * 900}`,
			pin: true,
			scrub: 0.22,
			anticipatePin: 1,
			...(projectCards.length > 1 ? { snap: 1 / steps } : {}),
			onEnter: () => {
				crossfadeBackground(gradientBackgroundFor(activeProjectIndex));
			},
			onEnterBack: () => {
				crossfadeBackground(gradientBackgroundFor(activeProjectIndex));
			},
			onLeave: () => {
				fadeBackgroundToBase();
			},
			onLeaveBack: () => {
				fadeBackgroundToBase();
			},
			onUpdate(self) {
				const nextIndex = Math.round(self.progress * steps);
				if (nextIndex === activeProjectIndex) return;
				const scrollDirection = self.direction >= 0 ? 1 : -1;

				const outgoing = projectCards[activeProjectIndex];
				const incoming = projectCards[nextIndex];

				activeProjectIndex = nextIndex;
				if (!incoming) return;
				crossfadeBackground(gradientBackgroundFor(nextIndex));

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
		activeMode = mode;
		await tick();
		await setupProjectsFlyIn({ randomizeGradients: true });
	}

	onMount(() => {
		void setupProjectsFlyIn({ randomizeGradients: true });

		return () => {
			projectsPinTrigger?.kill();
			projectsPinTrigger = null;
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
	<div class="w-full">
		<div class="mb-8 flex flex-wrap items-start justify-between gap-6 sm:mb-10">
			<div class="relative z-10">
				<p class="text-xs font-semibold tracking-[0.22em] text-electric-300 uppercase">Projects</p>
				<h2
					class={`mt-3 bg-clip-text text-5xl font-black tracking-[-0.04em] text-transparent uppercase ${sectionTitleGradientClass} sm:text-6xl lg:text-7xl xl:text-8xl`}
				>
					{modeLabel}
				</h2>
				<p class="mt-4 max-w-4xl text-base font-semibold text-mist-100 sm:text-lg">
					{activeMode === 'dev'
						? 'Software-first builds focused on cloud-native platforms, APIs and intelligent automation. Each system is designed to hit hard in production.'
						: 'Show-critical systems for lighting, networking and realtime production orchestration. Engineered for pressure, precision and zero compromise.'}
				</p>
			</div>

			<div class="relative z-10 ml-auto rounded-xl border border-mist-100/25 bg-anthracite-900/70 p-1.5">
				<div class="flex items-center gap-1 text-xs font-bold tracking-wide uppercase">
					<button
						type="button"
						class={devToggleClass}
						onclick={() => switchMode('dev')}
					>
						Dev
					</button>
					<button
						type="button"
						class={eventToggleClass}
						onclick={() => switchMode('event')}
					>
						Event Tech
					</button>
				</div>
			</div>
		</div>

		<div class="relative z-10 h-[62vh] min-h-105 sm:mt-6 sm:h-[66vh] lg:h-[70vh]">
			<div class="relative h-full w-full">
				{#each displayedProjects as project, index}
					<article
						data-project-card
						class="absolute inset-0 grid items-center gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:gap-12"
					>
						<div class="self-center">
							<p class="text-xs font-bold tracking-[0.18em] text-mist-100/85 uppercase">
								{String(index + 1).padStart(2, '0')} · {project.domain}
							</p>
							<h3
								class={`mt-4 bg-clip-text text-4xl font-black tracking-[-0.02em] text-transparent uppercase ${gradientClassFor(index)} sm:text-5xl lg:text-6xl`}
							>
								{project.title}
							</h3>
							<p class="mt-5 max-w-5xl text-lg leading-relaxed font-medium text-mist-100 sm:text-xl">
								{project.description}
							</p>
							<div class="mt-5 flex flex-wrap gap-2.5">
								{#each project.tech as technology}
									<span class={techTagClass}>{technology}</span>
								{/each}
							</div>
						</div>

						<div class="relative hidden h-full min-h-80 items-center lg:flex">
							<img
								src={project.image}
								alt={project.title}
								class="my-auto h-auto max-h-105 w-full rounded-xl border border-mist-100/20 object-cover"
								loading={index === 0 ? 'eager' : 'lazy'}
							/>
						</div>
					</article>
				{/each}
			</div>
		</div>
	</div>
</section>