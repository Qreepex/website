<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Ben Sc | Fullstack Developer & Event Lighting Technician</title>
	<meta
		name="description"
		content="Personal portfolio showcasing fullstack development, cloud-native engineering, AI work, and event lighting technology expertise."
	/>
</svelte:head>
{@render children()}
