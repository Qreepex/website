<script lang="ts">
	let { title, subtitle }: { title: string; subtitle?: string } = $props();
</script>

<section
	class="relative overflow-hidden bg-anthracite-900 px-6 pt-16 pb-12 sm:px-10 sm:pt-18 lg:px-16 lg:pt-20"
>
	<div class="relative z-10 w-full">
		<h1
			class="text-5xl font-black tracking-[-0.04em] text-mist-100 uppercase sm:text-6xl lg:text-7xl xl:text-8xl"
		>
			{title}
		</h1>
		{#if subtitle}
			{#each subtitle.split('\n') as line}
				<p class="mt-6 text-base leading-relaxed font-medium text-mist-100 sm:text-lg">{line}</p>
			{/each}
		{/if}
	</div>
</section>
