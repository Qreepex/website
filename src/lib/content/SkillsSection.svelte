<script lang="ts">
	type SkillGroup = {
		title: string;
		items: string[];
	};

	let { skillGroups }: { skillGroups: SkillGroup[] } = $props();
</script>

<section id="skills" class="section-dark-b relative px-6 py-24 sm:px-10 lg:px-16">
	<div class="mx-auto w-full max-w-7xl">
		<div class="mb-12">
			<p class="text-xs font-semibold tracking-[0.2em] text-electric-400 uppercase">Skills</p>
			<h2 class="mt-2 text-3xl font-bold sm:text-4xl">
				Production-grade software and stage technology expertise.
			</h2>
		</div>

		{#each skillGroups as group}
			<div data-animate class="border-t border-electric-400/25 py-8 last:border-b">
				<h3 class="mb-4 text-xl font-semibold text-mist-100">{group.title}</h3>
				<div class="flex flex-wrap gap-2.5">
					{#each group.items as item}
						<span
							class="rounded-lg border border-electric-400/35 bg-black/25 px-3 py-1.5 text-sm text-mist-100/90"
							>{item}</span
						>
					{/each}
				</div>
			</div>
		{/each}
	</div>

	<div class="wave-separator text-anthracite-800">
		<svg
			viewBox="0 0 1440 170"
			class="h-23 w-full"
			preserveAspectRatio="none"
			aria-hidden="true"
		>
			<path
				fill="currentColor"
				d="M0,128L60,112C120,96,240,64,360,53.3C480,43,600,53,720,69.3C840,85,960,107,1080,112C1200,117,1320,107,1380,101.3L1440,96L1440,171L1380,171C1320,171,1200,171,1080,171C960,171,840,171,720,171C600,171,480,171,360,171C240,171,120,171,60,171L0,171Z"
			></path>
		</svg>
	</div>
</section>