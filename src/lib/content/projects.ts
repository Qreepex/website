export type Project = {
	title: string;
	domain: string;
	description: string;
	tech: string[];
	image: string;
	url?: string;
	former?: boolean;
};

export const devProjects: Project[] = [
	{
		title: 'EazyAutodelete',
		domain: 'Discord Bot',
		description:
			'Widely used Auto Delete bot for Discord, built with a focus on reliability, configurability and user-friendly design used by over 31,000 communities reaching 18 mio. users worldwide.',
		tech: ['Go', 'Kubernetes', 'REST', 'Sharding', "High Availability"],
		image: '/media/projects/atlas-api-gateway.svg',
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