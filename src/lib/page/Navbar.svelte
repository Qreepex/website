<script lang="ts">
	import { onMount } from 'svelte';
	import FxToggle from '$lib/components/FxToggle.svelte';

	type NavLink = {
		label: string;
		href: string;
	};

	let {
		brand = 'Ben',
		links = [] as NavLink[]
	} = $props();

	let scrolled = $state(false);
	let pastHero = $state(false);

	function handleScroll() {
		scrolled = window.scrollY > 10;
		// Hero is min-h-screen + 2800px pin; past that = past video
		pastHero = window.scrollY > window.innerHeight + 2600;
	}

	onMount(() => {
		handleScroll();
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<header
	class="navbar-shell fixed top-0 right-0 left-0 z-50"
	class:is-scrolled={scrolled}
	class:past-hero={pastHero}
>
	<!-- Inner bar: full-width by default, condenses to a pill when past hero -->
	<div
		class="nav-inner relative flex w-full items-center px-5 py-3 sm:px-8 lg:px-12 transition-all duration-500"
		class:nav-condensed={pastHero}
	>
		<!-- Brand: far left -->
		<a
			href="#"
			class="brand-label text-sm font-bold tracking-[0.18em] uppercase transition-all duration-500"
			class:brand-scrolled={pastHero}
		>
			{brand}
		</a>

		<!-- Spacer: full-width unless condensed -->
		<div class="nav-spacer flex-1 transition-all duration-500"></div>

		<!-- Nav links + toggle: immediately right of brand when condensed -->
		<div class="flex items-center">
			<nav aria-label="Primary">
				<ul class="flex items-center gap-5 sm:gap-6">
					{#each links as link}
						<li>
							<a
								href={link.href}
								class="nav-link text-sm tracking-wide transition-all duration-300"
								class:nav-link-bright={pastHero}
							>
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</nav>

			<!-- FX toggle: right next to the links -->
			<span class="ml-5">
				<FxToggle />
			</span>
		</div>
	</div>
</header>

<style>
	.navbar-shell {
		isolation: isolate;
	}

	.navbar-shell::before {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: -5rem;
		z-index: -1;
		background: transparent;
		backdrop-filter: none;
		-webkit-backdrop-filter: none;
		-webkit-mask-image: linear-gradient(
			to bottom,
			black 0%,
			black 30%,
			rgba(0, 0, 0, 0.95) 40%,
			rgba(0, 0, 0, 0.8) 50%,
			rgba(0, 0, 0, 0.55) 60%,
			rgba(0, 0, 0, 0.3) 70%,
			rgba(0, 0, 0, 0.1) 82%,
			transparent 100%
		);
		mask-image: linear-gradient(
			to bottom,
			black 0%,
			black 30%,
			rgba(0, 0, 0, 0.95) 40%,
			rgba(0, 0, 0, 0.8) 50%,
			rgba(0, 0, 0, 0.55) 60%,
			rgba(0, 0, 0, 0.3) 70%,
			rgba(0, 0, 0, 0.1) 82%,
			transparent 100%
		);
		transition:
			background 300ms,
			backdrop-filter 300ms,
			-webkit-backdrop-filter 300ms;
	}

	.navbar-shell.is-scrolled::before {
		background: rgba(10, 14, 20, 0.72);
		backdrop-filter: blur(28px) saturate(150%);
		-webkit-backdrop-filter: blur(28px) saturate(150%);
	}

	/* Brand */
	.brand-label {
		color: rgba(219, 234, 254, 0.55); /* mist-100/55 */
	}
	.brand-label:hover {
		color: #60a5fa; /* electric-400 */
	}
	.brand-scrolled {
		color: #e0f0ff;
	}

	/* Nav links */
	.nav-link {
		color: rgba(219, 234, 254, 0.6);
	}
	.nav-link:hover {
		color: #fff;
	}
	.nav-link-bright {
		color: rgba(219, 234, 254, 0.9);
	}
	.nav-link-bright:hover {
		color: #fff;
	}

	/* Condensed bar: when past hero, constrain width + center, collapse spacer */
	.nav-condensed {
		max-width: 52rem;
		margin-left: auto;
		margin-right: auto;
		padding-left: 1.25rem;
		padding-right: 1.25rem;
	}
	/* Spacer collapses when condensed, pulling links toward the brand */
	.nav-condensed .nav-spacer {
		flex: 0 0 1.75rem;
	}

	/* FX toggle styles live in FxToggle.svelte */
</style>
