<script lang="ts">
	import { eventToolGroups } from '$lib/content/eventTech';
</script>

<section
	id="event-tools"
	class="section-dark-b relative overflow-hidden px-6 py-24 sm:px-10 lg:px-16"
>
	<div
		class="pointer-events-none absolute -top-16 right-0 h-72 w-72 rounded-full bg-violet-500/12 blur-3xl"
	></div>

	<div class="mx-auto w-full max-w-5xl">
		<p class="text-xs font-semibold tracking-[0.2em] text-violet-300 uppercase">
			Tools &amp; Consoles
		</p>
		<h2
			class="title-gradient-vivid mt-3 text-4xl font-black tracking-[-0.03em] uppercase sm:text-5xl lg:text-6xl"
		>
			The gear I speak fluently.
		</h2>
		<p class="mt-5 max-w-3xl text-base font-semibold text-mist-100/90 sm:text-lg">
			A quick inventory of the desks, systems and workflows I reach for on real productions —
			organized by where they sit in a rig.
		</p>

		<div class="mt-12 max-w-3xl space-y-10">
			{#each eventToolGroups as group}
				<div class="tool-group">
					<h3 class="text-xl font-black tracking-[-0.02em] text-mist-100 uppercase sm:text-2xl">
						{group.title}
					</h3>
					<p class="mt-2 text-sm leading-relaxed font-semibold text-mist-100/70 sm:text-base">
						{group.description}
					</p>
					<p class="tool-line mt-3 text-base leading-relaxed text-mist-100/85 sm:text-lg">
						{#each group.items as item, index}
							<span class="tool-item">{item}</span>{#if index < group.items.length - 1}<span
									class="tool-sep"
									aria-hidden="true">·</span
								>{/if}
						{/each}
					</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<style>
	.tool-group {
		position: relative;
		padding-left: 1.25rem;
	}

	.tool-group::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.35rem;
		bottom: 0.35rem;
		width: 2px;
		background: linear-gradient(
			180deg,
			color-mix(in oklab, var(--color-violet-400) 70%, transparent),
			transparent
		);
	}

	.tool-item {
		font-weight: 600;
		transition: color 0.15s ease;
	}

	.tool-item:hover {
		color: var(--color-violet-300);
	}

	.tool-sep {
		margin: 0 0.7rem;
		color: color-mix(in oklab, var(--color-violet-400) 50%, transparent);
	}
</style>
