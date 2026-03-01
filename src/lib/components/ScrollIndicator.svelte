<script lang="ts">
	import { onMount } from 'svelte';

	let hidden = $state(false);

	onMount(() => {
		const dismiss = () => {
			hidden = true;
		};

		const onScroll = () => {
			if (window.scrollY > 10) dismiss();
		};

		if (window.scrollY > 10) hidden = true;

		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('wheel', dismiss, { passive: true });
		window.addEventListener('touchmove', dismiss, { passive: true });
		window.addEventListener('keydown', dismiss);

		return () => {
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('wheel', dismiss);
			window.removeEventListener('touchmove', dismiss);
			window.removeEventListener('keydown', dismiss);
		};
	});
</script>

{#if !hidden}
	<div class="pointer-events-none fixed bottom-7 left-1/2 z-40 -translate-x-1/2 select-none">
		<div class="inline-flex flex-col items-center gap-1.5 text-mist-100/58">
			<span class="text-[11px] font-semibold tracking-[0.16em] uppercase">Scroll</span>
			<svg
				class="scroll-indicator__arrow h-3.5 w-3.5"
				viewBox="0 0 20 20"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
			>
				<path
					d="M5 7.5L10 12.5L15 7.5"
					stroke="currentColor"
					stroke-width="1.9"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</div>
	</div>
{/if}

<style>
	.scroll-indicator__arrow {
		display: inline-block;
		animation: bob 1.2s ease-in-out infinite;
	}

	@keyframes bob {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(3px);
		}
	}
</style>
