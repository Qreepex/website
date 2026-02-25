<script lang="ts">
	import { onMount, tick } from 'svelte';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { fxDisabled } from '$lib/stores/reducedMotion';
	import { smallerDevProjects } from '$lib/content';

	gsap.registerPlugin(ScrollTrigger);

	let sectionEl = $state<HTMLElement | null>(null);
	let viewportEl = $state<HTMLDivElement | null>(null);
	let trackEl = $state<HTMLDivElement | null>(null);
	let pinTrigger: ScrollTrigger | null = null;

	const smallerProjectTechTagClass =
		'rounded-sm border border-mist-100/18 bg-mist-100/4 px-2 py-1 text-[10px] font-semibold tracking-[0.08em] text-mist-100/72 uppercase';

	function setupPin() {
		pinTrigger?.kill();
		pinTrigger = null;

		if (!sectionEl || !viewportEl || !trackEl) return;

		const section = sectionEl;
		const viewport = viewportEl;
		const track = trackEl;

		gsap.killTweensOf(track);

		if ($fxDisabled) {
			gsap.set(track, { clearProps: 'all' });
			return;
		}

		const getScrollDistance = () => Math.max(track.scrollWidth - viewport.clientWidth, 0);
		if (getScrollDistance() === 0) {
			gsap.set(track, { x: 0 });
			return;
		}

		const getLeadInBuffer = () => Math.max(Math.min(viewport.clientHeight * 0.06, 72), 28);
		const getLeadOutBuffer = () => Math.max(Math.min(viewport.clientHeight * 0.08, 96), 36);
		const getEdgeTravel = () => {
			const distance = getScrollDistance();
			const desired = Math.max(Math.min(distance * 0.14, 160), 36);
			return Math.min(desired, distance / 2);
		};
		const getMiddleTravel = () => Math.max(getScrollDistance() - getEdgeTravel() * 2, 0);
		gsap.set(track, { x: 0 });

		const timeline = gsap.timeline({
			defaults: { ease: 'none', overwrite: 'auto' },
			scrollTrigger: {
				trigger: section,
				start: 'top top',
				end: () => `+=${Math.max(getLeadInBuffer() + getScrollDistance() + getLeadOutBuffer(), 1)}`,
				pin: true,
				scrub: 0.55,
				anticipatePin: 1,
				invalidateOnRefresh: true
			}
		});

		timeline.to({}, { duration: () => getLeadInBuffer() });
		timeline.to(track, {
			x: () => -getEdgeTravel(),
			duration: () => getEdgeTravel(),
			ease: 'sine.in'
		});
		timeline.to(track, {
			x: () => -(getEdgeTravel() + getMiddleTravel()),
			duration: () => getMiddleTravel(),
			ease: 'none'
		});
		timeline.to(track, {
			x: () => -getScrollDistance(),
			duration: () => getEdgeTravel(),
			ease: 'sine.out'
		});
		timeline.to({}, { duration: () => getLeadOutBuffer() });

		pinTrigger = timeline.scrollTrigger ?? null;
	}

	onMount(() => {
		setupPin();

		return () => {
			pinTrigger?.kill();
			pinTrigger = null;
			if (trackEl) gsap.killTweensOf(trackEl);
		};
	});

	$effect(() => {
		$fxDisabled;
		if (!sectionEl) return;
		void (async () => {
			await tick();
			setupPin();
		})();
	});
</script>

<section
	bind:this={sectionEl}
	class="relative flex h-screen w-full flex-col overflow-hidden bg-anthracite-900 px-6 pt-18 pb-24 sm:px-10 sm:pt-20 sm:pb-28 lg:px-16 lg:pt-22"
>
	<div class="relative z-10 flex h-full min-h-0 flex-col">
		<div class="mb-8 sm:mb-10">
			<p class="text-xs font-bold tracking-[0.2em] text-mist-100/62 uppercase">More Builds</p>
			<h3 class="mt-3 text-3xl font-black tracking-[-0.03em] text-mist-100 uppercase sm:text-4xl">
				Smaller Projects
			</h3>
		</div>
		<div bind:this={viewportEl} class="relative min-h-0 flex-1 overflow-hidden">
			<div
				bind:this={trackEl}
				class="sm:auto-cols-88 grid h-full w-max auto-cols-[min(82vw,22rem)] grid-flow-col grid-rows-2 gap-5 pr-6 pl-6 sm:gap-6 sm:pr-10 sm:pl-10 lg:pr-16 lg:pl-16"
			>
				{#each smallerDevProjects as project}
					{#if project.url}
						<a
							data-smaller-card
							href={project.url}
							target="_blank"
							rel="noopener noreferrer"
							class="group h-full border border-mist-100/12 bg-mist-100/2 p-4 transition-colors hover:border-mist-100/22 hover:bg-mist-100/4"
						>
							<p class="text-[11px] font-bold tracking-[0.18em] text-mist-100/62 uppercase">
								{project.domain}
							</p>
							<h4
								class="mt-3 text-xl font-black tracking-[-0.02em] text-mist-100 uppercase transition-opacity group-hover:opacity-80"
							>
								{project.title}
							</h4>
							<p class="mt-3 text-sm leading-relaxed text-mist-100/78">{project.description}</p>
							<div class="mt-4 flex flex-wrap gap-1.5">
								{#each project.tech as technology}
									<span class={smallerProjectTechTagClass}>{technology}</span>
								{/each}
							</div>
						</a>
					{:else}
						<div data-smaller-card class="h-full border border-mist-100/12 bg-mist-100/2 p-4">
							<p class="text-[11px] font-bold tracking-[0.18em] text-mist-100/62 uppercase">
								{project.domain}
							</p>
							<h4 class="mt-3 text-xl font-black tracking-[-0.02em] text-mist-100 uppercase">
								{project.title}
							</h4>
							<p class="mt-3 text-sm leading-relaxed text-mist-100/78">{project.description}</p>
							<div class="mt-4 flex flex-wrap gap-1.5">
								{#each project.tech as technology}
									<span class={smallerProjectTechTagClass}>{technology}</span>
								{/each}
							</div>
						</div>
					{/if}
				{/each}
			</div>
			<div
				class="pointer-events-none absolute inset-y-0 left-0 z-20 w-8 bg-linear-to-r from-anthracite-900 to-transparent sm:w-12"
			></div>
			<div
				class="pointer-events-none absolute inset-y-0 right-0 z-20 w-8 bg-linear-to-l from-anthracite-900 to-transparent sm:w-12"
			></div>
		</div>
	</div>
</section>
