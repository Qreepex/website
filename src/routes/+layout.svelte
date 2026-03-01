<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import './layout.css';
	import Footer from '$lib/page/Footer.svelte';
	import Navbar from '$lib/page/Navbar.svelte';

	let { children } = $props();
	const isLoading = writable(true);

	function waitForNonVideoAssets() {
		const imagePromises = Array.from(document.images)
			.filter((image) => !image.closest('video'))
			.filter((image) => image.loading !== 'lazy')
			.map((image) => {
				if (image.complete) return Promise.resolve();

				return new Promise<void>((resolve) => {
					image.addEventListener('load', () => resolve(), { once: true });
					image.addEventListener('error', () => resolve(), { once: true });
				});
			});

		const stylesheetPromises = Array.from(
			document.querySelectorAll<HTMLLinkElement>('link[rel="stylesheet"]')
		).map((sheet) => {
			if (sheet.sheet) return Promise.resolve();

			return new Promise<void>((resolve) => {
				sheet.addEventListener('load', () => resolve(), { once: true });
				sheet.addEventListener('error', () => resolve(), { once: true });
			});
		});

		const fontsReady = document.fonts?.ready ?? Promise.resolve();

		return Promise.all([fontsReady, ...imagePromises, ...stylesheetPromises]);
	}

	function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T | undefined> {
		let timeoutHandle: ReturnType<typeof setTimeout> | null = null;

		const timeoutPromise = new Promise<undefined>((resolve) => {
			timeoutHandle = setTimeout(() => resolve(undefined), timeoutMs);
		});

		return Promise.race([promise, timeoutPromise]).finally(() => {
			if (timeoutHandle) clearTimeout(timeoutHandle);
		});
	}

	onMount(() => {
		document.body.classList.add('is-loading');

		withTimeout(waitForNonVideoAssets(), 5000).finally(() => {
			isLoading.set(false);
			window.dispatchEvent(new CustomEvent('app:ready'));
			document.body.classList.remove('is-loading');
		});

		return () => {
			document.body.classList.remove('is-loading');
		};
	});
</script>

<Navbar />

{#if $isLoading}
	<div class="loading-screen" role="status" aria-live="polite" aria-label="Page loading">
		<div class="loading-screen__content">
			<div class="loading-screen__spinner" aria-hidden="true"></div>
			<p class="loading-screen__label">Loading</p>
		</div>
	</div>
{/if}

{@render children()}

<Footer />
