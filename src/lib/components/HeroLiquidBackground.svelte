<script lang="ts">
	import { onMount } from 'svelte';

	let wrapEl: HTMLDivElement | null = null;
	let blobA: HTMLDivElement | null = null;
	let blobB: HTMLDivElement | null = null;
	let blobC: HTMLDivElement | null = null;
	let blobD: HTMLDivElement | null = null;
	let blobE: HTMLDivElement | null = null;

	let rafId = 0;
	let viewportWidth = 1;
	let viewportHeight = 1;
	let targetX = 0.5;
	let targetY = 0.45;
	let smoothX = 0.5;
	let smoothY = 0.45;
	let reactiveBoost = 0;
	let lastPointerX = 0;
	let lastPointerY = 0;
	let lastPointerTime = 0;
	let reducedMotion = false;

	function clamp01(value: number) {
		return Math.max(0, Math.min(1, value));
	}

	function updateBlobTransforms() {
		if (!blobA || !blobB || !blobC || !blobD || !blobE) return;

		const motionGain = reducedMotion ? 1 : 1 + reactiveBoost * 1.35;
		const xOffset = (smoothX - 0.5) * 42 * motionGain;
		const yOffset = (smoothY - 0.5) * 36 * motionGain;
		const swirl = (smoothX - 0.5) * (smoothY - 0.5) * 220;
		const sizePulse = 1 + reactiveBoost * 0.1;

		blobA.style.transform = `translate3d(${xOffset * 1.15}px, ${yOffset * 0.85}px, 0) rotate(${swirl * 0.06}deg) scale(${sizePulse})`;
		blobB.style.transform = `translate3d(${xOffset * -0.85}px, ${yOffset * 1.25}px, 0) rotate(${swirl * -0.08}deg) scale(${1 + reactiveBoost * 0.08})`;
		blobC.style.transform = `translate3d(${xOffset * 0.7}px, ${yOffset * -1.3}px, 0) rotate(${swirl * 0.04}deg) scale(${1 + reactiveBoost * 0.06})`;
		blobD.style.transform = `translate3d(${xOffset * -1.35}px, ${yOffset * -0.55}px, 0) rotate(${swirl * 0.09}deg) scale(${1 + reactiveBoost * 0.12})`;
		blobE.style.transform = `translate3d(${xOffset * 0.35}px, ${yOffset * 1.55}px, 0) rotate(${swirl * -0.07}deg) scale(${1 + reactiveBoost * 0.09})`;
	}

	function animate() {
		const easing = reducedMotion ? 0.08 : 0.14;
		smoothX += (targetX - smoothX) * easing;
		smoothY += (targetY - smoothY) * easing;
		reactiveBoost *= reducedMotion ? 0.82 : 0.9;
		updateBlobTransforms();
		rafId = window.requestAnimationFrame(animate);
	}

	onMount(() => {
		lastPointerTime = performance.now();
		const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
		reducedMotion = mediaQuery.matches;

		const onMotionPrefChange = (event: MediaQueryListEvent) => {
			reducedMotion = event.matches;
		};

		const onResize = () => {
			viewportWidth = Math.max(window.innerWidth, 1);
			viewportHeight = Math.max(window.innerHeight, 1);
		};

		const onPointerMove = (event: PointerEvent) => {
			targetX = clamp01(event.clientX / viewportWidth);
			targetY = clamp01(event.clientY / viewportHeight);

			const now = performance.now();
			const dt = Math.max(now - lastPointerTime, 8);
			const dx = event.clientX - lastPointerX;
			const dy = event.clientY - lastPointerY;
			const speed = Math.hypot(dx, dy) / dt;
			reactiveBoost = Math.min(1, reactiveBoost * 0.7 + speed * 0.11);
			lastPointerX = event.clientX;
			lastPointerY = event.clientY;
			lastPointerTime = now;
		};

		onResize();
		updateBlobTransforms();
		rafId = window.requestAnimationFrame(animate);

		window.addEventListener('resize', onResize, { passive: true });
		window.addEventListener('pointermove', onPointerMove, { passive: true });
		mediaQuery.addEventListener('change', onMotionPrefChange);

		return () => {
			window.cancelAnimationFrame(rafId);
			window.removeEventListener('resize', onResize);
			window.removeEventListener('pointermove', onPointerMove);
			mediaQuery.removeEventListener('change', onMotionPrefChange);
		};
	});
</script>

<div bind:this={wrapEl} class="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
	<div
		bind:this={blobA}
		class="absolute -top-30 -left-24 h-176 w-176 rounded-[58%_42%_53%_47%/46%_58%_42%_54%] bg-electric-500/25 blur-[92px]"
	></div>
	<div
		bind:this={blobB}
		class="absolute top-22 -right-26 h-160 w-160 rounded-[43%_57%_48%_52%/54%_46%_56%_44%] bg-violet-500/20 blur-[100px]"
	></div>
	<div
		bind:this={blobC}
		class="absolute -bottom-52 left-[36%] h-144 w-xl rounded-[61%_39%_44%_56%/40%_63%_37%_60%] bg-electric-400/18 blur-[102px]"
	></div>
	<div
		bind:this={blobD}
		class="absolute top-[30%] -left-44 h-120 w-120 rounded-[39%_61%_58%_42%/55%_45%_55%_45%] bg-violet-400/16 blur-[108px]"
	></div>
	<div
		bind:this={blobE}
		class="h-lg bg-electric-300/14 absolute -right-34 -bottom-30 w-lg rounded-[52%_48%_36%_64%/44%_57%_43%_56%] blur-[114px]"
	></div>
</div>
