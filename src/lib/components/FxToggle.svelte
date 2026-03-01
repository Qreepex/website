<script lang="ts">
	import { fxDisabled } from '$lib/stores/reducedMotion';
</script>

<button
	onclick={() => fxDisabled.toggle()}
	aria-label={$fxDisabled ? 'Enable animations' : 'Disable animations'}
	title={$fxDisabled ? 'Enable animations' : 'Reduce motion & effects'}
	class="fx-toggle"
	class:fx-off={$fxDisabled}
>
	{#if $fxDisabled}
		<!-- Paused icon -->
		<svg
			width="12"
			height="12"
			viewBox="0 0 16 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
		>
			<rect x="2" y="2" width="4" height="12" rx="1" fill="currentColor" />
			<rect x="10" y="2" width="4" height="12" rx="1" fill="currentColor" />
		</svg>
		<span>FX off</span>
	{:else}
		<!-- Bolt icon -->
		<svg
			width="11"
			height="13"
			viewBox="0 0 11 16"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
		>
			<path
				d="M6.5 1L1 9h4.5L4 15l6.5-8H6L6.5 1z"
				fill="currentColor"
				stroke="currentColor"
				stroke-width="0.5"
				stroke-linejoin="round"
			/>
		</svg>
		<span>FX</span>
	{/if}
</button>

<style>
	.fx-toggle {
		display: flex;
		align-items: center;
		gap: 0.375rem;
		border-radius: 9999px;
		border: 1px solid rgba(219, 234, 254, 0.15);
		background: rgba(255, 255, 255, 0.04);
		padding: 0.375rem 0.75rem;
		font-size: 0.75rem;
		font-weight: 500;
		letter-spacing: 0.05em;
		color: rgba(219, 234, 254, 0.55);
		cursor: pointer;
		transition:
			color 300ms,
			border-color 300ms,
			background 300ms;
	}

	.fx-toggle:hover {
		color: #fff;
		border-color: rgba(96, 165, 250, 0.5);
		background: rgba(96, 165, 250, 0.08);
	}

	.fx-toggle.fx-off {
		color: rgba(219, 234, 254, 0.4);
		border-color: rgba(219, 234, 254, 0.1);
		background: transparent;
	}

	.fx-toggle.fx-off:hover {
		color: rgba(219, 234, 254, 0.75);
		border-color: rgba(219, 234, 254, 0.25);
	}
</style>
