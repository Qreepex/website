<script lang="ts">
	let {
		overview,
		images
	}: {
		overview: string[];
		images: { src: string; alt: string }[];
	} = $props();
</script>

<div class="relative z-10">
	<div class="max-w-5xl space-y-4">
		{#each overview as sentence}
			<p class="text-base leading-relaxed font-medium text-mist-100 sm:text-lg">{sentence}</p>
		{/each}
	</div>

	<div class="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
		{#each images.slice(0, 12) as image, index}
			<figure
				class="aspect-[4/3] overflow-hidden rounded-xl border border-mist-100/20 bg-anthracite-800/80"
			>
				<img
					src={image.src}
					alt={image.alt}
					class="h-full w-full object-cover"
					loading={index < 4 ? 'eager' : 'lazy'}
				/>
			</figure>
		{/each}
	</div>
</div>
