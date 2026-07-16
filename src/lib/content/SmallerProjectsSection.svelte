<script lang="ts">
	import { smallerDevProjects } from '$lib/content';

	const smallerProjectTechTagClass =
		'bg-mist-100/8 px-2 py-1 text-[10px] font-black tracking-[0.08em] text-mist-100/75 uppercase';
</script>

<section
	class="relative flex w-full flex-col overflow-hidden bg-anthracite-900 px-6 pb-24 sm:px-10 sm:pb-28 lg:px-16"
>
	<div class="relative z-10">
		<div class="mb-8 sm:mb-10">
			<p class="text-xs font-bold tracking-[0.2em] text-mist-100/62 uppercase">More Builds</p>
			<h3 class="mt-3 text-3xl font-black tracking-[-0.03em] text-mist-100 uppercase sm:text-4xl">
				Smaller Projects
			</h3>
		</div>
		<div class="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
			{#each smallerDevProjects as project}
				{#if project.url}
					<a
						data-smaller-card
						href={project.url}
						target="_blank"
						rel="noopener noreferrer"
						class="smaller-card group border border-mist-100/12 bg-mist-100/2 p-4"
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
					<div data-smaller-card class="smaller-card border border-mist-100/12 bg-mist-100/2 p-4">
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
	</div>
</section>

<style>
	.smaller-card {
		transition:
			transform 0.2s cubic-bezier(0.22, 0.85, 0.3, 1.35),
			border-color 0.2s ease,
			box-shadow 0.2s ease,
			background-color 0.2s ease;
	}

	.smaller-card:hover {
		transform: translateY(-3px);
		border-color: var(--color-electric-400);
		background: color-mix(in oklab, var(--color-electric-400) 5%, transparent);
		box-shadow:
			0 0 0 1px var(--color-electric-400),
			0 18px 40px -18px color-mix(in oklab, var(--color-electric-400) 60%, transparent);
	}
</style>
