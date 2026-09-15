<section
	id="event-cta"
	class="section-dark-b relative overflow-hidden px-6 py-24 sm:px-10 lg:px-16"
>
	<div
		class="pointer-events-none absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/12 blur-3xl"
	></div>

	<div class="relative mx-auto w-full max-w-4xl text-center">
		<p class="text-xs font-semibold tracking-[0.2em] text-cyan-300 uppercase">Availability</p>
		<h2
			class="title-gradient-vivid mt-3 text-4xl font-black tracking-[-0.03em] uppercase sm:text-5xl lg:text-6xl"
		>
			Let's build your show.
		</h2>
		<p
			class="mx-auto mt-6 max-w-2xl text-base leading-relaxed font-semibold text-mist-100/90 sm:text-lg"
		>
			I'm currently looking for new event tech productions — lighting design, laser shows, timecode
			programming and full show operation. Tell me about your production and let's make it
			unforgettable.
		</p>
		<div class="mt-8 flex flex-wrap justify-center gap-3 text-sm font-black">
			<a href="/reach-me" class="cta-violet">Get in touch</a>
			<a href="/#projects" class="cta-ghost">Back to dev references</a>
		</div>
	</div>
</section>

<style>
	.cta-violet,
	.cta-ghost {
		position: relative;
		display: inline-flex;
		align-items: center;
		padding: 0.8rem 1.5rem;
		text-transform: uppercase;
		letter-spacing: 0.02em;
		clip-path: polygon(5% 0, 100% 0, 95% 100%, 0 100%);
		transition:
			background-color 0.2s ease,
			color 0.2s ease,
			border-color 0.2s ease,
			transform 0.2s cubic-bezier(0.22, 0.85, 0.3, 1.35),
			box-shadow 0.2s ease;
	}

	.cta-violet {
		color: var(--color-mist-100);
		border: 2px solid var(--color-violet-400);
		background: color-mix(in oklab, var(--color-violet-400) 16%, transparent);
	}

	.cta-violet:hover {
		background: var(--color-violet-400);
		color: #050505;
		transform: translateY(-2px) scale(1.03);
		box-shadow:
			0 16px 34px -12px color-mix(in oklab, var(--color-violet-400) 65%, transparent),
			0 0 44px -8px color-mix(in oklab, var(--color-violet-400) 55%, transparent);
	}

	.cta-ghost {
		color: var(--color-mist-100);
		border: 2px solid color-mix(in oklab, var(--color-cyan-400) 55%, transparent);
		background: transparent;
	}

	.cta-ghost:hover {
		border-color: var(--color-cyan-400);
		background: color-mix(in oklab, var(--color-cyan-400) 14%, transparent);
		transform: translateY(-2px) scale(1.03);
	}
</style>
