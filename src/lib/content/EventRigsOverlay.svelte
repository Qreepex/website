<script lang="ts">
	type EventRig = {
		fixture:
			| '/media/lights/moving-head.svg'
			| '/media/lights/retro-par.svg'
			| '/media/lights/par64-rusty.svg'
			| '/media/lights/par64-side.svg';
		beamClass: 'event-beam-violet' | 'event-beam-cyan' | 'event-beam-orange' | 'event-beam-red';
		top: number;
		left: number;
		size: number;
		duration: number;
		delay: number;
		baseRotation: number;
		sweep: number;
		opacity: number;
		away: boolean;
	};

	let { rigs = [] }: { rigs: EventRig[] } = $props();
</script>

<div class="pointer-events-none absolute inset-0 z-1 overflow-hidden">
	{#each rigs as rig}
		<div class="event-rig" style={`top:${rig.top}%; left:${rig.left}%; opacity:${rig.opacity};`}>
			<div
				class={`event-light-wrap rotate-sweep ${rig.away ? 'event-away' : ''}`}
				style={`width:${rig.size}px; height:${rig.size}px; --rig-duration:${rig.duration}s; --rig-delay:${rig.delay}s; --base-rot:${rig.baseRotation}deg; --rig-sweep:${rig.sweep}deg;`}
			>
				<img
					src={rig.fixture}
					alt=""
					class={`event-light ${rig.fixture === '/media/lights/par64-side.svg' ? 'par64-side' : ''}`}
					aria-hidden="true"
				/>
				<div class={`event-beam ${rig.beamClass}`}></div>
			</div>
		</div>
	{/each}
</div>

<style>
	.event-rig {
		position: absolute;
		pointer-events: none;
		filter: saturate(1.15);
		transform: translate(-50%, -50%);
	}

	.event-light-wrap {
		position: relative;
		transform-origin: 50% 78%;
	}

	.event-away {
		transform-origin: 50% 70%;
	}

	.event-light {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	.event-light.par64-side {
		transform: rotate(-90deg) scale(0.72);
	}

	.event-beam {
		position: absolute;
		left: 50%;
		top: -140px;
		width: 88px;
		height: 220px;
		transform: translateX(-50%);
		border-radius: 999px;
		filter: blur(9px);
		opacity: 0.34;
		mix-blend-mode: screen;
	}

	.event-beam-violet {
		background: linear-gradient(to top, rgba(167, 139, 250, 0.58), rgba(167, 139, 250, 0));
	}

	.event-beam-cyan {
		background: linear-gradient(to top, rgba(34, 211, 238, 0.58), rgba(34, 211, 238, 0));
	}

	.event-beam-orange {
		background: linear-gradient(to top, rgba(251, 146, 60, 0.58), rgba(251, 146, 60, 0));
	}

	.event-beam-red {
		background: linear-gradient(to top, rgba(248, 113, 113, 0.56), rgba(248, 113, 113, 0));
	}

	.rotate-sweep {
		animation: rig-sweep var(--rig-duration) ease-in-out infinite;
		animation-delay: var(--rig-delay);
	}

	@keyframes rig-sweep {
		0%,
		100% {
			transform: rotate(calc(var(--base-rot) - var(--rig-sweep)));
		}
		50% {
			transform: rotate(calc(var(--base-rot) + var(--rig-sweep)));
		}
	}
</style>
