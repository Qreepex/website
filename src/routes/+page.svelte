<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import Footer from '$lib/page/Footer.svelte';
	import Navbar from '$lib/page/Navbar.svelte';

	const skillGroups = [
		{
			title: 'Fullstack & Platform',
			items: ['Cloud Native', 'AI Integration', 'Rust', 'Go', 'TypeScript', 'Java']
		},
		{
			title: 'Event Technology',
			items: ['grandMA2', 'grandMA3', 'L-Acoustics', 'Show Networking', 'Lighting Design', 'Live Systems']
		}
	];

	const projects = [
		{
			title: 'Aurora Control Mesh',
			domain: 'Cloud + Event Ops',
			description:
				'Placeholder project for a distributed control plane connecting venue hardware telemetry with real-time cloud dashboards.',
			tech: ['Go', 'Kubernetes', 'NATS', 'TypeScript']
		},
		{
			title: 'Lumen AI Programmer',
			domain: 'Lighting + AI',
			description:
				'Placeholder concept for AI-assisted fixture programming that proposes cues and transitions for live shows.',
			tech: ['Rust', 'Python', 'WebAssembly', 'grandMA3']
		},
		{
			title: 'StagePulse Runtime',
			domain: 'Realtime Systems',
			description:
				'Placeholder runtime orchestrating video, audio and lighting trigger timelines with millisecond precision.',
			tech: ['Java', 'gRPC', 'Redis', 'L-Acoustics']
		}
	];

	const profileLinks = [
		{ label: 'GitHub', href: 'https://github.com/', external: true },
		{ label: 'LinkedIn', href: 'https://linkedin.com/', external: true },
		{ label: 'X / Twitter', href: 'https://x.com/', external: true }
	];

	const legalLinks = [
		{ label: 'Impressum', href: '/impressum' },
		{ label: 'Datenschutz', href: '/privacy' },
		{ label: 'Kontakt', href: '/contact' }
	];

	const navLinks = [
		{ label: 'About', href: '#about' },
		{ label: 'Skills', href: '#skills' },
		{ label: 'Projects', href: '#projects' },
		{ label: 'Contact', href: '#footer' }
	];

	onMount(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			return;
		}

		gsap.fromTo(
			'[data-hero-title]',
			{ y: 36, opacity: 0 },
			{ y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
		);
		gsap.fromTo(
			'[data-hero-copy]',
			{ y: 28, opacity: 0 },
			{ y: 0, opacity: 1, delay: 0.15, duration: 0.9, ease: 'power2.out' }
		);
		gsap.fromTo(
			'[data-hero-cta]',
			{ y: 24, opacity: 0 },
			{ y: 0, opacity: 1, delay: 0.28, duration: 0.85, ease: 'power2.out' }
		);

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting) {
						return;
					}

					gsap.fromTo(
						entry.target,
						{ y: 36, opacity: 0 },
						{ y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
					);

					observer.unobserve(entry.target);
				});
			},
			{ threshold: 0.25 }
		);

		document.querySelectorAll('[data-animate]').forEach((element) => observer.observe(element));

		return () => observer.disconnect();
	});
</script>

<main class="relative isolate overflow-x-clip">
	<Navbar brand="Ben Sc" links={navLinks} />

	<section class="section-dark-a relative min-h-screen overflow-hidden">
		<div class="grid-overlay absolute inset-0 -z-20 opacity-20"></div>
		<div class="glow-pulse absolute -left-30 top-16 -z-10 h-80 w-80 rounded-full bg-electric-500/25"></div>
		<div class="glow-pulse absolute -right-12 top-34 -z-10 h-96 w-96 rounded-full bg-violet-500/25 [animation-delay:1.1s]"></div>

		<video
			class="absolute inset-0 -z-30 h-full w-full object-cover opacity-40"
			autoplay
			muted
			loop
			playsinline
			preload="metadata"
			poster="/media/hero-poster.svg"
			aria-hidden="true"
		>
			<source src="/media/hero-placeholder.webm" type="video/webm" />
			<source src="/media/hero-placeholder.mp4" type="video/mp4" />
		</video>
		<div class="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_20%_22%,color-mix(in_oklab,var(--color-electric-500)_26%,transparent)_0%,transparent_55%),linear-gradient(180deg,color-mix(in_oklab,var(--color-anthracite-900)_82%,transparent)_0%,var(--color-anthracite-900)_90%)]"></div>

		<div class="mx-auto flex min-h-screen w-full max-w-7xl items-center px-6 py-20 pt-28 sm:px-10 lg:px-16">
			<div class="max-w-3xl">
				<p class="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-electric-400/40 bg-black/30 px-4 py-1 text-xs font-semibold tracking-[0.22em] text-electric-400 uppercase">
					<span class="h-2 w-2 rounded-full bg-cyan-400"></span>
					FULLSTACK + EVENT TECH
				</p>
				<h1 data-hero-title class="title-gradient text-4xl font-black leading-tight sm:text-6xl lg:text-7xl">
					Ben Sc — Building Digital Systems & Live Light Experiences
				</h1>
				<p data-hero-copy class="mt-6 max-w-2xl text-base leading-relaxed text-mist-100/88 sm:text-lg">
					I engineer cloud-native products and AI-powered software while designing reliable, high-energy lighting systems for live events.
					From backend architecture to show control, I connect code and stagecraft.
				</p>
				<div data-hero-cta class="mt-8 flex flex-wrap gap-3">
					<a href="#projects" class="rounded-xl bg-electric-500 px-6 py-3 text-sm font-semibold text-space-950 transition hover:bg-electric-400">View Projects</a>
					<a href="#skills" class="rounded-xl border border-violet-400/50 bg-black/25 px-6 py-3 text-sm font-semibold text-mist-100 transition hover:border-violet-400 hover:bg-violet-500/20">Explore Skills</a>
				</div>
			</div>
		</div>

		<div class="wave-separator text-[var(--color-anthracite-800)]">
			<svg viewBox="0 0 1440 170" class="h-[88px] w-full" preserveAspectRatio="none" aria-hidden="true">
				<path fill="currentColor" d="M0,96L60,90.7C120,85,240,75,360,80C480,85,600,107,720,122.7C840,139,960,149,1080,138.7C1200,128,1320,96,1380,80L1440,64L1440,171L1380,171C1320,171,1200,171,1080,171C960,171,840,171,720,171C600,171,480,171,360,171C240,171,120,171,60,171L0,171Z"></path>
			</svg>
		</div>
	</section>

	<section id="about" class="section-dark-b relative px-6 py-24 sm:px-10 lg:px-16">
		<div data-animate class="mx-auto grid w-full max-w-7xl gap-10 md:grid-cols-[1.5fr_1fr]">
			<div>
				<p class="mb-3 text-xs font-semibold tracking-[0.2em] text-electric-400 uppercase">About Me</p>
				<h2 class="mb-6 text-3xl font-bold text-mist-100 sm:text-4xl">Two worlds. One workflow.</h2>
				<p class="max-w-3xl text-base leading-relaxed text-mist-100/86">
					I work at the intersection of software engineering and live production technology. On the software side, I build scalable backend and
					fullstack applications using cloud-native architecture, typed systems and practical AI. On the event side, I program lighting systems and
					support show-critical infrastructure with a focus on precision, reliability and speed.
				</p>
			</div>
			<div class="space-y-6 border-l border-electric-400/25 pl-6">
				<div>
					<p class="text-xs tracking-[0.16em] text-electric-300 uppercase">Primary Focus</p>
					<p class="mt-2 text-lg font-semibold">Cloud-Native Engineering</p>
				</div>
				<div>
					<p class="text-xs tracking-[0.16em] text-violet-300 uppercase">Live Domain</p>
					<p class="mt-2 text-lg font-semibold">Lighting Control Systems</p>
				</div>
			</div>
		</div>

		<div class="wave-separator text-[var(--color-anthracite-900)]">
			<svg viewBox="0 0 1440 170" class="h-[92px] w-full" preserveAspectRatio="none" aria-hidden="true">
				<path fill="currentColor" d="M0,32L48,53.3C96,75,192,117,288,128C384,139,480,117,576,106.7C672,96,768,96,864,106.7C960,117,1056,139,1152,144C1248,149,1344,139,1392,133.3L1440,128L1440,171L1392,171C1344,171,1248,171,1152,171C1056,171,960,171,864,171C768,171,672,171,576,171C480,171,384,171,288,171C192,171,96,171,48,171L0,171Z"></path>
			</svg>
		</div>
	</section>

	<section id="skills" class="section-dark-a relative px-6 py-24 sm:px-10 lg:px-16">
		<div class="mx-auto w-full max-w-7xl">
			<div class="mb-12">
				<p class="text-xs font-semibold tracking-[0.2em] text-electric-400 uppercase">Skills</p>
				<h2 class="mt-2 text-3xl font-bold sm:text-4xl">Production-grade software and stage technology expertise.</h2>
			</div>

			{#each skillGroups as group}
				<div data-animate class="border-t border-electric-400/25 py-8 last:border-b">
					<h3 class="mb-4 text-xl font-semibold text-mist-100">{group.title}</h3>
					<div class="flex flex-wrap gap-2.5">
						{#each group.items as item}
							<span class="rounded-lg border border-electric-400/35 bg-black/25 px-3 py-1.5 text-sm text-mist-100/90">{item}</span>
						{/each}
					</div>
				</div>
			{/each}
		</div>

		<div class="wave-separator text-[var(--color-anthracite-800)]">
			<svg viewBox="0 0 1440 170" class="h-[92px] w-full" preserveAspectRatio="none" aria-hidden="true">
				<path fill="currentColor" d="M0,128L60,112C120,96,240,64,360,53.3C480,43,600,53,720,69.3C840,85,960,107,1080,112C1200,117,1320,107,1380,101.3L1440,96L1440,171L1380,171C1320,171,1200,171,1080,171C960,171,840,171,720,171C600,171,480,171,360,171C240,171,120,171,60,171L0,171Z"></path>
			</svg>
		</div>
	</section>

	<section id="projects" class="section-dark-b px-6 py-24 sm:px-10 lg:px-16">
		<div class="mx-auto w-full max-w-7xl">
			<div class="mb-10">
				<p class="text-xs font-semibold tracking-[0.2em] text-electric-400 uppercase">Projects</p>
				<h2 class="mt-2 text-3xl font-bold sm:text-4xl">Selected builds and experimental concepts.</h2>
			</div>

			{#each projects as project}
				<article data-animate class="border-t border-violet-400/28 py-8 last:border-b">
					<p class="text-xs tracking-[0.14em] text-cyan-300 uppercase">{project.domain}</p>
					<h3 class="mt-2 text-2xl font-semibold text-mist-100">{project.title}</h3>
					<p class="mt-3 max-w-4xl text-sm leading-relaxed text-mist-100/80">{project.description}</p>
					<div class="mt-5 flex flex-wrap gap-2">
						{#each project.tech as technology}
							<span class="rounded-md bg-violet-500/18 px-2.5 py-1 text-xs text-violet-200">{technology}</span>
						{/each}
					</div>
				</article>
			{/each}
		</div>
	</section>

	<div id="footer">
		<Footer
		name="Ben Sc"
		promo="Cloud-native developer and event lighting technician focused on robust software, modern infrastructure, and high-energy live experiences."
		{profileLinks}
		{legalLinks}
		/>
	</div>
</main>
