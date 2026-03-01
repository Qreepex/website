<script lang="ts">
	import type { Project, ProjectsMode } from '$lib/types';

	let {
		project,
		index,
		activeMode,
		projectMetaClass,
		projectTitleClass,
		techTagClass,
		gradientClass,
		gradientStyle
	}: {
		project: Project;
		index: number;
		activeMode: ProjectsMode;
		projectMetaClass: string;
		projectTitleClass: string;
		techTagClass: string;
		gradientClass: string;
		gradientStyle: string;
	} = $props();
</script>

<article
	data-project-card
	class="absolute inset-0 grid items-center gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:gap-12"
>
	{#if project.url}
		<a
			href={project.url}
			target="_blank"
			rel="noopener noreferrer"
			class="group cursor-pointer self-center"
		>
			<p class={projectMetaClass}>
				{String(index + 1).padStart(2, '0')} · {project.domain}
				{#if project.former}
					<span
						class="ml-2 rounded-sm border border-mist-100/35 bg-mist-100/10 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-mist-100/65 uppercase"
						>Former</span
					>
				{/if}
			</p>
			<h3
				class={`${projectTitleClass} ${activeMode === 'dev' ? gradientClass : ''} transition-opacity group-hover:opacity-80`}
				style={activeMode === 'dev' ? gradientStyle : ''}
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
		</a>
	{:else}
		<div class="self-center">
			<p class={projectMetaClass}>
				{String(index + 1).padStart(2, '0')} · {project.domain}
				{#if project.former}
					<span
						class="ml-2 rounded-sm border border-mist-100/35 bg-mist-100/10 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-mist-100/65 uppercase"
						>Former</span
					>
				{/if}
			</p>
			<h3
				class={`${projectTitleClass} ${activeMode === 'dev' ? gradientClass : ''}`}
				style={activeMode === 'dev' ? gradientStyle : ''}
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
	{/if}

	{#if project.url}
		<a
			href={project.url}
			target="_blank"
			rel="noopener noreferrer"
			class="group relative hidden h-full min-h-80 items-center lg:flex"
		>
			<img
				src={project.image}
				alt={project.title}
				class="my-auto h-auto max-h-105 w-full cursor-pointer rounded-xl object-cover transition-opacity group-hover:opacity-80"
				loading={index === 0 ? 'eager' : 'lazy'}
			/>
		</a>
	{:else}
		<div class="relative hidden h-full min-h-80 items-center lg:flex">
			<img
				src={project.image}
				alt={project.title}
				class="my-auto h-auto max-h-105 w-full rounded-xl border border-mist-100/20 object-cover"
				loading={index === 0 ? 'eager' : 'lazy'}
			/>
		</div>
	{/if}
</article>
