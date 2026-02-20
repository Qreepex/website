<script lang="ts">
	import { onMount } from 'svelte';

	type NavLink = {
		label: string;
		href: string;
	};

	let {
		brand = 'Ben Sc',
		links = [
			{ label: 'About', href: '#about' },
			{ label: 'Skills', href: '#skills' },
			{ label: 'Projects', href: '#projects' }
		] as NavLink[]
	} = $props();

	let scrolled = $state(false);

	const handleScroll = () => {
		scrolled = window.scrollY > 10;
	};



	onMount(() => {
		handleScroll();
		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<header
	class="navbar-shell fixed top-0 right-0 left-0 z-50"
	class:is-scrolled={scrolled}
>
	<div class="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 sm:px-10 lg:px-16">
		<a href="#" class="text-sm font-semibold tracking-[0.2em] text-electric-300 uppercase">{brand}</a>

		<nav aria-label="Primary">
			<ul class="flex items-center gap-4 sm:gap-6">
				{#each links as link}
					<li>
						<a href={link.href} class="text-sm text-mist-100/90 transition hover:text-electric-300">{link.label}</a>
					</li>
				{/each}
			</ul>
		</nav>
	</div>
</header>

<style>
	.navbar-shell {
		isolation: isolate;
	}

	/*
		::before carries ALL visual chrome (tint + blur).
		Extend it well below the header so the mask has room for a long, soft fade.
		Eased multi-stop gradient avoids any perceptible cutoff line.
	*/
	.navbar-shell::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		/* Extend 5rem below the header bottom */
		bottom: -5rem;
		z-index: -1;
		background: transparent;
		backdrop-filter: none;
		-webkit-backdrop-filter: none;
		/* Ease-out approximation: fully opaque at top, gradual S-curve fade */
		-webkit-mask-image: linear-gradient(
			to bottom,
			black 0%,
			black 30%,
			rgba(0,0,0,0.95) 40%,
			rgba(0,0,0,0.8) 50%,
			rgba(0,0,0,0.55) 60%,
			rgba(0,0,0,0.3) 70%,
			rgba(0,0,0,0.1) 82%,
			transparent 100%
		);
		mask-image: linear-gradient(
			to bottom,
			black 0%,
			black 30%,
			rgba(0,0,0,0.95) 40%,
			rgba(0,0,0,0.8) 50%,
			rgba(0,0,0,0.55) 60%,
			rgba(0,0,0,0.3) 70%,
			rgba(0,0,0,0.1) 82%,
			transparent 100%
		);
		transition:
			background 300ms,
			backdrop-filter 300ms,
			-webkit-backdrop-filter 300ms;
	}

	.navbar-shell.is-scrolled::before {
		background: rgba(10, 14, 20, 0.62);
		backdrop-filter: blur(28px) saturate(150%);
		-webkit-backdrop-filter: blur(28px) saturate(150%);
	}
</style>