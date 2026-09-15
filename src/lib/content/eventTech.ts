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
// Fill in the TODO descriptions whenever you have time — placeholder cards
// look intentional and show visitors that more references are coming.

export const eventHighlightProjects: EventHighlightProject[] = [
	{
		title: 'Stadtpark Open Air',
		meta: '2025 · Hamburg · 10,000+ guests',
		description:
			'TODO: Describe your role, the rig and the show. What was the challenge, what did you build and program, what made the final result stand out?',
		tags: ['Festival', 'Timecode Show', 'grandMA3', 'Pyro Sync'],
		image: ASSETS_HOST + '/event-showcase/pics/own/2025-butterflies-stadtpark-pyro.webp',
		placeholder: false,
		accent: 'violet'
	},
	{
		title: 'Kieler Woche Weekender',
		meta: '2025 · Kiel · Festival Stage',
		description:
			'TODO: Describe the festival setup, the stage design and what you were responsible for. Which desks, fixtures and lasers did you run?',
		tags: ['Festival', 'FOH Operation', 'Lasers'],
		image: ASSETS_HOST + '/event-showcase/pics/own/2025-woderkant-kiel.webp',
		placeholder: false,
		accent: 'cyan'
	},
	{
		title: 'Corporate Gala Production',
		meta: '2025 · Hamburg · Corporate',
		description:
			'TODO: Describe the corporate production. Clean looks, branding colors, ambient and show lighting — what did the client need and what did you deliver?',
		tags: ['Corporate', 'Ambient Lighting', 'Wireless Fixtures'],
		image: ASSETS_HOST + '/event-showcase/pics/own/2025-firmenevent.webp',
		placeholder: false,
		accent: 'electric'
	},
	{
		title: 'Your next big show',
		meta: '2026 · Northern Germany · Incoming',
		description:
			'More references are in the works. Currently planning and programming upcoming shows across Northern Germany — clubs, festivals and corporate stages.',
		tags: ['Coming soon', 'Booking open'],
		placeholder: true,
		accent: 'pink'
	}
];

// ── Tools & consoles ───────────────────────────────────────────────────────

export const eventToolGroups: EventToolGroup[] = [
	{
		title: 'Audio Systems & FOH',
		description: 'System tuning, FOH and monitor mixing at any scale.',
		items: [
			'L-Acoustics A10 / A15',
			'L-Acoustics Kiva / Kara',
			'L-Acoustics K3',
			'L-Acoustics KS21 / KS28 / SB15',
			'Midas M32R',
			'Yamaha DM3 / DM7',
			'System Tuning',
			'Haus-PA'
		]
	},
	{
		title: 'Lighting, Visuals & Laser',
		description: 'Show design, programming and safe laser operation.',
		items: [
			'Light Design',
			'grandMA (onPC)',
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
		title: 'Stage & Custom Builds',
		description: 'From stage concept to fully self-built rolling systems.',
		items: [
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
	'Theaters',
	'Clubs & Raves',
	'Open Airs & Festivals',
	'Corporate Events',
	'Fairs & Conferences (Messen & Tagungen)',
	'Cinema & Special Events',
	'Private Parties',
	'Demos & Custom Builds'
];
