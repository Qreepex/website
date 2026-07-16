<script lang="ts">
	let { children, background }: { children: any; background?: string } = $props();
</script>

<section
	class="min-h-120 bg-anthracite-800/70 px-6 pt-8 pb-16 sm:px-10 lg:px-16 lg:pt-10"
	style={background ? `background: ${background};` : undefined}
>
	<div class="w-full text-mist-100">
		<div class="space-y-12">
			{@render children()}
		</div>
	</div>
</section>
