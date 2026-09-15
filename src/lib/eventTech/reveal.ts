import { fxDisabled } from '$lib/stores/reducedMotion';
import gsap from 'gsap';
import { tick } from 'svelte';

/**
 * Observes every `[data-animate]` descendant of `container` and plays the
 * standard rise-and-fade entrance once the element scrolls into view.
 * Call on mount; returns a cleanup function.
 */
export async function initEventTechReveals(container: HTMLElement | null): Promise<() => void> {
	if (!container) return () => {};
	await tick();

	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		return () => {};
	}

	const targets = Array.from(container.querySelectorAll<HTMLElement>('[data-animate]'));
	if (targets.length === 0) return () => {};

	// FX disabled via the site toggle: reveal everything immediately.
	const unsubscribers: (() => void)[] = [];
	let fx = false;
	const unsubscribeFx = fxDisabled.subscribe((value) => {
		fx = value;
	});
	unsubscribers.push(unsubscribeFx);

	const observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (!entry.isIntersecting) return;

				if (fx) {
					gsap.set(entry.target, { clearProps: 'all', y: 0, opacity: 1 });
				} else {
					gsap.fromTo(
						entry.target,
						{ y: 36, opacity: 0 },
						{ y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }
					);
				}

				observer.unobserve(entry.target);
			});
		},
		{ threshold: 0.2 }
	);

	targets.forEach((target) => observer.observe(target));

	return () => {
		observer.disconnect();
		unsubscribers.forEach((unsubscribe) => unsubscribe());
	};
}
