<script lang="ts">
	import { createRandomEventRigs } from '$lib/content';
	import EventRigsOverlay from '$lib/content/EventRigsOverlay.svelte';
	import EventShowcaseGallery from '$lib/content/EventShowcaseGallery.svelte';
	import EventAboutSection from '$lib/eventTech/EventAboutSection.svelte';
	import EventCtaSection from '$lib/eventTech/EventCtaSection.svelte';
	import EventHighlightsSection from '$lib/eventTech/EventHighlightsSection.svelte';
	import EventKnowledgeSection from '$lib/eventTech/EventKnowledgeSection.svelte';
	import EventToolsSection from '$lib/eventTech/EventToolsSection.svelte';
	import { initEventTechReveals } from '$lib/eventTech/reveal';
	import { fxDisabled } from '$lib/stores/reducedMotion';
	import gsap from 'gsap';
	import { ScrollTrigger } from 'gsap/ScrollTrigger';
	import { onMount } from 'svelte';

	gsap.registerPlugin(ScrollTrigger);

	const pageTitle =
		'Event Tech Hamburg | AV Technician, Lighting & Laser Safety Officer - Ben Schiemann';
	const pageDescription =
		'Event technician in Hamburg & Northern Germany: FOH sound on L-Acoustics, light design, Pangolin BEYOND laser shows and full production - concerts, clubs, festivals, corporate, Messen & Tagungen. Licensed Laser Safety Officer (OStrV, TROS, DGUV).';

	let sectionsEl: HTMLElement | null = null;
	let eventRigs = $state(createRandomEventRigs());

	onMount(() => {
		let cleanup: (() => void) | undefined;
		let heroTrigger: ScrollTrigger | null = null;

		const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches || $fxDisabled;

		if (!reduced) {
			// Subtle hero parallax: the oversized title drifts up + fades as you leave it
			heroTrigger = gsap.to('[data-event-hero-line]', {
				yPercent: -18,
				ease: 'none',
				scrollTrigger: {
					trigger: '[data-event-hero]',
					start: 'top top',
					end: 'bottom top',
					scrub: 0.4
				}
			}).scrollTrigger as ScrollTrigger;
		}

		void initEventTechReveals(sectionsEl).then((fn) => {
			cleanup = fn;
		});

		return () => {
			cleanup?.();
			heroTrigger?.kill();
		};
	});
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
	<link rel="canonical" href="https://schiemann.work/event-tech" />
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:type" content="website" />
	{@html `<script type="application/ld+json">${JSON.stringify({
		'@context': 'https://schema.org',
		'@type': 'Person',
		name: 'Ben Schiemann',
		url: 'https://schiemann.work/event-tech',
		jobTitle: 'Event Technician & Laser Safety Officer',
		description: pageDescription,
		knowsAbout: [
			'FOH Sound',
			'L-Acoustics',
			'Midas M32',
			'Yamaha DM3',
			'Yamaha DM7',
			'Light Design',
			'Resolume',
			'Pangolin BEYOND',
			'ArtNet',
			'Laser Shows',
			'Laser Safety Officer OStrV',
			'TROS',
			'DGUV',
			'Stage Design',
			'Set Design',
			'Show Networking',
			'Event Production'
		],
		address: { '@type': 'PostalAddress', addressLocality: 'Hamburg', addressCountry: 'DE' },
		areaServed: 'Northern Germany'
	})}</script>`}
</svelte:head>

<section
	data-event-hero
	class="event-hero relative flex min-h-svh flex-col justify-center overflow-hidden px-6 sm:px-10 lg:px-16"
>
	<EventRigsOverlay rigs={eventRigs} />
	<div class="event-hero-scrim pointer-events-none absolute inset-0 z-[2]" aria-hidden="true"></div>

	<div class="relative z-10 w-full">
		<p data-hero-eyebrow class="text-xs font-semibold tracking-[0.28em] text-violet-300 uppercase">
			Ben Schiemann · Hamburg
		</p>

		<h1 class="mt-4 leading-[0.86] font-black tracking-[-0.05em] uppercase">
			<span data-event-hero-line class="title-gradient-vivid block text-[clamp(4rem,15vw,12.5rem)]">
				Event Tech
			</span>
			<span
				class="mt-3 block text-lg font-bold tracking-[0.22em] text-mist-100/75 sm:text-2xl lg:text-3xl"
			>
				AV · FOH · Light · Laser Safety
			</span>
		</h1>

		<p class="mt-8 max-w-2xl text-base leading-relaxed font-semibold text-mist-100/88 sm:text-lg">
			Sound, light and laser for Hamburg's clubs, stages and waterways - from Große Freiheit 36 and
			Docks to Schlagermove and the Hafengeburtstag. Built on L-Acoustics and grandMA, with a hard
			stop at safe lasers.
		</p>

		<div class="mt-10 flex flex-wrap gap-3 text-sm font-black">
			<a href="#event-about" class="hero-cta hero-cta-violet">
				About me
				<span aria-hidden="true">↓</span>
			</a>
			<a href="/reach-me" class="hero-cta hero-cta-electric">Book me</a>
		</div>
	</div>
</section>

<div bind:this={sectionsEl}>
	<EventAboutSection />
	<EventKnowledgeSection />
	<EventToolsSection />
	<EventHighlightsSection />
	<EventCtaSection />
</div>

<section class="section-dark-a relative px-6 py-24 sm:px-10 lg:px-16">
	<div class="mx-auto w-full">
		<p class="text-xs font-semibold tracking-[0.2em] text-violet-300 uppercase">Gallery</p>
		<h2
			class="title-gradient mt-3 text-4xl font-black tracking-[-0.04em] uppercase italic sm:text-5xl"
		>
			Impressions of what I work on
		</h2>

		<div class="mt-10">
			<EventShowcaseGallery />
		</div>
	</div>
</section>

<style>
	.event-hero {
		background:
			radial-gradient(
				60% 50% at 15% 0%,
				color-mix(in oklab, var(--color-electric-500) 14%, transparent),
				transparent
			),
			radial-gradient(
				55% 45% at 100% 15%,
				color-mix(in oklab, var(--color-violet-500) 14%, transparent),
				transparent
			),
			#020203;
	}

	.event-hero-scrim {
		background: linear-gradient(
			180deg,
			transparent 0%,
			transparent 55%,
			color-mix(in oklab, #020203 65%, transparent) 100%
		);
	}

	.hero-cta {
		position: relative;
		display: inline-flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.75rem 1.4rem;
		text-transform: uppercase;
		letter-spacing: 0.02em;
		color: var(--color-mist-100);
		border: 2px solid var(--accent);
		background: color-mix(in oklab, var(--accent) 16%, transparent);
		clip-path: polygon(5% 0, 100% 0, 95% 100%, 0 100%);
		transition:
			background-color 0.2s ease,
			color 0.2s ease,
			transform 0.2s cubic-bezier(0.22, 0.85, 0.3, 1.35),
			box-shadow 0.2s ease;
	}

	.hero-cta:hover {
		background: var(--accent);
		color: #050505;
		transform: translateY(-2px) scale(1.03);
		box-shadow:
			0 16px 34px -12px color-mix(in oklab, var(--accent) 65%, transparent),
			0 0 44px -8px color-mix(in oklab, var(--accent) 55%, transparent);
	}

	.hero-cta-violet {
		--accent: var(--color-violet-400);
	}

	.hero-cta-electric {
		--accent: var(--color-electric-400);
	}
</style>
