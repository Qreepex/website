export type Project = {
	title: string;
	domain: string;
	description: string;
	tech: string[];
	image: string;
};

export const devProjects: Project[] = [
	{
		title: 'Atlas API Gateway',
		domain: 'Cloud Platform',
		description:
			'High-throughput API gateway with policy-driven routing, request shaping and tenant-aware observability.',
		tech: ['Go', 'Kubernetes', 'NATS', 'TypeScript'],
		image: '/media/projects/atlas-api-gateway.svg'
	},
	{
		title: 'Neon Compute Studio',
		domain: 'AI Tooling',
		description:
			'Developer workspace for prompt pipelines, model evaluation and deployment-ready AI workflow automation.',
		tech: ['Rust', 'Python', 'WebAssembly', 'PostgreSQL'],
		image: '/media/projects/neon-compute-studio.svg'
	},
	{
		title: 'Pulse Realtime Core',
		domain: 'Distributed Systems',
		description:
			'Event-driven core service coordinating low-latency pipelines and resilient background workers at scale.',
		tech: ['Java', 'gRPC', 'Redis', 'Kafka'],
		image: '/media/projects/pulse-realtime-core.svg'
	}
];

export const eventProjects: Project[] = [
	{
		title: 'Lumen Show Programmer',
		domain: 'Lighting Control',
		description:
			'Cue-based lighting programming workflow for festival and touring environments with reliable handover paths.',
		tech: ['grandMA3', 'Lighting Design', 'Timecode', 'DMX'],
		image: '/media/projects/lumen-show-programmer.svg'
	},
	{
		title: 'StagePulse Runtime',
		domain: 'Show Synchronization',
		description:
			'Realtime trigger runtime coordinating audio, video and lighting transitions with millisecond-level consistency.',
		tech: ['Show Networking', 'L-Acoustics', 'SMPTE', 'OSC'],
		image: '/media/projects/stagepulse-runtime.svg'
	},
	{
		title: 'Venue Signal Mesh',
		domain: 'Production Infrastructure',
		description:
			'Operational network blueprint for show-critical signal flow, redundancy and rapid fault isolation on site.',
		tech: ['Art-Net', 'sACN', 'VLAN', 'Live Systems'],
		image: '/media/projects/venue-signal-mesh.svg'
	}
];