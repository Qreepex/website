<script lang="ts">
	let {
		activeMode,
		onSwitch
	}: {
		activeMode: 'dev' | 'event';
		onSwitch: (mode: 'dev' | 'event') => void;
	} = $props();

	const devToggleClass = $derived(
		activeMode === 'dev'
			? 'rounded-lg px-4 py-2 transition-colors bg-electric-500/45 text-mist-100 cursor-pointer'
			: 'rounded-lg px-4 py-2 transition-colors text-mist-100/78 hover:bg-electric-500/20 cursor-pointer'
	);

	const eventToggleClass = $derived(
		activeMode === 'event'
			? 'rounded-lg px-4 py-2 transition-colors bg-violet-500/45 text-mist-100 cursor-pointer'
			: 'rounded-lg px-4 py-2 transition-colors text-mist-100/78 hover:bg-violet-500/20 cursor-pointer'
	);
</script>

<div class="relative z-10 ml-auto rounded-xl border border-mist-100/25 bg-anthracite-900/70 p-1.5">
	<div class="flex cursor-pointer items-center gap-1 text-xs font-bold tracking-wide uppercase">
		<button type="button" class={devToggleClass} onclick={() => onSwitch('dev')}> Dev </button>
		<button type="button" class={eventToggleClass} onclick={() => onSwitch('event')}>
			Event Tech
		</button>
	</div>
</div>
