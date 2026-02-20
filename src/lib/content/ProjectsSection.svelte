<script lang="ts">
	type Project = {
		title: string;
		domain: string;
		description: string;
		tech: string[];
	};

	let { projects }: { projects: Project[] } = $props();
</script>

<section id="projects" class="section-dark-b px-6 py-24 sm:px-10 lg:px-16">
	<div class="mx-auto w-full max-w-7xl">
		<div class="mb-10">
			<p class="text-xs font-semibold tracking-[0.2em] text-electric-400 uppercase">Projects</p>
			<h2 class="mt-2 text-3xl font-bold sm:text-4xl">
				Selected builds and experimental concepts.
			</h2>
		</div>

		{#each projects as project}
			<article data-animate class="border-t border-violet-400/28 py-8 last:border-b">
				<p class="text-xs tracking-[0.14em] text-cyan-300 uppercase">{project.domain}</p>
				<h3 class="mt-2 text-2xl font-semibold text-mist-100">{project.title}</h3>
				<p class="mt-3 max-w-4xl text-sm leading-relaxed text-mist-100/80">
					{project.description}
				</p>
				<div class="mt-5 flex flex-wrap gap-2">
					{#each project.tech as technology}
						<span class="rounded-md bg-violet-500/18 px-2.5 py-1 text-xs text-violet-200"
							>{technology}</span
						>
					{/each}
				</div>
			</article>
		{/each}
	</div>
</section>