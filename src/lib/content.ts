import type { Project, ProjectsMode, SmallerProject } from './types';

export type EventRig = {
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

export const PROJECTS_MODE_LABELS: Record<ProjectsMode, string> = {
	dev: 'Developer Projects',
	event: 'Event Tech References'
};

export const PROJECTS_MODE_DESCRIPTIONS: Record<ProjectsMode, string> = {
	dev: 'Software-first builds focused on cloud-native platforms, APIs and intelligent automation. Each system is designed to hit hard in production.',
	event:
		'Show-critical systems for lighting, networking and realtime production orchestration. Engineered for pressure, precision and zero compromise.'
};

export const eventTechOverview: string[] = [
	'I build LIVE light shows and fully timecoded shows for lighting and lasers to deliver that WOW moment to all guests!',
	'I mainly work with grandMA3 (and sometimes grandMA2), program laser workflows in Pangolin Beyond, and handle networked show control with technologies like Art-Net.',
	'I also build stage setups, work with L-Acoustics speaker systems, and operate sound desks in live production environments.'
];

export const eventShowcaseImages: {
	src: string;
	alt: string;
	credit?: string;
	creditUrl?: string;
}[] = [
	{ src: '/media/events/2025-xmas-klinkrade.webp', alt: 'Klinkrade Xmas laser show 2024' },
	{
		src: '/media/events/2024-xmas-klinkrade.webp',
		alt: 'Klinkrade Xmas event 2024'
	},
	{ src: '/media/events/2025-firmenevent.webp', alt: 'Corporate event production 2025' },
	{ src: '/media/events/2025-foh-traum-gmbh-kiel.webp', alt: 'FOH setup Traum GmbH Kiel 2025' },
	{ src: '/media/events/2025-hohenhorn-foh.webp', alt: 'FOH and lighting in Hohenhorn 2025' },
	{
		src: '/media/events/2025-mai-butterflies-stadtpark.webp',
		alt: 'Butterflies Stadtpark show 2025',
		credit: 'Joel Abraham',
		creditUrl: 'https://instagram.com/fotograf.und.so'
	},
	{ src: '/media/events/2025-mai-traum-gmbh-kiel.webp', alt: 'Traum GmbH Kiel show in May 2025' },
	{
		src: '/media/events/2025-stadtpark-pyro.webp',
		alt: 'Stadtpark pyro and lights show 2025',
		credit: 'Joel Abraham',
		creditUrl: 'https://instagram.com/fotograf.und.so'
	},
	{ src: '/media/events/2025-trailer.webp', alt: 'Event trailer setup 2025' },
	{
		src: '/media/events/2025-trecker-treck-hohenhorn-ballerndorf.webp',
		alt: 'Trecker Treck Hohenhorn Ballerndorf 2025'
	},
	{ src: '/media/events/2025-treckerrennen-trittau.webp', alt: 'Treckerrennen Trittau 2025' },
	{ src: '/media/events/2025-woderkant-kiel.webp', alt: 'Woderkant Kiel event 2025' }
];

const EVENT_RIG_FIXTURES: EventRig['fixture'][] = [
	'/media/lights/moving-head.svg',
	'/media/lights/retro-par.svg',
	'/media/lights/par64-rusty.svg',
	'/media/lights/par64-side.svg'
];

const EVENT_RIG_BEAMS: EventRig['beamClass'][] = [
	'event-beam-violet',
	'event-beam-cyan',
	'event-beam-orange',
	'event-beam-red'
];

export function createRandomEventRigs(rigCount = 9): EventRig[] {
	const rigs: EventRig[] = [];

	for (let index = 0; index < rigCount; index += 1) {
		const fixture = EVENT_RIG_FIXTURES[Math.floor(Math.random() * EVENT_RIG_FIXTURES.length)];
		const beamClass = EVENT_RIG_BEAMS[Math.floor(Math.random() * EVENT_RIG_BEAMS.length)];
		const top = 14 + Math.random() * 70;
		const left = 8 + Math.random() * 84;
		const size = 62 + Math.random() * 34;
		const duration = 4.1 + Math.random() * 3.1;
		const delay = Math.random() * 2.8;
		const baseRotation = -30 + Math.random() * 60;
		const sweep = 14 + Math.random() * 18;
		const opacity = 0.45 + Math.random() * 0.32;
		const away = Math.random() < 0.42;

		rigs.push({
			fixture,
			beamClass,
			top,
			left,
			size,
			duration,
			delay,
			baseRotation,
			sweep,
			opacity,
			away
		});
	}

	return rigs;
}

export const devProjects: Project[] = [
	{
		title: 'EazyAutodelete',
		domain: 'Discord Bot',
		description:
			'Widely used Auto Delete bot for Discord, built with a focus on reliability, configurability and user-friendly design used by over 31,000 communities reaching 18 mio. users worldwide.',
		tech: ['Go', 'Kubernetes', 'REST', 'Sharding', 'High Availability'],
		image: '/media/projects/atlas-api-gateway.svg',
		color: '#5865f2',
		url: 'https://eazyautodelete.xyz'
	},
	{
		title: 'Neon Compute Studio',
		domain: 'AI Tooling',
		description:
			'Developer workspace for prompt pipelines, model evaluation and deployment-ready AI workflow automation.',
		tech: ['Rust', 'Python', 'WebAssembly', 'PostgreSQL'],
		image: '/media/projects/neon-compute-studio.svg',
		url: '#'
	},
	{
		title: 'Pulse Realtime Core',
		domain: 'Distributed Systems',
		description:
			'Event-driven core service coordinating low-latency pipelines and resilient background workers at scale.',
		tech: ['Java', 'gRPC', 'Redis', 'Kafka'],
		image: '/media/projects/pulse-realtime-core.svg',
		url: '#',
		former: true
	}
];

export const eventProjects: Project[] = [
	{
		title: 'Lumen Show Programmer',
		domain: 'Lighting Control',
		description:
			'Cue-based lighting programming workflow for festival and touring environments with reliable handover paths.',
		tech: ['grandMA3', 'Lighting Design', 'Timecode', 'DMX'],
		image: '/media/projects/lumen-show-programmer.svg',
		url: '#'
	},
	{
		title: 'StagePulse Runtime',
		domain: 'Show Synchronization',
		description:
			'Realtime trigger runtime coordinating audio, video and lighting transitions with millisecond-level consistency.',
		tech: ['Show Networking', 'L-Acoustics', 'SMPTE', 'OSC'],
		image: '/media/projects/stagepulse-runtime.svg',
		url: '#'
	},
	{
		title: 'Venue Signal Mesh',
		domain: 'Production Infrastructure',
		description:
			'Operational network blueprint for show-critical signal flow, redundancy and rapid fault isolation on site.',
		tech: ['Art-Net', 'sACN', 'VLAN', 'Live Systems'],
		image: '/media/projects/venue-signal-mesh.svg',
		url: '#'
	}
];

export const smallerDevProjects: SmallerProject[] = [
	{
		title: 'Webhook Relay',
		domain: 'Automation',
		description:
			'Lightweight relay service for validating, transforming and forwarding incoming webhooks.',
		tech: ['TypeScript', 'Cloudflare Workers', 'Queues'],
		url: '#'
	},
	{
		title: 'Ops Snapshot',
		domain: 'Observability',
		description:
			'Daily rollup dashboard that summarizes incidents, deploy health and service-level drift.',
		tech: ['SvelteKit', 'PostgreSQL', 'Grafana']
	},
	{
		title: 'Cache Primer',
		domain: 'Performance',
		description:
			'Pre-warm and invalidation utility for edge caches across static and API-heavy routes.',
		tech: ['Go', 'Redis', 'Cron']
	},
	{
		title: 'Tenant Seed',
		domain: 'Internal Tooling',
		description:
			'Template-based tenant bootstrapper with policy defaults and baseline feature flags.',
		tech: ['Node.js', 'Prisma', 'CLI']
	},
	{
		title: 'Mailflow Guard',
		domain: 'Messaging',
		description:
			'Rule engine for transactional email routing, suppression and fallback provider handling.',
		tech: ['Python', 'FastAPI', 'Celery'],
		url: '#'
	},
	{
		title: 'Schema Delta Bot',
		domain: 'Developer Experience',
		description: 'PR bot that posts schema diffs with migration hints before review starts.',
		tech: ['GitHub Actions', 'Rust', 'PostgreSQL']
	},
	{
		title: 'Job Replay',
		domain: 'Reliability',
		description:
			'Controlled replay utility for failed queue messages with trace-linked audit output.',
		tech: ['Kafka', 'Java', 'OpenTelemetry']
	},
	{
		title: 'Asset Fingerprint',
		domain: 'Build Pipeline',
		description: 'Artifact versioning helper that tracks static bundle lineage across releases.',
		tech: ['Vite', 'Node.js', 'CI/CD']
	},
	{
		title: 'Flag Drift Watch',
		domain: 'Feature Control',
		description:
			'Compares feature flag states across environments and reports unsafe divergence early.',
		tech: ['TypeScript', 'Redis', 'Scheduler']
	},
	{
		title: 'Query Cost Lens',
		domain: 'Database Ops',
		description:
			'Ranks high-cost SQL statements and links them to endpoints for fast optimization loops.',
		tech: ['PostgreSQL', 'SvelteKit', 'OpenTelemetry']
	},
	{
		title: 'Deploy Gate',
		domain: 'Release Safety',
		description:
			'Pre-release quality gate combining smoke checks, rollback criteria and release notes checks.',
		tech: ['GitHub Actions', 'Bash', 'Node.js']
	},
	{
		title: 'Media Proxy Lite',
		domain: 'Edge Services',
		description:
			'Resizes and caches remote media on demand with route-level cache control presets.',
		tech: ['Cloudflare Workers', 'KV', 'Image Resizing'],
		url: '#'
	}
];
