<script lang="ts">
	import HighlightCard from '$lib/components/HighlightCard.svelte';
	import type { SkillGroup } from '$lib/content/skills';
	import { fxDisabled } from '$lib/stores/reducedMotion';

	let { skillGroups }: { skillGroups: SkillGroup[] } = $props();

	const featuredSkills = $derived(
		skillGroups
			.flatMap((group) =>
				group.items
					.filter((item) => item.featured && item.description)
					.map((item) => ({
						name: item.name,
						description: item.description ?? '',
						groupTitle: group.title
					}))
			)
			.slice(0, 4)
	);

	const shadowText = 'Skills '.repeat(80).trim();
</script>

<section id="skills" class="section-dark-b relative overflow-hidden px-6 py-24 sm:px-10 lg:px-16">
	<div
		class="pointer-events-none absolute -top-20 -left-24 h-72 w-72 rounded-full bg-electric-500/15 blur-3xl"
	></div>
	<div
		class="pointer-events-none absolute right-0 bottom-0 h-80 w-80 rounded-full bg-violet-500/15 blur-3xl"
	></div>

	<div class="mx-auto w-full max-w-7xl">
		<div class="relative mb-14">
			<div
				class="pointer-events-none absolute -top-10 left-1/2 w-screen -translate-x-1/2 overflow-hidden select-none"
				class:fx-paused={$fxDisabled}
			>
				<p
					class="skills-band skills-band-left text-5xl font-black tracking-[-0.06em] text-mist-100/5 uppercase sm:text-7xl lg:text-8xl"
				>
					<span>{shadowText}</span>
					<span aria-hidden="true">{shadowText}</span>
				</p>
				<p
					class="skills-band skills-band-right -mt-2 text-5xl font-black tracking-[-0.06em] text-mist-100/5 uppercase sm:text-7xl lg:text-8xl"
				>
					<span>{shadowText}</span>
					<span aria-hidden="true">{shadowText}</span>
				</p>
			</div>
			<p class="text-xs font-semibold tracking-[0.2em] text-electric-400 uppercase">
				Developer Skills
			</p>
			<h2
				class="mt-3 bg-linear-to-r from-red-400 via-violet-400 to-cyan-300 bg-clip-text text-4xl font-black tracking-[-0.03em] text-transparent uppercase sm:text-5xl lg:text-6xl"
			>
				Cloud-native engineering for real production systems.
			</h2>
			<p class="mt-5 max-w-5xl text-base font-semibold text-mist-100/90 sm:text-lg">
				Senior full-stack development focused on TypeScript, Go, Node.js and microservices
				architecture. Strong in cloud native infrastructure, API integrations, CI/CD delivery,
				observability, compliance, and scalable backend systems.
			</p>
		</div>

		{#if featuredSkills.length > 0}
			<div class="mb-12">
				<p class="text-xs font-semibold tracking-[0.2em] text-violet-300/90 uppercase">
					Core strengths
				</p>
				<div class="mt-5 grid gap-4 sm:grid-cols-2">
					{#each featuredSkills as skill}
						<HighlightCard
							label={skill.name}
							description={skill.description}
							kicker={skill.groupTitle}
						/>
					{/each}
				</div>
			</div>
		{/if}

		<div class="space-y-8">
			{#each skillGroups as group, index}
				<div data-animate class="border-b border-electric-400/25 py-8 first:border-t">
					<div class="grid gap-6 lg:grid-cols-[minmax(0,0.38fr)_minmax(0,1fr)] lg:gap-10">
						<div>
							<p class="text-xs font-bold tracking-[0.22em] text-electric-400/90 uppercase">
								{String(index + 1).padStart(2, '0')}
							</p>
							<h3
								class="mt-2 text-2xl font-black tracking-[-0.02em] text-mist-100 uppercase sm:text-3xl"
							>
								{group.title}
							</h3>
							<p class="mt-3 max-w-sm text-sm leading-relaxed font-semibold text-mist-100/75">
								{group.description}
							</p>
						</div>

						<ul
							class="flex flex-wrap content-start items-start gap-x-2 gap-y-3 self-start pt-1 sm:gap-x-2.5"
						>
							{#each group.items as item}
								<li
									class={`inline-flex cursor-pointer items-center rounded-lg border px-3 py-2 text-sm leading-tight font-semibold tracking-normal ${
										item.featured
											? 'border-electric-300/70 bg-electric-300/12 text-electric-100'
											: 'border-mist-100/20 bg-mist-100/5 text-mist-100/90'
									}`}
								>
									{item.name}
								</li>
							{/each}
						</ul>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.skills-band {
		display: flex;
		width: max-content;
		white-space: nowrap;
		will-change: transform;
	}

	.skills-band span {
		padding-right: 2rem;
	}

	.skills-band-left {
		animation: skills-marquee-left 128s linear infinite;
	}

	.skills-band-right {
		animation: skills-marquee-right 128s linear infinite;
	}

	.fx-paused .skills-band-left,
	.fx-paused .skills-band-right {
		animation-play-state: paused;
	}

	@keyframes skills-marquee-left {
		from {
			transform: translateX(0);
		}

		to {
			transform: translateX(-50%);
		}
	}

	@keyframes skills-marquee-right {
		from {
			transform: translateX(-50%);
		}

		to {
			transform: translateX(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.skills-band-left,
		.skills-band-right {
			animation: none;
		}
	}
</style>
