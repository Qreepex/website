<script lang="ts">
	import EventShowcaseGallery from '$lib/content/EventShowcaseGallery.svelte';
</script>

<svelte:head>
	<title>Event Tech | Ben</title>
	<meta
		name="description"
		content="Event tech showcase with lighting, laser, sound and stage production media from real shows."
	/>
</svelte:head>

<section
	class="relative overflow-hidden bg-anthracite-900 px-6 pt-16 pb-12 sm:px-10 sm:pt-18 lg:px-16 lg:pt-20"
>
	<div class="grid-overlay pointer-events-none absolute inset-0 z-0 opacity-18"></div>
	<div class="relative z-10 w-full">
		<h1
			class="text-5xl font-black tracking-[-0.04em] text-mist-100 uppercase sm:text-6xl lg:text-7xl xl:text-8xl"
		>
			Event Tech
		</h1>

		<div class="mt-6 space-y-4 text-base leading-relaxed font-medium text-mist-100 sm:text-lg">
			<p>
				I build and operate live lighting and laser shows for clubs, festivals and corporate events.
			</p>
			<p>
				My workflow is centered around grandMA2 / grandMA3, Art-Net based networking and show
				control, plus integrating lasers, LED walls and stage systems into one reliable setup.
			</p>
			<p>
				I also handle FOH and sound setup tasks with L-Acoustics speakers and live
				desks, from prep to final show operation.
			</p>
		</div>
	</div>
</section>

<section class="min-h-screen bg-anthracite-800/70 px-6 pt-8 pb-16 sm:px-10 lg:px-16 lg:pt-10">
	<div class="w-full">
		<h2 class="title-gradient text-3xl font-black tracking-[-0.03em] uppercase sm:text-4xl">
			Full Media Gallery
		</h2>

		<div class="mt-8">
			<EventShowcaseGallery />
		</div>
	</div>
</section>
