import { ASSETS_HOST } from '$lib';
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
	dev: 'Developer Reference',
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
	{
		src: ASSETS_HOST + '/event-showcase/pics/own/2025-xmas-klinkrade.webp',
		alt: 'Klinkrade Xmas laser show 2024'
	},
	{
		src: ASSETS_HOST + '/event-showcase/pics/worked/2024-xmas-klinkrade-2.webp',
		alt: 'Klinkrade Xmas event 2024'
	},
	{
		src: ASSETS_HOST + '/event-showcase/pics/own/2025-firmenevent.webp',
		alt: 'Corporate event production 2025'
	},
	{
		src: ASSETS_HOST + '/event-showcase/pics/own/2025-ely-oaks-mai-traum-gmbh-kiel.webp',
		alt: 'FOH setup Traum GmbH Kiel 2025'
	},
	{
		src: ASSETS_HOST + '/event-showcase/pics/own/2025-trecker-treck-hohenhorn-foh.webp',
		alt: 'FOH and lighting in Hohenhorn 2025'
	},
	{
		src: ASSETS_HOST + '/event-showcase/pics/own/2025-butterflies-stadtpark-pyro.webp',
		alt: 'Butterflies Stadtpark show 2025',
		credit: 'Joel Abraham',
		creditUrl: 'https://instagram.com/fotograf.und.so'
	},
	{
		src: ASSETS_HOST + '/event-showcase/pics/own/2025-ely-oaks-foh-traum-gmbh-kiel.webp',
		alt: 'Traum GmbH Kiel show in May 2025'
	},
	{
		src: ASSETS_HOST + '/event-showcase/pics/own/2025-gf-36.webp',
		alt: 'XXL Party @ Große Freiheit 36'
	},
	{
		src: ASSETS_HOST + '/event-showcase/pics/own/2025-trailer.webp',
		alt: 'Event trailer setup 2025'
	},
	{
		src: ASSETS_HOST + '/event-showcase/pics/own/2025-trecker-treck-hohenhorn-ballerndorf.webp',
		alt: 'Trecker Treck Hohenhorn Ballerndorf 2025'
	},
	{
		src: ASSETS_HOST + '/event-showcase/pics/own/2025-treckerrennen-trittau.webp',
		alt: 'Treckerrennen Trittau 2025'
	},
	{
		src: ASSETS_HOST + '/event-showcase/pics/own/2025-woderkant-kiel.webp',
		alt: 'Woderkant Kiel event 2025'
	}
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

export function createRandomEventRigs(rigCount = 45): EventRig[] {
	const rigs: EventRig[] = [];

	for (let index = 0; index < rigCount; index += 1) {
		const fixture = EVENT_RIG_FIXTURES[Math.floor(Math.random() * EVENT_RIG_FIXTURES.length)];
		const beamClass = EVENT_RIG_BEAMS[Math.floor(Math.random() * EVENT_RIG_BEAMS.length)];
		const top = 10 + Math.random() * 90;
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
		domain: 'Discord Bot, since 2020',
		description:
			'Widely used Auto Delete bot for Discord, built with a focus on reliability, configurability and user-friendly design used by over 31,000 communities reaching 18 mio. users worldwide.',
		tech: [
			'Go',
			'Kubernetes',
			'REST',
			'Sharding',
			'High Availability',
			'Temporal.io',
			'Redis',
			'MongoDB'
		],
		image: '/media/reference/eazyautodelete-logo.webp',
		color: '#5865f2',
		url: 'https://eazyautodelete.xyz'
	},
	{
		title: 'Full Stack Dev @ ENERPARC AG',
		domain: 'Full Stack Developer for Renewable Energies, since 2025',
		description:
			'At Enerparc, I build high available system to monitor and collect data from hundreds of solar parks and run real time analysis on it as well as process it for long term storage and Machine learning applications.',
		tech: ['Rust', 'TypeScript', 'Cloud Native', 'Kubernetes'],
		image: '/media/reference/logo_enerparc.png',
		url: 'https://enerparc.de',
		color: '#004682'
	},
	{
		title: 'WaterMe.app',
		domain: 'Mobile/Web App, since 2025',
		description:
			'App to track Plants and their watering needs, built with a focus on delightful UI, reliability and helpful features to make plant care easier and more enjoyable.',
		tech: ['MongoDB', 'Capacitator', 'Go', 'SvelteKit', 'Tailwind CSS'],
		image: '/media/reference/water-me-app.svg',
		url: 'https://water-me.app',
		color: '#00ee57'
	}
];

export const smallerDevProjects: SmallerProject[] = [
	{
		title: 'EazyAutodelete Dashboard',
		domain: 'Web Development',
		description:
			'Complex dashboard for managing configurations for EazyAutodelet. Full CRUD Operations on highly nested and relational data models with real-time validation.',
		tech: ['SvelteKit', 'Cloudflare Workers', 'CRUD'],
		url: 'https://dash.eazyautodelete.xyz'
	},
	{
		title: 'BTE Germany',
		domain: 'Discord Bot',
		description:
			'Discord Bot to manage FTP Uploads, Google Spreadsheets, Discord Threads and more throughout the onboarding process of new members in the BTE Germany Discord Server.',
		tech: ['Discord.JS', 'TypeScript', 'Google APIs', 'FTP'],
		url: 'https://bte-germany.de'
	},
	{
		title: 'NaaIhr Community Anti Raid Tool',
		domain: 'Community Protection',
		description:
			'Tool with Captcha handling and automatic detection of raid patterns to protect the NaaIhr Community Discord Server from raids and spam attacks.',
		tech: ['JavaScript', 'Captcha', 'Detection Algorithms'],
		url: 'https://naaihr.de'
	},
	{
		title: 'Tjan Portal - Community Platform',
		domain: 'Community Platform',
		description:
			'A platform for Twitch Streamer Tjan to engange with his community for submission forms, music status and more, built with a focus on reliability and ease of use for both the streamer and the community.',
		tech: ['Node.js', 'Twitch API', 'OAuth2']
	}
];

type Link = {
	label: string;
	url: string;
	icon?: string;
};

export const links: Link[] = [
	{
		label: 'GitHub',
		url: 'https://github.com/qreepex',
		icon: '/media/icons/GitHub_Invertocat_White.svg'
	},
	{
		label: 'LinkedIn',
		url: 'https://linkedin.com/in/ben-schiemann',
		icon: '/media/icons/LI-In-Bug.png'
	},
	{
		label: 'Instagram',
		url: 'https://instagram.com/_bms.05',
		icon: '/media/icons/Instagram_Glyph_Gradient.svg'
	},
	{
		label: 'Email',
		url: 'mailto:ben@schiemann.work',
		icon: '/media/icons/email.svg'
	},
	{
		label: 'Spotify',
		url: 'https://open.spotify.com/user/p05pj1y7mue9lpqpt8dfbccmu',
		icon: '/media/icons/spotify.svg'
	},
	{
		label: 'Twitch',
		url: 'https://twitch.tv/qreepex',
		icon: '/media/icons/twitch.svg'
	},
	{
		label: 'Reddit',
		url: 'https://reddit.com/user/qreepex',
		icon: '/media/icons/reddit.svg'
	},
	{
		label: 'Steam',
		url: 'https://steamcommunity.com/id/qreepex',
		icon: '/media/icons/steam.svg'
	},
	{
		label: 'X',
		url: 'https://x.com/qreepex',
		icon: '/media/icons/x.svg'
	}
];
