<script lang="ts">
	import { onMount } from 'svelte';
	import FxToggle from '$lib/components/FxToggle.svelte';
	import { page } from '$app/state';

	type NavLink = {
		label: string;
		href: string;
	};

	let brand = 'Ben',
		links = [
			{ label: 'About', href: '/ben' },
			{ label: 'Dev Projects', href: '/#dev' },
			{ label: 'Event Tech', href: '/event-tech' },
			{ label: 'Contact', href: '/reach-me' },
			{ label: 'Links', href: '/links' }
		] as NavLink[];

	let scrolled = $state(false);
	let pastHero = $state(false);
	let isHomePage = $state(true);

	function handleScroll() {
		scrolled = window.scrollY > 10;
		if (!isHomePage) {
			pastHero = true;
			return;
		}

		// Hero is min-h-screen + 2800px pin; past that = past video
		pastHero = window.scrollY > window.innerHeight + 1000;
	}

	onMount(() => {
		isHomePage = page.url.pathname === '/';
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
	<!-- Ben left · spacer · Links right · FX pinned far right -->
	<div class="nav-inner relative flex w-full items-center py-3">
		<a
			href="/"
			class="brand-label text-sm font-bold tracking-[0.18em] uppercase transition-all duration-500"
			class:brand-condensed={pastHero}
			class:brand-scrolled={pastHero}
		>
			{brand}
		</a>

		<div class="flex-1"></div>

		<nav
			aria-label="Primary"
			class="links-group transition-all duration-500"
			class:links-condensed={pastHero}
		>
			<ul class="flex items-center gap-5 sm:gap-6">
				{#each links as link}
					<li>
						<a
							href={link.href}
							class="nav-link text-sm tracking-wide transition-colors duration-300"
							class:nav-link-bright={pastHero}
						>
							{link.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		<div class="fx-gap transition-all duration-500" class:fx-gap-condensed={pastHero}></div>
		<FxToggle />
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

	.nav-inner {
		padding-left: 1.5rem;
		padding-right: 1.5rem;
	}
	@media (min-width: 640px) {
		.nav-inner {
			padding-left: 2.5rem;
			padding-right: 2.5rem;
		}
	}
	@media (min-width: 1024px) {
		.nav-inner {
			padding-left: 4rem;
			padding-right: 4rem;
		}
	}

	/* Ben: default at left edge, slides inward a bit after hero */
	.brand-condensed {
		margin-left: 10vw;
	}

	/* Links group: default at right edge (against FX gap), slides inward after hero */
	.links-group {
		margin-right: 0;
	}
	.links-condensed {
		margin-right: 10vw;
	}

	/* Gap between links and FX toggle — fixed, not animated */
	.fx-gap {
		width: 1.25rem;
		flex-shrink: 0;
	}

	/* FX toggle styles live in FxToggle.svelte */
</style>
