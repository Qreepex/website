<script>
	import HeaderSection from '$lib/page/HeaderSection.svelte';
	import PageContent from '$lib/page/PageContent.svelte';

	const pageTitle = 'About Me | Fullstack Developer & Event Technician in Hamburg';
	const pageDescription =
		'Learn more about me: I am a Hamburg-based fullstack developer focused on cloud-native engineering and an event technician specialized in lighting and lasers.';
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
</svelte:head>

<HeaderSection title="About me" subtitle="Ill write more about me at some point, I promise!" />

<PageContent>
	<section>
		<h2 class="title-gradient text-2xl font-black tracking-[-0.02em] uppercase sm:text-3xl">
			Who am I?
		</h2>
		<p class="mt-4 leading-relaxed">
			I am a software engineer and event tech specialist based in Hamburg, Germany. With a passion
			for both coding and live event production, I have built a unique skill set that allows me to
			excel in both fields. I have experience working with a variety of programming languages and
			frameworks, as well as extensive knowledge of lighting, laser, sound and stage production for
			clubs, festivals and corporate events.
		</p>
	</section>
</PageContent>
