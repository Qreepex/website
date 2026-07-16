<script lang="ts">
	let {
		url,
		label,
		icon,
		kicker,
		description
	}: { url?: string; label: string; icon?: string; kicker?: string; description?: string } =
		$props();
</script>

{#if url}
	<a
		class="highlight-card group relative flex h-full flex-col justify-between overflow-hidden bg-black p-5"
		target="_blank"
		rel="noopener noreferrer"
		href={url}
	>
		<div
			class="pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full bg-electric-400/15 blur-2xl"
		></div>
		<div class="space-y-3">
			{#if kicker}
				<p class="text-electric-300/90 text-[11px] font-black tracking-[0.16em] uppercase">
					{kicker}
				</p>
			{/if}
			<div class="relative mt-2">
				<p
					class="pointer-events-none absolute -top-15 -right-5 text-right text-4xl font-black tracking-[-0.05em] text-mist-100/6 uppercase sm:text-5xl"
				>
					<span class="block whitespace-nowrap" style="transform: translateX(0px);">{label}</span>
					<span class="block whitespace-nowrap" style="transform: translateX(8px);">{label}</span>
					<span class="block whitespace-nowrap" style="transform: translateX(16px);">{label}</span>
					<span class="block whitespace-nowrap" style="transform: translateX(24px);">{label}</span>
					<span class="block whitespace-nowrap" style="transform: translateX(32px);">{label}</span>
				</p>
				<div class="relative flex items-center gap-3">
					{#if icon}
						<img src={icon} alt="" class="h-9 opacity-95" loading="lazy" />
					{/if}
					<h2 class="text-xl font-black tracking-[-0.02em] text-mist-100 uppercase">
						{label}
					</h2>
				</div>
			</div>
			{#if description}
				<p class="mt-2 text-sm leading-relaxed font-semibold text-mist-100/84 sm:text-base">
					{description}
				</p>
			{/if}
		</div>
	</a>
{:else}
	<article
		class="highlight-card group relative flex h-full flex-col justify-between overflow-hidden bg-black p-5"
	>
		<div
			class="pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full bg-electric-400/15 blur-2xl"
		></div>
		<div class="space-y-3">
			{#if kicker}
				<p class="text-electric-300/90 text-[11px] font-black tracking-[0.16em] uppercase">
					{kicker}
				</p>
			{/if}
			<div class="relative mt-2">
				<p
					class="pointer-events-none absolute -top-15 -right-5 text-right text-4xl font-black tracking-[-0.05em] text-mist-100/6 uppercase sm:text-5xl"
				>
					<span class="block whitespace-nowrap" style="transform: translateX(0px);">{label}</span>
					<span class="block whitespace-nowrap" style="transform: translateX(8px);">{label}</span>
					<span class="block whitespace-nowrap" style="transform: translateX(16px);">{label}</span>
					<span class="block whitespace-nowrap" style="transform: translateX(24px);">{label}</span>
					<span class="block whitespace-nowrap" style="transform: translateX(32px);">{label}</span>
				</p>
				<div class="relative flex items-center gap-3">
					{#if icon}
						<img src={icon} alt="" class="h-9 opacity-95" loading="lazy" />
					{/if}
					<h2 class="text-xl font-black tracking-[-0.02em] text-mist-100 uppercase">
						{label}
					</h2>
				</div>
			</div>
			{#if description}
				<p class="mt-2 text-sm leading-relaxed font-semibold text-mist-100/84 sm:text-base">
					{description}
				</p>
			{/if}
		</div>
	</article>
{/if}

<style>
	.highlight-card {
		border: 1px solid color-mix(in oklab, var(--color-electric-400) 35%, transparent);
		transition:
			transform 0.2s cubic-bezier(0.22, 0.85, 0.3, 1.35),
			border-color 0.2s ease,
			box-shadow 0.2s ease;
	}

	.highlight-card:hover {
		border-color: var(--color-electric-400);
		transform: translateY(-3px) scale(1.015);
		box-shadow:
			0 0 0 2px var(--color-electric-400),
			0 22px 46px -18px color-mix(in oklab, var(--color-electric-400) 65%, transparent),
			0 0 50px -10px color-mix(in oklab, var(--color-electric-400) 55%, transparent);
	}
</style>
