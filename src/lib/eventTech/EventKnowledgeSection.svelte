<script lang="ts">
	import { fxDisabled } from '$lib/stores/reducedMotion';

	const shadowText = 'Knowledge '.repeat(60).trim();
</script>

<section
	id="event-knowledge"
	class="section-dark-a relative overflow-hidden px-6 py-24 sm:px-10 lg:px-16"
>
	<div
		class="pointer-events-none absolute -top-20 -left-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"
	></div>
	<div
		class="pointer-events-none absolute right-0 bottom-0 h-80 w-80 rounded-full bg-violet-500/12 blur-3xl"
	></div>

	<div class="mx-auto w-full max-w-7xl">
		<div class="relative mb-12">
			<div
				class="pointer-events-none absolute -top-10 left-1/2 w-screen -translate-x-1/2 overflow-hidden select-none"
				class:fx-paused={$fxDisabled}
			>
				<p
					class="knowledge-band knowledge-band-left text-5xl font-black tracking-[-0.06em] text-mist-100/5 uppercase sm:text-7xl lg:text-8xl"
				>
					<span>{shadowText}</span>
					<span aria-hidden="true">{shadowText}</span>
				</p>
			</div>
			<p class="text-xs font-semibold tracking-[0.2em] text-cyan-300 uppercase">Knowledge</p>
			<h2
				class="title-gradient-vivid mt-3 text-4xl font-black tracking-[-0.03em] uppercase sm:text-5xl lg:text-6xl"
			>
				What I bring to your stage.
			</h2>
		</div>

		<div class="max-w-6xl space-y-8 text-base leading-relaxed text-mist-100/86 sm:text-lg">
			<p>
				Most productions don't fail on the headline tech - they fail on the invisible bits
				underneath. That's where I put most of my attention: rig planning that respects power and
				sight lines, signal flow that survives a dropped connector, and a timecode show locked tight
				enough that the pyro fires exactly when the drop hits, not two bars later.
			</p>
			<p>
				When it comes to actually running the show I split my time between two very different
				instincts. Concert FOH and club nights demand reacting to the room: reading the crowd,
				catching a vocalist a half-step before they blow the system, finding an extra ten percent of
				low end you didn't know the PA had. Festivals and corporate productions demand the opposite:
				advance preparation so complete that show day feels like pressing play on something you
				already built in your head. I'm fluent in both.
			</p>
			<p>
				Laser work is its own discipline. Programming aerials in Pangolin BEYOND is half creative,
				half regulatory chess - keeping the beams beautiful while staying inside
				<strong class="text-mist-100">OStrV</strong>-compliant audience-scanning limits, filling out
				the TROS paperwork and walking the DGUV line so promoters and insurers sleep well. It's the
				part of the job nobody claps for, and the part I take most seriously.
			</p>
			<p>
				Being a software developer isn't a distraction from all this - it's why I gravitate toward
				networked setups, scripted workflows and careful versioned showfiles instead of a folder
				called <em class="text-mist-100">"final_v3_REALLYFINAL"</em>. The crossing point between AV
				and IT is where most modern productions quietly live, and where I feel most at home.
			</p>
		</div>
	</div>
</section>

<style>
	.knowledge-band {
		display: flex;
		width: max-content;
		white-space: nowrap;
		will-change: transform;
	}

	.knowledge-band span {
		padding-right: 2rem;
	}

	.knowledge-band-left {
		animation: knowledge-marquee 110s linear infinite;
	}

	.fx-paused .knowledge-band-left {
		animation-play-state: paused;
	}

	@keyframes knowledge-marquee {
		from {
			transform: translateX(0);
		}

		to {
			transform: translateX(-50%);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.knowledge-band-left {
			animation: none;
		}
	}
</style>
