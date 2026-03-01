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
			{ label: 'Home', href: '/' },
			{ label: 'About', href: '/ben' },
			{ label: 'Dev Projects', href: '/#dev' },
			{ label: 'Event Tech', href: '/event-tech' },
			{ label: 'Contact', href: '/reach-me' },
			{ label: 'Links', href: '/links' }
		] as NavLink[];

	let scrolled = $state(false);
	let pastHero = $state(false);
	let isHomePage = $state(true);
	let mobileMenuOpen = $state(false);

	function handleScroll() {
		scrolled = window.scrollY > 10;
		if (!isHomePage) {
			pastHero = true;
			return;
		}

		// Hero is min-h-screen + 2800px pin; past that = past video
		pastHero = window.scrollY > window.innerHeight + 1000;
	}

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMobileMenu() {
		mobileMenuOpen = false;
	}

	onMount(() => {
		isHomePage = page.url.pathname === '/';
		handleScroll();

		function handleResize() {
			if (window.innerWidth >= 640) closeMobileMenu();
		}

		window.addEventListener('scroll', handleScroll, { passive: true });
		window.addEventListener('resize', handleResize, { passive: true });
		return () => {
			window.removeEventListener('scroll', handleScroll);
			window.removeEventListener('resize', handleResize);
		};
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
			class="links-group hidden transition-all duration-500 sm:block"
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

		<button
			type="button"
			class="burger-button mr-3 flex h-9 w-9 items-center justify-center sm:hidden"
			onclick={toggleMobileMenu}
			aria-label="Toggle navigation menu"
			aria-expanded={mobileMenuOpen}
			aria-controls="mobile-nav"
		>
			<span class="burger-lines" class:is-open={mobileMenuOpen}>
				<span class="burger-line line-1"></span>
				<span class="burger-line line-2"></span>
				<span class="burger-line line-3"></span>
			</span>
		</button>

		<div
			class="fx-gap hidden transition-all duration-500 sm:block"
			class:fx-gap-condensed={pastHero}
		></div>
		<FxToggle />
	</div>

	{#if mobileMenuOpen}
		<nav id="mobile-nav" aria-label="Mobile primary" class="mobile-menu sm:hidden">
			<ul class="flex flex-col gap-1 py-2">
				{#each links as link}
					<li>
						<a
							href={link.href}
							class="mobile-link block px-3 py-2 text-sm tracking-wide"
							onclick={closeMobileMenu}
						>
							{link.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>
	{/if}
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

	.burger-button {
		color: rgba(219, 234, 254, 0.86);
	}

	.burger-lines {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.burger-line {
		display: block;
		width: 1rem;
		height: 2px;
		border-radius: 9999px;
		background: currentColor;
		transition:
			transform 220ms ease,
			opacity 220ms ease;
	}

	.burger-lines.is-open .line-1 {
		transform: translateY(6px) rotate(45deg);
	}

	.burger-lines.is-open .line-2 {
		opacity: 0;
	}

	.burger-lines.is-open .line-3 {
		transform: translateY(-6px) rotate(-45deg);
	}

	.mobile-menu {
		margin: 0.25rem 1rem 0;
		border: 1px solid rgba(219, 234, 254, 0.14);
		border-radius: 0.75rem;
		background: rgba(10, 14, 20, 0.86);
		backdrop-filter: blur(24px) saturate(140%);
		-webkit-backdrop-filter: blur(24px) saturate(140%);
	}

	.mobile-link {
		color: rgba(219, 234, 254, 0.9);
	}

	.mobile-link:hover {
		color: #fff;
	}

	/* FX toggle styles live in FxToggle.svelte */
</style>
