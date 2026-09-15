<script lang="ts">
	import { eventTypeChips } from '$lib/content/eventTech';
</script>

<section
	id="event-about"
	class="section-dark-b relative overflow-hidden px-6 py-24 sm:px-10 lg:px-16"
>
	<div
		class="pointer-events-none absolute top-10 -right-24 h-80 w-80 rounded-full bg-violet-500/12 blur-3xl"
	></div>

	<div class="mx-auto w-full max-w-4xl">
		<p class="mb-3 text-xs font-semibold tracking-[0.2em] text-violet-300 uppercase">About me</p>
		<h2
			class="title-gradient-vivid mb-10 text-4xl font-black tracking-[-0.03em] uppercase sm:text-5xl"
		>
			One tech. Every stage.
		</h2>

		<div class="space-y-6 text-base leading-relaxed text-mist-100/86 sm:text-lg">
			<p>
				I'm Ben — <strong class="text-mist-100">event technician from Hamburg</strong> — and I spend
				most of my working life where the show happens. You'll find me behind the FOH desk at the
				<a
					href="https://grossefreiheit36.de"
					target="_blank"
					rel="noopener noreferrer"
					class="event-link">Große Freiheit 36</a
				>, mixing monitors at
				<a
					href="https://docks-prinzenbar.de"
					target="_blank"
					rel="noopener noreferrer"
					class="event-link">Docks</a
				>
				or
				<a
					href="https://circle-club.de"
					target="_blank"
					rel="noopener noreferrer"
					class="event-link">Circle Club</a
				>, but just as often riding some contraption through the
				<a
					href="https://schlagermove.de"
					target="_blank"
					rel="noopener noreferrer"
					class="event-link">Schlagermove</a
				>
				or along the harbor at the
				<a
					href="https://www.hamburg.de/hafengeburtstag"
					target="_blank"
					rel="noopener noreferrer"
					class="event-link">Hafengeburtstag</a
				>. If it makes sound, light or both, I've probably run it here.
			</p>
			<p>
				I keep busy off the beaten path too: Messen, Tagungen, Kino jobs, corporate launches and the
				odd wedding all came through the desk at some point. Every gig adds a wrinkle the last one
				didn't have, which is exactly why I still like this job after hundreds of shows.
			</p>
			<p>
				Lately I'm also building with
				<a
					href="https://pruef-demos.de/hamburg"
					target="_blank"
					rel="noopener noreferrer"
					class="event-link">Prüf Hamburg</a
				>: custom speaker wagons and mobile rigs, designed from scratch to survive cobblestones,
				rain and thousands of dancing people. If it needs to exist and doesn't yet, I'll find a
				truss, some L-Acoustics boxes and a welder and make it work.
			</p>
			<p>
				I'm equally comfortable on sound, light or laser — the broad spectrum is the point. And I'm
				a <strong class="text-mist-100"
					>licensed Laser Safety Officer according to OStrV, TROS and DGUV</strong
				>, so your aerial effects stay spectacular for the audience and boring for the insurance
				company.
			</p>
		</div>

		<p class="mt-14 text-xs font-semibold tracking-[0.2em] text-cyan-300 uppercase">
			Open for work across
		</p>
		<ul class="mt-4 flex flex-wrap gap-2.5">
			{#each eventTypeChips as chip}
				<li class="event-type-chip">{chip}</li>
			{/each}
		</ul>

		<a
			href="/reach-me"
			class="event-about-cta mt-12 inline-flex items-center px-6 py-3.5 text-sm font-black tracking-[0.12em] uppercase"
		>
			Book me for your event
		</a>
	</div>
</section>

<style>
	.event-type-chip {
		background: color-mix(in oklab, var(--color-violet-400) 14%, transparent);
		border: 1px solid color-mix(in oklab, var(--color-violet-400) 35%, transparent);
		color: var(--color-mist-100);
		padding: 0.45rem 0.8rem;
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.04em;
		text-transform: uppercase;
		cursor: default;
		transition:
			transform 0.15s ease,
			background-color 0.15s ease;
	}

	.event-type-chip:hover {
		transform: translateY(-2px);
		background: color-mix(in oklab, var(--color-violet-400) 30%, transparent);
	}

	.event-link {
		color: var(--color-mist-100);
		text-decoration: underline;
		text-decoration-color: color-mix(in oklab, var(--color-violet-400) 55%, transparent);
		text-underline-offset: 3px;
		transition:
			color 0.15s ease,
			text-decoration-color 0.15s ease;
	}

	.event-link:hover {
		color: var(--color-violet-300);
		text-decoration-color: var(--color-violet-400);
	}

	.event-about-cta {
		color: var(--color-mist-100);
		border: 2px solid var(--color-violet-400);
		background: color-mix(in oklab, var(--color-violet-400) 14%, transparent);
		clip-path: polygon(4% 0, 100% 0, 96% 100%, 0 100%);
		transition:
			background-color 0.2s ease,
			color 0.2s ease,
			transform 0.2s cubic-bezier(0.22, 0.85, 0.3, 1.35),
			box-shadow 0.2s ease;
	}

	.event-about-cta:hover {
		background: var(--color-violet-400);
		color: #050505;
		transform: translateY(-2px) scale(1.03);
		box-shadow:
			0 16px 34px -12px color-mix(in oklab, var(--color-violet-400) 65%, transparent),
			0 0 44px -8px color-mix(in oklab, var(--color-violet-400) 55%, transparent);
	}
</style>
