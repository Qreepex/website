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


// ── Capability showcase ("I can do ...") ───────────────────────────────────

export type EventCapabilityAccent = 'multicolor' | 'loud' | 'bright' | 'boom';

/**
 * How the showcase images for a section are arranged.
 * - `grid`    classic 2x2 mosaic
 * - `fan`     cards fanned out, spread and stacked behind each other
 * - `strip`   tall vertical frames side by side, like light columns
 * - `scatter` loose tilted collage, all photos on the table
 */
export type EventCapabilityLayout = 'grid' | 'fan' | 'strip' | 'scatter';

export type EventCapabilityImage = {
	url: string;
	alt: string;
	caption: string;
	/** CSS object-position for the tile crop, e.g. '50% 30%'. */
	focus?: string;
};

export type EventCapabilitySection = {
	id: string;
	slug: string;
	/** Small label above the catch phrase, e.g. "01 · Light". */
	eyebrow: string;
	/** The word after "I can do". */
	keyword: string;
	accent: EventCapabilityAccent;
	/** Arrangement of the showcase images. */
	layout: EventCapabilityLayout;
	body: string[];
	tools: string[];
	toolsLabel: string;
	/** Short "where I did this" line under the tool list. */
	credits: string;
	images: EventCapabilityImage[];
};

export const eventCapabilitySections: EventCapabilitySection[] = [
	{
		id: 'colorful',
		slug: 'event-showcase-colorful',
		eyebrow: '01 · Light',
		keyword: 'Colorful',
		accent: 'multicolor',
		layout: 'grid',
		body: [
			'Sound is nice, but proper lighting is what makes a space feel alive. I design the looks for clubs, open airs and corporate stages on grandMA, build them cue by cue and keep them buskable for the moment the DJ ignores the plan.',
			'From a single wash on a vocalist to a colour-chasing rig on a festival main stage: the palette, the timing and the blackout are mine to own.'
		],
		toolsLabel: 'Light design & control',
		tools: [
			'grandMA2 / grandMA3',
			'Light Design',
			'Timecode & Show Control',
			'ArtNet & Show Networking',
			'Haze & Atmospheric Looks',
			'Light Design & Show Programming'
		],
		credits: 'Große Freiheit 36 · Docks · Scheunenfeten · Schlagermove · corporate stages',
		images: [
			{
				url: '/event-showcase/pics/own/2026-scheunenfest-steinhorst/73A04943.jpg',
				alt: 'Purple and yellow light beams over a dancing crowd at Scheunenfest Steinhorst',
				caption: 'Scheunenfest Steinhorst · 2026',
				focus: '50% 45%'
			},
			{
				url: '/event-showcase/pics/own/2025-gf-36.webp',
				alt: 'Blue and yellow light beams over the crowd at Große Freiheit 36 in Hamburg',
				caption: 'Große Freiheit 36 · 2025',
				focus: '42% 40%'
			},
			{
				url: '/event-showcase/pics/own/klinkrade/73A05031.jpg',
				alt: 'Crowd lit by bright linear fixtures and blue beams at Peins Gasthof Klinkrade',
				caption: 'Peins Gasthof Klinkrade · 2026',
				focus: '50% 55%'
			},
			{
				url: '/event-showcase/pics/own/2025-woderkant-kiel.webp',
				alt: 'DJ on a brightly lit stage with colourful beams at Woderkant during Kieler Woche',
				caption: 'Woderkant, Kieler Woche · 2025',
				focus: '55% 38%'
			}
		]
	},
	{
		id: 'loud',
		slug: 'event-showcase-loud',
		eyebrow: '02 · Sound',
		keyword: 'Loud',
		accent: 'loud',
		layout: 'fan',
		body: [
			'Sound is the one thing nobody forgives: if it is harsh at the front, the night is over before the first drop. I mix FOH on L-Acoustics systems, tune the array to the room and keep the low end honest without turning the dancefloor into a paint shaker.',
			'Club nights, festival main stages or a corporate keynote - the desk is where I am most at home, and the difference between a PA that is loud and a PA that feels loud is 90% tuning.'
		],
		toolsLabel: 'Systems, desks & tuning',
		tools: [
			'L-Acoustics System',
			'Midas & Yamaha Consoles',
			'System Tuning, FOH & Monitor Mix'
		],
		credits: 'Große Freiheit 36 · Docks · Prüf Demos · Kieler Woche · Schlagermove',
		images: [
			{
				url: '/event-showcase/pics/own/2025-trecker-treck-hohenhorn-foh.webp',
				alt: 'FOH position with lighting and sound consoles overlooking the stage at Trecker Treck Hohenhorn',
				caption: 'FOH · Trecker Treck Hohenhorn',
				focus: '50% 62%'
			},
			{
				url: '/event-showcase/pics/own/2025-firmenevent.webp',
				alt: 'Corporate stage set up with drums, guitars and lighting in front of a large window',
				caption: 'Corporate Stage · 2025',
				focus: '42% 55%'
			},
			{
				url: '/event-showcase/pics/worked/2025-steinhorst-scheuenfest-special-d.webp',
				alt: 'DJ with his arm raised in front of a large crowd at Scheunenfest Steinhorst',
				caption: 'Special D · Steinhorst 2025',
				focus: '48% 42%'
			},
			{
				url: '/event-showcase/pics/worked/2026-schlagermove.jpeg',
				alt: 'Festival stage and large crowd at Schlagermove in golden evening light',
				caption: 'Schlagermove · 2026',
				focus: '50% 48%'
			}
		]
	},
	{
		id: 'bright',
		slug: 'event-showcase-bright',
		eyebrow: '03 · Laser',
		keyword: 'Bright',
		accent: 'bright',
		layout: 'strip',
		body: [
			'Lasers are the one effect you cannot improvise: every beam is geometry, every scan is a risk assessment. I program aerial shows in Pangolin BEYOND, keep them inside the MPE limits and handle the paperwork that lets a promoter sleep at night.',
			'Bright, sharp and legal - that is the whole trick. And as a licensed Laser Safety Officer I am allowed to sign off the crowd-scanning setups other people politely decline.'
		],
		toolsLabel: 'Laser & licenses',
		tools: [
			'Pangolin BEYOND',
			'Laser Show Programming & Timecode',
			'Licensed Laser Safety Officer (OStrV / TROS / DGUV)',
			'Audience Scanning & Safety Assessments',
			'Beam Tables & Rig Planning',
		],
		credits:
			'Peins Gasthof Klinkrade · Steinhorst Open Air · Gängeviertel · Trecker Treck',
		images: [
			{
				url: '/event-showcase/pics/own/klinkrade/73A06333.jpg',
				alt: 'Red and blue laser beams radiating from the rig over the dancefloor at Peins Gasthof Klinkrade',
				caption: 'Peins Gasthof Klinkrade · 2026',
				focus: '50% 45%'
			},
			{
				url: '/event-showcase/pics/own/2026-scheunenfest-steinhorst/73A04873.jpg',
				alt: 'Intense green laser beams over the crowd at Scheunenfest Steinhorst',
				caption: 'Scheunenfest Steinhorst · 2026',
				focus: '50% 48%'
			},
			{
				url: '/event-showcase/pics/worked/2024-xmas-klinkrade-2.webp',
				alt: 'Green laser beams fanning out from a central rig in a dark room',
				caption: 'Peins Gasthof Klinkrade · 2024',
				focus: '50% 45%'
			},
			{
				url: '/event-showcase/pics/own/2026-maifeuerfete-fehmarn/73A08144.jpg',
				alt: 'Blue laser beams projecting over the crowd at Maifeuerfete Fehmarn',
				caption: 'Maifeuerfete Fehmarn · 2026',
				focus: '50% 50%'
			}
		]
	},
	{
		id: 'boom',
		slug: 'event-showcase-boom',
		eyebrow: '04 · SFX & Pyro',
		keyword: 'Boom',
		accent: 'boom',
		layout: 'scatter',
		body: [
			'Nothing lands a drop like a wall of CO2, a row of flame jets and sparks raining over the crowd on exactly the right frame. I rig the effects, wire them into the show and fire them on timecode so it hits on the beat - not two bars later.',
			'CO2, flames and spark effects, planned inside the safety distances, coordinated with the promoter and executed with the pyrotechnician on site.'
		],
		toolsLabel: 'Effects & show control',
		tools: [
			'CO2 Jets & Cryo Effects',
			'Flame Effects & Flame Jets',
			'Spark & Funken Effects',
			'Pyrotechnics Integration',
			'Show Timecode & Cueing',
			'Safety Distances, Permits & Briefings'
		],
		credits: 'Butterflies Open Air · Steinhorst Open Air · Scheunenfest Steinhorst · Stadtfest Oldenburg',
		images: [
			{
				url: '/event-showcase/pics/own/Soa2026%2008172.jpeg',
				alt: 'Massive fire plumes and blue laser beams over the crowd at Steinhorst Open Air',
				caption: 'Steinhorst Open Air · 2026',
				focus: '50% 45%'
			},
			{
				url: '/event-showcase/pics/own/Soa2026%2007843.jpeg',
				alt: 'White pyrotechnic sparks erupting from the stage at Steinhorst Open Air',
				caption: 'Steinhorst Open Air · 2026',
				focus: '50% 40%'
			},
			{
				url: '/event-showcase/pics/own/2025-butterflies-stadtpark-pyro.webp',
				alt: 'Flamejets and CO2 effects erupting from the stage at Butterflies Stadtpark Open Air',
				caption: 'Butterflies Stadtpark · 2025',
				focus: '50% 50%'
			},
			{
				url: '/event-showcase/pics/own/Soa2026%2008265.jpeg',
				alt: 'Confetti blast over the crowd at Steinhorst Open Air',
				caption: 'Steinhorst Open Air · 2026',
				focus: '50% 40%'
			}
		]
	}
];

