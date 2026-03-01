<script lang="ts">
	let { children } = $props();
</script>

<section class="min-h-120 bg-anthracite-800/70 px-6 pt-8 pb-16 sm:px-10 lg:px-16 lg:pt-10">
	<div class="w-full text-mist-100">
		<div class="space-y-12">
			{@render children()}
		</div>
	</div>
</section>
