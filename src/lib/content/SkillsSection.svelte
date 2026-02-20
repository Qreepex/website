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
</section>