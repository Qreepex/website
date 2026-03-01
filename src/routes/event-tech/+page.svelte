<script lang="ts">
	import EventShowcaseGallery from '$lib/content/EventShowcaseGallery.svelte';
	import HeaderSection from '$lib/page/HeaderSection.svelte';
	import PageContent from '$lib/page/PageContent.svelte';

	const pageTitle = 'My Event Tech in Hamburg | Lighting and Laser Technician';
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
		My workflow is centered around grandMA2 / grandMA3, Art-Net based networking and show	control, plus integrating lasers, LED walls and stage systems into one reliable setup.
		I also handle FOH and sound setup tasks with L-Acoustics speakers and live desks, from prep	to final show operation."
/>

<PageContent>
	<h2 class="title-gradient text-3xl font-black tracking-[-0.03em] uppercase sm:text-4xl">
		Impressions of what I do
	</h2>

	<div class="mt-8">
		<EventShowcaseGallery />
	</div>
</PageContent>
