<script>
	import HighlightCard from '$lib/components/HighlightCard.svelte';
	import HeaderSection from '$lib/page/HeaderSection.svelte';
	import PageContent from '$lib/page/PageContent.svelte';
</script>

<svelte:head>
	<title>Reach Me | Ben</title>
</svelte:head>

<HeaderSection title="Reach Me" subtitle="Interested in my work? Need help with a project?" />

<PageContent>
	<section>
		<h2 class="title-gradient text-2xl font-black tracking-[-0.02em] uppercase sm:text-3xl">
			Let's Connect
		</h2>
		<p class="mt-4 leading-relaxed">
			I'm always open to new opportunities, collaborations and conversations. Whether you have a
			project in mind, want to chat about tech, or just want to say hi, feel free to reach out!
		</p>
		<p class="mt-4 leading-relaxed">
			I am also available spontaneously for freelance work for either development projects or event
			productions.
		</p>
	</section>

	<section class="mt-12">
		<h2 class="title-gradient text-2xl font-black tracking-[-0.02em] uppercase sm:text-3xl">
			Looking for Event Tech Support?
		</h2>
		<p class="mt-4 leading-relaxed">
			If you're in need of support for your live event production, I also offer freelance services
			in the field of event technology. With extensive experience in lighting, laser, sound and
			stage production, I can help ensure your event runs smoothly and leaves a lasting impression.
			Whether it's a club night, festival or corporate event, I'm here to provide expert support and
			bring your vision to life. Feel free to reach out to discuss how I can assist with your
			upcoming event!
		</p>
	</section>

	<section class="mt-12">
		<h2 class="title-gradient text-2xl font-black tracking-[-0.02em] uppercase sm:text-3xl">
			Contact Information
		</h2>
		<div class="mt-5 grid gap-4 sm:grid-cols-2">
			<HighlightCard
				url="mailto:ben@schiemann.work"
				label="Email"
				description="ben@schiemann.work"
				icon="/media/icons/email.svg"
			/>
			<HighlightCard
				url="https://wa.me/004915164877269"
				label="Whatsapp"
				description="+49 1516 4877269"
				icon="/media/icons/Digital_Glyph_Green.svg"
			/>
			<HighlightCard
				url="https://linkedin.com/in/ben-schiemann/"
				label="LinkedIn"
				description="linkedin.com/in/ben-schiemann"
				icon="/media/icons/LI-In-Bug.png"
			/>
			<HighlightCard
				url="https://instagram.com/_bms.05/"
				label="Instagram"
				icon="/media/icons/Instagram_Glyph_Gradient.svg"
				description="instagram.com/_bms.05"
			/>
		</div>
	</section>
</PageContent>
