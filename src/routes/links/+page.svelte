<script lang="ts">
	import { links } from '$lib/content';
	import HeaderSection from '$lib/page/HeaderSection.svelte';
	import PageContent from '$lib/page/PageContent.svelte';

	const featuredLabels = ['GitHub', 'LinkedIn', 'Instagram'] as const;

	const featuredLinks = links.filter((link) =>
		featuredLabels.includes(link.label as (typeof featuredLabels)[number])
	);
	const otherLinks = links.filter(
		(link) => !featuredLabels.includes(link.label as (typeof featuredLabels)[number])
	);

	const featuredMeta: Record<
		(typeof featuredLabels)[number],
		{ kicker: string; description: string }
	> = {
		GitHub: {
			kicker: 'Builds & Repos',
			description: 'Production projects, open source tooling and backend-heavy experiments.'
		},
		LinkedIn: {
			kicker: 'Career & Impact',
			description:
				'Current role, engineering focus and measurable work across cloud-native systems.'
		},
		Instagram: {
			kicker: 'Show Moments',
			description: 'Live event tech, lighting setups, and behind-the-scenes snapshots.'
		}
	};
</script>

<svelte:head>
	<title>Links | Ben</title>
</svelte:head>

<HeaderSection title="Links" subtitle="Wanna stalk? Wanna connect?" />

<PageContent>
	<section class="space-y-8">
		<ul class="mt-4 grid gap-4 md:grid-cols-3">
			{#each featuredLinks as link}
				<li>
					<a
						class="group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-mist-100/4 p-5 shadow-[0_0_0_1px_rgba(120,140,255,0.18),0_14px_40px_rgba(10,12,28,0.35)] transition-colors hover:bg-mist-100/6"
						href={link.url}
						target="_blank"
						rel="noopener noreferrer"
					>
						<div
							class="pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full bg-electric-400/15 blur-2xl"
						></div>
						<div class="space-y-3">
							<p class="text-electric-300/90 text-[11px] font-black tracking-[0.16em] uppercase">
								{featuredMeta[link.label as (typeof featuredLabels)[number]].kicker}
							</p>
							<div class="relative mt-2">
								<p
									class="pointer-events-none absolute -top-15 -right-5 text-right text-4xl font-black tracking-[-0.05em] text-mist-100/6 uppercase sm:text-5xl"
								>
									<span class="block whitespace-nowrap" style="transform: translateX(0px);"
										>{link.label}</span
									>
									<span class="block whitespace-nowrap" style="transform: translateX(8px);"
										>{link.label}</span
									>
									<span class="block whitespace-nowrap" style="transform: translateX(16px);"
										>{link.label}</span
									>
									<span class="block whitespace-nowrap" style="transform: translateX(24px);"
										>{link.label}</span
									>
									<span class="block whitespace-nowrap" style="transform: translateX(32px);"
										>{link.label}</span
									>
								</p>
								<div class="relative flex items-center gap-3">
									{#if link.icon}
										<img src={link.icon} alt="" class="h-9 opacity-95" loading="lazy" />
									{/if}
									<h2 class="text-xl font-black tracking-[-0.02em] text-mist-100 uppercase">
										{link.label}
									</h2>
								</div>
							</div>
							<p class="mt-2 text-sm leading-relaxed font-semibold text-mist-100/84 sm:text-base">
								{featuredMeta[link.label as (typeof featuredLabels)[number]].description}
							</p>
						</div>
					</a>
				</li>
			{/each}
		</ul>

		<ul class="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
			{#each otherLinks as link}
				<li>
					<a
						class="panel flex items-center justify-between rounded-lg border border-mist-100/15 px-4 py-3 text-sm text-mist-100/85 transition-colors hover:border-electric-400/40 hover:text-mist-100"
						href={link.url}
						target="_blank"
						rel="noopener noreferrer"
					>
						<span class="inline-flex items-center gap-2">
							{#if link.icon}
								<img src={link.icon} alt="" class="h-4 w-4 opacity-80" loading="lazy" />
							{/if}
							{link.label}
						</span>
						<span aria-hidden="true" class="text-electric-400/80">↗</span>
					</a>
				</li>
			{/each}
		</ul>
	</section>
</PageContent>
