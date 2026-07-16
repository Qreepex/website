<script lang="ts">
	import EventShowcaseGallery from '$lib/content/EventShowcaseGallery.svelte';
	import HeaderSection from '$lib/page/HeaderSection.svelte';
	import PageContent from '$lib/page/PageContent.svelte';

	const pageTitle = 'My Event Tech | Lighting and Laser Technician';
	const pageDescription =
		'This is my event technology showcase including lighting programming, laser-supported live productions, show networking and stage systems.';
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
</svelte:head>

<HeaderSection
	title="Event Tech"
	subtitle="I build and operate live lighting and laser shows for clubs, festivals and corporate events.
		My workflow is centered around grandMA2 / grandMA3 and Pangolin BEYOND plus integrating LED walls, sound systems and beautiful stages into one reliable setup.
		I also handle FOH and sound setup tasks with L-Acoustics speakers and mixing desks, from prep	to final show operation."
	background="radial-gradient(60% 50% at 15% 0%, color-mix(in oklab, var(--color-electric-500) 14%, transparent), transparent),
		radial-gradient(55% 45% at 100% 15%, color-mix(in oklab, var(--color-violet-500) 14%, transparent), transparent),
		#020203"
/>

<PageContent background="#020203">
	<h2 class="title-gradient text-4xl font-black tracking-[-0.04em] uppercase italic sm:text-5xl">
		Impressions of what I work on
	</h2>

	<div class="mt-10">
		<EventShowcaseGallery />
	</div>
</PageContent>
