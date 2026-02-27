<script lang="ts">
	import { eventShowcaseImages, eventTechOverview } from '$lib/content';
</script>

<div class="relative z-10">
	<div class="max-w-5xl space-y-4">
		{#each eventTechOverview as sentence}
			<p class="text-base leading-relaxed font-medium text-mist-100 sm:text-lg">{sentence}</p>
		{/each}
	</div>

	<div class="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
		{#each eventShowcaseImages.slice(0, 12) as image, index}
			<figure
				class="group relative aspect-4/3 overflow-hidden rounded-xl border border-mist-100/20 bg-anthracite-800/80"
			>
				<img
					src={image.src}
					alt={image.alt}
					class="h-full w-full object-cover"
					loading={index < 4 ? 'eager' : 'lazy'}
				/>
				{#if image.credit}
					<div
						class="pointer-events-none absolute inset-x-0 bottom-0 bg-anthracite-900/88 px-3 py-2 text-xs font-semibold text-mist-100 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
					>
						{#if image.creditUrl}
							<a
								href={image.creditUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="pointer-events-auto underline decoration-mist-100/60 underline-offset-2 hover:decoration-mist-100"
							>
								&copy; {image.credit}
							</a>
						{:else}
							<span>{image.credit}</span>
						{/if}
					</div>
				{/if}
			</figure>
		{/each}
	</div>
</div>
