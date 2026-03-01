<script lang="ts">
	import HighlightCard from '$lib/components/HighlightCard.svelte';
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

	const pageTitle = 'My Links | Ben Schiemann';
	const pageDescription =
		'Here are my direct links to GitHub, LinkedIn, Instagram and other platforms related to my engineering and event tech work.';
</script>

<svelte:head>
	<title>{pageTitle}</title>
	<meta name="description" content={pageDescription} />
</svelte:head>

<HeaderSection title="Links" subtitle="Wanna stalk? Wanna connect?" />

<PageContent>
	<section class="space-y-8">
		<ul class="mt-4 grid gap-4 md:grid-cols-3">
			{#each featuredLinks as link}
				<li>
					<HighlightCard
						url={link.url}
						label={link.label}
						description={featuredMeta[link.label as (typeof featuredLabels)[number]].description}
						kicker={featuredMeta[link.label as (typeof featuredLabels)[number]].kicker}
						icon={link.icon}
					/>
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
