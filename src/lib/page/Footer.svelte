<script lang="ts">
	type FooterLink = {
		label: string;
		href: string;
		external?: boolean;
	};

	let profileLinks = [
			{ label: 'GitHub', href: 'https://qrpx.link/gh', external: true },
			{ label: 'LinkedIn', href: 'https://qrpx.link/in', external: true },
			{ label: 'Instagram', href: 'https://qrpx.link/ig', external: true }
		] as FooterLink[],
		legalLinks = [
			{ label: 'Impressum', href: '/impressum' },
			{ label: 'Privacy', href: '/privacy' },
			{ label: 'Contact', href: '/reach-me' }
		] as FooterLink[];

	const year = new Date().getFullYear();
</script>

<footer
	class="section-dark-a relative overflow-hidden border-t border-electric-400/25 px-6 py-18 sm:px-10 lg:px-16"
>
	<div class="mx-auto grid w-full max-w-7xl gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
		<div>
			<p class="text-xs font-semibold tracking-[0.2em] text-electric-400 uppercase">Ben</p>
			<p class="mt-4 max-w-lg text-base leading-relaxed text-mist-100/84">
				Fullstack development meets event technology. Available for ambitious digital and live
				production projects.
			</p>
		</div>

		<nav aria-label="Profiles">
			<p class="text-xs tracking-[0.18em] text-violet-300 uppercase">Profiles</p>
			<ul class="mt-4 space-y-2.5">
				{#each profileLinks as link}
					<li>
						<a
							href={link.href}
							target={link.external ? '_blank' : undefined}
							rel={link.external ? 'noreferrer' : undefined}
							class="hover:text-electric-300 text-mist-100/84 transition"
						>
							{link.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		<nav aria-label="Legal">
			<p class="text-xs tracking-[0.18em] text-violet-300 uppercase">Legal & Info</p>
			<ul class="mt-4 space-y-2.5">
				{#each legalLinks as link}
					<li>
						<a href={link.href} class="hover:text-electric-300 text-mist-100/84 transition"
							>{link.label}</a
						>
					</li>
				{/each}
			</ul>
		</nav>
	</div>

	<div
		class="mx-auto mt-12 w-full max-w-7xl border-t border-violet-400/20 pt-5 text-sm text-mist-100/65"
	>
		© {year}
		Ben. All rights reserved.
	</div>
</footer>
