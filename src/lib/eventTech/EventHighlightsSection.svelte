<script lang="ts">
	import { eventHighlightProjects, type EventAccent } from '$lib/content/eventTech';

	const accentVars: Record<EventAccent, string> = {
		violet: 'var(--color-violet-400)',
		cyan: 'var(--color-cyan-400)',
		electric: 'var(--color-electric-400)',
		pink: '#ff2f92'
	};

	const accentFallbackBgs: Record<EventAccent, string> = {
		violet:
			'radial-gradient(70% 70% at 30% 30%, color-mix(in oklab, var(--color-violet-500) 35%, transparent), transparent), linear-gradient(180deg, #0c0f14 0%, #020203 100%)',
		cyan: 'radial-gradient(70% 70% at 60% 40%, color-mix(in oklab, var(--color-cyan-400) 30%, transparent), transparent), linear-gradient(180deg, #0c0f14 0%, #020203 100%)',
		electric:
			'radial-gradient(70% 70% at 40% 60%, color-mix(in oklab, var(--color-electric-500) 32%, transparent), transparent), linear-gradient(180deg, #0c0f14 0%, #020203 100%)',
		pink: 'radial-gradient(70% 70% at 55% 35%, color-mix(in oklab, #ff2f92 30%, transparent), transparent), linear-gradient(180deg, #0c0f14 0%, #020203 100%)'
	};
</script>

<section
	id="event-highlight-projects"
	class="section-dark-a relative overflow-hidden px-6 py-24 sm:px-10 lg:px-16"
>
	<div
		class="pointer-events-none absolute top-16 -left-20 h-80 w-80 rounded-full bg-violet-500/12 blur-3xl"
	></div>
	<div
		class="pointer-events-none absolute -right-16 bottom-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"
	></div>

	<div class="mx-auto w-full max-w-7xl">
		<p class="text-xs font-semibold tracking-[0.2em] text-violet-300 uppercase">
			Highlight Projects
		</p>
		<h2
			class="title-gradient-vivid mt-3 text-4xl font-black tracking-[-0.03em] uppercase sm:text-5xl lg:text-6xl"
		>
			Showcases I'm proud of.
		</h2>
		<p class="mt-5 max-w-5xl text-base font-semibold text-mist-100/90 sm:text-lg">
			Selected productions where I was responsible for lighting, lasers and show-critical
			infrastructure — from first sketch to final cue.
		</p>

		<div class="mt-12 grid gap-6 md:grid-cols-2">
			{#each eventHighlightProjects as project, index}
				<article
					data-animate
					class="highlight-project group relative flex flex-col overflow-hidden border bg-black"
					style={`--card-accent: ${accentVars[project.accent]};`}
				>
					<div
						class="relative aspect-16/10 overflow-hidden"
						style={project.image ? undefined : `background: ${accentFallbackBgs[project.accent]};`}
					>
						{#if project.image}
							<img
								src={project.image}
								alt={`${project.title} — ${project.meta}`}
								class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
								loading={index < 2 ? 'eager' : 'lazy'}
							/>
						{:else}
							<div class="flex h-full items-center justify-center p-8">
								<p
									class="text-center text-3xl font-black tracking-[-0.03em] text-mist-100/25 uppercase sm:text-4xl"
								>
									{project.title}
								</p>
							</div>
						{/if}
						<div
							class="pointer-events-none absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent"
						></div>
						{#if project.placeholder}
							<span class="coming-soon-badge">Coming Soon</span>
						{/if}
					</div>

					<div class="flex flex-1 flex-col p-6">
						<p
							class="text-[11px] font-black tracking-[0.16em] uppercase"
							style={`color: var(--card-accent);`}
						>
							{project.meta}
						</p>
						<h3
							class="mt-2 text-2xl font-black tracking-[-0.02em] text-mist-100 uppercase sm:text-3xl"
						>
							{project.title}
						</h3>
						<p
							class="mt-3 flex-1 text-sm leading-relaxed font-semibold text-mist-100/80 sm:text-base"
						>
							{project.description}
						</p>
						<ul class="mt-5 flex flex-wrap gap-2">
							{#each project.tags as tag}
								<li class="highlight-tag">{tag}</li>
							{/each}
						</ul>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	.highlight-project {
		border-color: color-mix(in oklab, var(--card-accent) 35%, transparent);
		transition:
			transform 0.22s cubic-bezier(0.22, 0.85, 0.3, 1.35),
			border-color 0.2s ease,
			box-shadow 0.2s ease;
	}

	.highlight-project:hover {
		transform: translateY(-4px);
		border-color: var(--card-accent);
		box-shadow:
			0 0 0 2px var(--card-accent),
			0 26px 50px -14px color-mix(in oklab, var(--card-accent) 70%, transparent),
			0 0 60px -8px color-mix(in oklab, var(--card-accent) 55%, transparent);
	}

	.coming-soon-badge {
		position: absolute;
		top: 0.9rem;
		right: 0.9rem;
		background: var(--card-accent);
		color: #050505;
		padding: 0.3rem 0.65rem;
		font-size: 0.68rem;
		font-weight: 900;
		letter-spacing: 0.08em;
		text-transform: uppercase;
		clip-path: polygon(8% 0, 100% 0, 92% 100%, 0 100%);
	}

	.highlight-tag {
		background: color-mix(in oklab, var(--card-accent) 16%, transparent);
		color: var(--card-accent);
		padding: 0.3rem 0.6rem;
		font-size: 0.7rem;
		font-weight: 800;
		letter-spacing: 0.06em;
		text-transform: uppercase;
	}
</style>
