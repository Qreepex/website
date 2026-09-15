import { ASSETS_HOST } from '$lib';

// ── Event Tech page shared types ───────────────────────────────────────────

export type EventAccent = 'violet' | 'cyan' | 'electric' | 'pink';

export type EventHighlightProject = {
	title: string;
	meta: string;
	description: string;
	tags: string[];
	image?: string;
	placeholder: boolean;
	accent: EventAccent;
};

export type EventToolGroup = {
	title: string;
	description: string;
	items: string[];
};

// ── Highlight projects ─────────────────────────────────────────────────────
// look intentional and show visitors that more references are coming.

export const eventHighlightProjects: EventHighlightProject[] = [
	{
		title: 'Butterflies Stadtpark Open Air',
		meta: '2025 · Hamburg Stadtpark · Open Air',
		description:
			'Built a large stage around the DJ so people could dance on it, backed by a truss carrée rigged with floods, strobes and LED bars for subtle but chic house and EDM looks. CO2 and flame effects sealed the drops.',
		tags: ['Open Air', 'Stage Build', 'CO2 & Flames', 'Truss Carrée'],
		image: ASSETS_HOST + '/event-showcase/pics/own/2025-butterflies-stadtpark-pyro.webp',
		placeholder: false,
		accent: 'electric'
	},
	{
		title: 'Steinhorst Open Air',
		meta: '2024–2026 · Steinhorst · Festival in Dorf-Style',
		description:
			'Festival feeling with village soul. Rigged Layher towers, deployed CO2, flame jets and spark effects, installed moving lights and rigged L-Acoustics Kara, K3, KS21 and KS28. Set up a Pioneer CDJ booth, built LED walls and measured the laser safety zones for crowd scanning.',
		tags: ['Festival', 'Layher Rigging', 'SFX', 'Laser Safety'],
		image: ASSETS_HOST + '/event-showcase/pics/own/Soa2026%2007843.jpeg',
		placeholder: false,
		accent: 'cyan'
	},
	{
		title: 'Peins Gasthof Klinkrade',
		meta: '2024–2026 · Klinkrade · Recurring Production',
		description:
			'Planned the stage designs and technical setup here across several years. A smaller space demands precision - I build lasers, lights and L-Acoustics sound with certified laser safety setups for crowd scanning.',
		tags: ['Recurring', 'L-Acoustics', 'Laser Safety', 'Stage Design'],
		image: ASSETS_HOST + '/event-showcase/pics/own/klinkrade/73A03284.jpg',
		placeholder: false,
		accent: 'violet'
	},
	{
		title: 'Your next big show',
		description:
			'More references are in the works. Hit me up if you want to boost your event to the next level - clubs, festivals and corporate stages.',
		tags: ['Coming soon', 'Booking open'],
		placeholder: true,
		accent: 'pink',
		meta: '2026 · Northern Germany · Incoming'
	}
];

// ── Tools & consoles ───────────────────────────────────────────────────────

export const eventToolGroups: EventToolGroup[] = [
	{
		title: 'Lighting, Visuals & Laser',
		description: 'Show design, programming and safe laser operation.',
		items: [
			'Light Design',
			'grandMA2/3',
			'ArtNet',
			'Resolume',
			'Medien Server',
			'Pangolin BEYOND',
			'Laser Shows',
			'Licensed Laser Safety Officer',
			'Show Networking'
		]
	},
	{
		title: 'Audio Systems & FOH',
		description: 'System tuning, FOH and monitor mixing at any scale.',
		items: [
			'L-Acoustics A10 / A15',
			'L-Acoustics Kiva / Kara / K3',
			'L-Acoustics KS21 / KS28 / SB15',
			'Midas M32',
			'Yamaha DM3 / DM7',
			'System Tuning'
		]
	},

	{
		title: 'Stage & Custom Builds',
		description: 'From stage concept to fully self-built rolling systems.',
		items: [
			'Layher',
			'Stage Design',
			'Set Design',
			'Custom Speaker Wagons (Bollerwagen)',
			'Rigging & Trussing',
			'Event Logistics'
		]
	}
];

// ── Types of events ────────────────────────────────────────────────────────

export const eventTypeChips: string[] = [
	'Concerts',
	'Clubs & Raves',
	'Open Airs & Festivals',
	'Corporate Events',
	'Fairs & Conferences',
	'Cinema & Special Events',
	'Private Parties',
	'Demonstrations & Custom Builds'
];
