<script lang="ts">
	import type { SkillGroup } from '$lib/content/skills';

	let { skillGroups }: { skillGroups: SkillGroup[] } = $props();
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
			<p
				class="pointer-events-none absolute -top-9 left-0 text-5xl font-black tracking-[-0.06em] text-mist-100/5 uppercase sm:text-7xl lg:text-8xl"
			>
				Skills
			</p>
			<p class="text-xs font-semibold tracking-[0.2em] text-electric-400 uppercase">Skills</p>
			<h2
				class="mt-3 bg-linear-to-r from-red-400 via-violet-400 to-cyan-300 bg-clip-text text-4xl font-black tracking-[-0.03em] text-transparent uppercase sm:text-5xl lg:text-6xl"
			>
				Production-grade software expression.
			</h2>
			<p class="mt-5 max-w-4xl text-base font-semibold text-mist-100/90 sm:text-lg">
				Built for delivery under pressure across apps, APIs, infrastructure, and production systems.
			</p>
		</div>

		<div class="space-y-8">
			{#each skillGroups as group, index}
				<div data-animate class="border-y border-electric-400/25 py-8">
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
						</div>

						<ul class="flex flex-wrap items-center gap-x-5 gap-y-3 pt-1">
							{#each group.items as item}
								<li
									class="relative pr-5 text-sm font-bold tracking-[0.11em] text-mist-100/92 uppercase after:absolute after:top-1/2 after:right-0 after:h-1.5 after:w-1.5 after:-translate-y-1/2 after:rounded-full after:bg-electric-400/70 last:pr-0 last:after:hidden sm:text-base"
								>
									{item}
								</li>
							{/each}
						</ul>
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
