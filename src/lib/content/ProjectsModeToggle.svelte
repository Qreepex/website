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
			? 'toggle-btn toggle-btn-active-electric px-4 py-2 cursor-pointer'
			: 'toggle-btn px-4 py-2 cursor-pointer'
	);

	const eventToggleClass = $derived(
		activeMode === 'event'
			? 'toggle-btn toggle-btn-active-violet px-4 py-2 cursor-pointer'
			: 'toggle-btn px-4 py-2 cursor-pointer'
	);
</script>

<div class="relative z-10 ml-auto border border-mist-100/25 bg-anthracite-900/70 p-1.5">
	<div class="flex cursor-pointer items-center gap-1 text-xs font-black tracking-wide uppercase">
		<button type="button" class={devToggleClass} onclick={() => onSwitch('dev')}> Dev </button>
		<button type="button" class={eventToggleClass} onclick={() => onSwitch('event')}>
			Event Tech
		</button>
	</div>
</div>

<style>
	.toggle-btn {
		color: color-mix(in oklab, white 78%, transparent);
		transition:
			background-color 0.15s ease,
			color 0.15s ease;
	}

	.toggle-btn:hover {
		background: color-mix(in oklab, white 12%, transparent);
	}

	.toggle-btn-active-electric {
		background: var(--color-electric-500);
		color: #050505;
	}

	.toggle-btn-active-electric:hover {
		background: var(--color-electric-500);
	}

	.toggle-btn-active-violet {
		background: var(--color-violet-500);
		color: #050505;
	}

	.toggle-btn-active-violet:hover {
		background: var(--color-violet-500);
	}
</style>
