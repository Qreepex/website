export enum EventInvolvement {
	MY_JOB = 'my_job',
	WORKED_ON = 'worked_on'
}

export type EventMedia = {
	name?: string; // The specific title/artist shown on the card
	url: string;
	type: 'image' | 'video';
	photographer?: {
		name: string;
		url?: string;
	}[];
	fill?: boolean;
	title?: string;
};

export type EventShowcase = {
	id: string;
	name: string;
	year: string | number;
	location: string;
	involvement: EventInvolvement;
	showfile: boolean;
	lasers: boolean;
	lights: boolean;
	sound: boolean;
	tags: string[];
	eventPageUrl?: string;
	media: EventMedia[];
	sortIndex?: number; // Optional field for manual sorting
};

export const eventShowcaseData: EventShowcase[] = [
	{
		id: 'butterflies-open-air-2025',
		name: 'Butterflies Open Air',
		year: 2025,
		location: 'Hamburg Stadtpark',
		involvement: EventInvolvement.MY_JOB,
		showfile: true,
		lasers: false,
		lights: true,
		sound: false,
		eventPageUrl: 'https://instagram.com/butterfliesevents',
		sortIndex: 1,
		tags: ['pyro', 'stadtpark', 'festival', 'drone', 'open-air'],
		media: [
			{
				name: 'Butterflies Pyro',
				url: '/event-showcase/pics/own/2025-butterflies-stadtpark-pyro.webp',
				type: 'image',
				fill: true
			},
			{
				url: '/event-showcase/vids/own/2025-butterflies-stadtpark-stage-1.webm',
				type: 'video'
			},
			{
				name: 'Drone Perspective 1',
				url: '/event-showcase/vids/own/2025-butterflies-stadtpark-drohne1.webm',
				type: 'video'
			},
			{
				name: 'Drone Perspective 2',
				url: '/event-showcase/vids/own/2025-butterflies-stadtpark-drohne-2.webm',
				type: 'video'
			},
			{
				name: 'Stadtpark Wide',
				url: '/event-showcase/vids/own/2025-butterflies-stadtpark-hamburg.webm',
				type: 'video'
			},

			{
				name: 'Stage Action 2',
				url: '/event-showcase/vids/own/2025-butterflies-stadtpark-stage-2.webm',
				type: 'video'
			},
			{
				name: 'Stage Action 3',
				url: '/event-showcase/vids/own/2025-butterflies-stadtpark-stage-3.webm',
				type: 'video'
			}
		]
	},
	{
		id: 'ely-oaks-traum-gmbh-2025',
		name: 'Ely Oaks @ Traum GmbH Kiel',
		year: 2025,
		location: 'Kiel',
		involvement: EventInvolvement.MY_JOB,
		showfile: true,
		lasers: false,
		sortIndex: 2,
		lights: true,
		sound: false,
		tags: ['co2', 'live', 'ely-oaks', 'DJ'],
		media: [
			{ url: '/event-showcase/vids/own/2025-ely-oaks-traum-kiel.webm', type: 'video' },
			{
				url: '/event-showcase/pics/own/2025-ely-oaks-mai-traum-gmbh-kiel.webp',
				type: 'image',
				fill: true
			},
			{ url: '/event-showcase/vids/own/2025-ely-oaks-traumgmbh.webm', type: 'video' },
			{ url: '/event-showcase/vids/own/2025-ely-oaks-traum-gmbh-1.webm', type: 'video' },
			{ url: '/event-showcase/vids/own/2025-ely-oaks-traum-gmbh-kiel.webm', type: 'video' },
			{ url: '/event-showcase/vids/own/2025-ely-oaks-traum-gmbh.webm', type: 'video' },
			{
				url: '/event-showcase/pics/own/2025-ely-oaks-foh-traum-gmbh-kiel.webp',
				type: 'image'
			}
		]
	},
	{
		id: 'fantasm-docks-2024',
		name: 'Fantasm @ Docks',
		year: 2024,
		location: 'Hamburg',
		involvement: EventInvolvement.MY_JOB,
		showfile: false,
		lasers: true,
		eventPageUrl: 'https://instagram.com/docksprinzenbar',
		lights: true,
		sound: false,
		sortIndex: 3,
		tags: ['docks', 'fantasm', 'club'],
		media: [
			{
				name: 'Fantasm Performance',
				url: '/event-showcase/vids/own/2024-fantasm-docks.webm',
				type: 'video'
			}
		]
	},
	{
		id: 'butterflies-csa',
		name: 'Butterflies @ CSA',
		year: 2025,
		location: 'Hamburg',
		involvement: EventInvolvement.WORKED_ON,
		showfile: false,
		lights: false,
		lasers: false,
		sound: false,
		tags: ['butterflies', 'csa', 'open air'],
		media: [
			{
				url: '/event-showcase/vids/worked/2025-butterflies-csa.webm',
				type: 'video'
			}
		]
	},
	{
		id: 'sickmode-docks-2025',
		name: 'Sickmode / AR Gang @ Docks',
		year: 2025,
		location: 'Hamburg',
		involvement: EventInvolvement.MY_JOB,
		showfile: false,
		eventPageUrl: 'https://instagram.com/docksprinzenbar',
		lasers: false,
		lights: true,
		sortIndex: 10,
		sound: false,
		tags: ['sickmode', 'docks', 'club'],
		media: [
			{
				name: 'Sickmode Show 1',
				url: '/event-showcase/vids/own/2025-sickmode-docks-1.webm',
				type: 'video'
			},
			{
				name: 'Sickmode Show 2',
				url: '/event-showcase/vids/own/2025-sickmode-docks-2.webm',
				type: 'video'
			},
			{
				name: 'Sickmode Show 3',
				url: '/event-showcase/vids/own/2025-sickmode-docks-3.webm',
				type: 'video'
			},
			{
				name: 'Sickmode Show 4',
				url: '/event-showcase/vids/own/2025-sickmode-docks-4.webm',
				type: 'video'
			},
			{
				name: 'Sickmode Show 5',
				url: '/event-showcase/vids/own/2025-sickmode-docks-5.webm',
				type: 'video'
			},
			{
				name: 'Sickmode Show 6',
				url: '/event-showcase/vids/own/2025-sickmode-docks-6.webm',
				type: 'video'
			}
		]
	},
	{
		id: 'steinhorst-open-air',
		name: 'Steinhorst Open Air',
		year: '2024-2026',
		location: 'Germany',
		involvement: EventInvolvement.WORKED_ON,
		showfile: false,
		lasers: true,
		lights: true,
		sortIndex: 5,
		eventPageUrl: 'https://instagram.com/topdiscoshow',
		sound: false,
		tags: ['soa', '2 engel & charlie', 'le-shuuk', 'festival', 'lasers'],
		media: [
			{
				name: 'Engel Charlie',
				url: '/event-showcase/vids/worked/2024-soa-2-engel-charlie.webm',
				type: 'video',
				title: '2 Engel & Charlie @ Steinhorst Open Air 2024',
			},
			{
				name: 'Laser Show Highlight',
				url: '/event-showcase/vids/worked/2024-soa-lazers.webm',
				type: 'video'
			},
			{
				name: 'Le Shuuk Clip 1',
				url: '/event-showcase/vids/worked/2024-soa-le-shuuk-1.webm',
				type: 'video'
			},
			{
				name: 'Le Shuuk Clip 2',
				url: '/event-showcase/vids/worked/2024-soa-le-shuuk-2.webm',
				type: 'video',
				title: 'Le Shuuk @ Steinhorst Open Air 2024'
			},
			{
				name: 'Le Shuuk Clip 3',
				url: '/event-showcase/vids/worked/2024-soa-le-shuuk-3.webm',
				type: 'video',
				title: 'Le Shuuk @ Steinhorst Open Air 2024'
			},
			{
				name: 'Le Shuuk Main',
				url: '/event-showcase/vids/worked/2024-soa-le-shuuk.webm',
				type: 'video',
				title: 'Le Shuuk @ Steinhorst Open Air 2024'
			},
			{
				title: 'AXMO @ Steinhorst Open Air 2025',
				url: '/event-showcase/vids/worked/2025-soa-axmo.webm',
				type: 'video'
			},
			{
				name: 'SOA Fire Show',
				url: '/event-showcase/vids/worked/2025-soa-feuer.webm',
				type: 'video'
			}
		]
	},
	{
		id: 'trecker-treck-hohenhorn-2025',
		name: 'Trecker Treck Hohenhorn',
		year: '2024-2026',
		location: 'Hohenhorn',
		involvement: EventInvolvement.MY_JOB,
		showfile: true,
		eventPageUrl: 'https://pulling-party.de',
		sortIndex: 7,
		lasers: true,
		lights: true,
		sound: true,
		tags: ['trecker-treck', 'ballerndorf', 'foh', 'outdoor'],
		media: [
			{
				url: '/event-showcase/pics/own/2025-trecker-treck-hohenhorn-ballerndorf.webp',
				type: 'image'
			},
			{ url: '/event-showcase/pics/own/2025-trecker-treck-hohenhorn-foh.webp', type: 'image' }
		]
	},
	{
		id: 'grosse-freiheit-36-hamburg',
		name: 'XXL Party @ Große Freiheit 36',
		year: '2024-2025',
		location: 'Hamburg Reeperbahn',
		involvement: EventInvolvement.MY_JOB,
		showfile: false,
		lasers: true,
		lights: true,
		sortIndex: 3,
		eventPageUrl: 'https://instagram.com/grossefreiheit36.party',
		sound: false,
		tags: ['gf36', 'club', 'show'],
		media: [
			{ url: '/event-showcase/pics/own/2025-gf-36.webp', type: 'image' },
			{ url: '/event-showcase/vids/own/2024-gf-36-1.webm', type: 'video' },
			{ url: '/event-showcase/vids/own/2024-gf-36-2.webm', type: 'video' },
			{ url: '/event-showcase/vids/own/2024-gf-36-3.webm', type: 'video' }
		]
	},
	{
		id: 'oldenburg-2024',
		name: 'Oldenburg Stadtfest 2024',
		year: 2024,
		location: 'Oldenburg',
		involvement: EventInvolvement.MY_JOB,
		showfile: false,
		lasers: true,
		sortIndex: 7,
		lights: true,
		sound: false,
		tags: ['oldenburg', 'pyro', 'stage', 'outdoor'],
		media: [
			{ url: '/event-showcase/vids/own/2024-oldenburg-pyro.webm', type: 'video' },
			{ url: '/event-showcase/vids/own/2024-oldenburg-stage.webm', type: 'video' }
		]
	},
	{
		id: 'maifeuer-fehmarn-2025',
		name: 'Maifeuerfete Fehmarn',
		year: '2024-2026',
		location: 'Fehmarn',
		involvement: EventInvolvement.WORKED_ON,
		showfile: false,
		lasers: true,
		lights: true,
		sortIndex: 20,
		sound: true,
		tags: ['maifeuer', 'fehmarn'],
		media: [
			{
				url: '/event-showcase/pics/worked/2025-maifeuer-fehmarn.webp',
				type: 'image',
				fill: true
			},
			{ url: '/event-showcase/vids/worked/2025-maifeuer-fehmarn.webm', type: 'video' }
		]
	},
	{
		id: 'ff-allermoehe-2025',
		name: 'FF Allermoehe',
		year: 2025,
		location: 'Allermoehe',
		involvement: EventInvolvement.MY_JOB,
		showfile: false,
		sortIndex: 50,
		lasers: true,
		lights: true,
		sound: true,
		tags: ['indoor', 'fire department'],
		media: [
			{
				name: 'FF Allermoehe Clip 1',
				url: '/event-showcase/vids/own/2025-ff-allermoehe.webm',
				type: 'video'
			},
			{
				name: 'FF Allermoehe Clip 2',
				url: '/event-showcase/vids/own/2025-ff-allermoehe-2.webm',
				type: 'video'
			}
		]
	},
	{
		id: 'feldfest-2025',
		name: 'Feldfest',
		year: 2025,
		location: 'Germany',
		involvement: EventInvolvement.MY_JOB,
		showfile: true,
		lasers: false,
		lights: true,
		sound: true,
		sortIndex: 25,
		tags: ['feldfest', 'himmelfahrt', 'outdoor'],
		media: [
			{
				name: 'Feldfest Himmelfahrt',
				url: '/event-showcase/vids/own/2025-feldfest-himmelfahrt.webm',
				type: 'video'
			},
			{
				name: 'Feldfest Live',
				url: '/event-showcase/vids/own/2025-feldfest.webm',
				type: 'video'
			}
		]
	},
	{
		id: 'corporate-event-2025',
		name: 'Corporate Event',
		year: 2025,
		location: 'Hamburg',
		involvement: EventInvolvement.MY_JOB,
		showfile: true,
		lasers: false,
		lights: true,
		sortIndex: 10,
		sound: true,
		tags: ['corporate', 'indoor', 'astera'],
		media: [
			{
				name: 'Main Corporate Stage',
				url: '/event-showcase/pics/own/2025-firmenevent.webp',
				type: 'image'
			}
		]
	},
	{
		id: 'outdoor-trailer-stage-2025',
		name: 'Outdoor Trailer Stage',
		year: 2025,
		location: 'Germany',
		involvement: EventInvolvement.MY_JOB,
		showfile: true,
		lasers: false,
		lights: true,
		sortIndex: 20,
		sound: false,
		tags: ['trailer', 'production', 'setup'],
		media: [
			{
				name: 'Trailer Stage Setup',
				url: '/event-showcase/pics/own/2025-trailer.webp',
				type: 'image'
			}
		]
	},
	{
		id: 'treckerrennen-trittau-2025',
		name: 'Treckerrennen Trittau',
		year: 2025,
		location: 'Trittau',
		involvement: EventInvolvement.MY_JOB,
		showfile: true,
		lasers: true,
		sortIndex: 15,
		lights: true,
		sound: true,
		tags: ['treckerrennen', 'festival', 'outdoor'],
		media: [
			{
				name: 'Trittau Festival',
				url: '/event-showcase/pics/own/2025-treckerrennen-trittau.webp',
				type: 'image'
			}
		]
	},
	{
		id: 'woderkant-kiel-2025',
		name: 'Woderkant @ Kieler Woche',
		year: 2025,
		location: 'Kiel',
		involvement: EventInvolvement.MY_JOB,
		showfile: true,
		lasers: false,
		sortIndex: 5,
		lights: true,
		eventPageUrl: 'https://woderkant-festival.de',
		sound: false,
		tags: ['woderkant', 'kiel', 'kieler woche'],
		media: [
			{
				name: 'Woderkant Kieler Woche',
				url: '/event-showcase/pics/own/2025-woderkant-kiel.webp',
				type: 'image'
			}
		]
	},

	{
		id: 'schlagermove-2025',
		name: 'Schlagermove',
		year: 2025,
		location: 'Hamburg',
		involvement: EventInvolvement.MY_JOB,
		showfile: false,
		sortIndex: 15,
		eventPageUrl: 'https://schlagermove.de',
		lasers: false,
		lights: true,
		sound: true,
		tags: ['schlagermove', '#notmymusic'],
		media: [
			{
				name: 'Schlagermove Parade',
				url: '/event-showcase/vids/own/2025-schlagermove.webm',
				type: 'video'
			}
		]
	},
	{
		id: 'peins-gasthof-klinkrade-2026',
		name: 'Peins Gasthof Klinkrade',
		year: '2024-2026',
		location: 'Klinkrade',
		involvement: EventInvolvement.MY_JOB,
		showfile: true,
		sortIndex: 6,
		lasers: true,
		lights: true,
		sound: true,
		eventPageUrl: 'https://instagram.com/topdiscoshow',
		tags: ['klinkrade', 'pein', 'topdiscoshow'],
		media: [
			{
				name: 'Feb Show 2026',
				url: '/event-showcase/vids/own/2026-feb-klinkrade.webm',
				type: 'video'
			},
			{
				name: 'Xmas Special 2025',
				url: '/event-showcase/pics/own/2025-xmas-klinkrade.webp',
				type: 'image'
			},
			{
				name: 'Xmas Crew View 1 (2024)',
				url: '/event-showcase/pics/worked/2024-xmas-klinkrade-1.webp',
				type: 'image'
			},
			{
				name: 'Xmas Crew View 2 (2024)',
				url: '/event-showcase/pics/worked/2024-xmas-klinkrade-2.webp',
				type: 'image',
				fill: true
			}
		]
	},
	{
		id: 'scheune-steinhorst-2024',
		name: 'Scheunenfest Steinhorst',
		year: '2024-2026',
		location: 'Steinhorst',
		involvement: EventInvolvement.WORKED_ON,
		showfile: false,
		lasers: true,
		lights: true,
		sound: false,
		sortIndex: 30,
		tags: ['steinhorst', 'scheune', 'stage'],
		eventPageUrl: 'https://topdiscoshow.de',
		media: [
			{
				name: 'Scheune 2024 Video',
				url: '/event-showcase/vids/worked/2024-steinhorst-scheune.webm',
				type: 'video'
			},
			{
				name: 'Scheunenfest Sparks',
				url: '/event-showcase/pics/worked/2025-steinhorst-scheuenfest-sparks.webp',
				type: 'image'
			},
			{
				name: 'Special D (Mic)',
				url: '/event-showcase/pics/worked/2025-steinhorst-scheuenfest-special-d-mic.webp',
				type: 'image'
			},
			{
				name: 'Special D Performance',
				url: '/event-showcase/pics/worked/2025-steinhorst-scheuenfest-special-d.webp',
				type: 'image'
			},
			{
				name: 'Trio Live Band',
				url: '/event-showcase/pics/worked/2025-steinhorst-scheuenfest-trio.webp',
				type: 'image'
			},
			{
				name: 'Main Stage View',
				url: '/event-showcase/pics/worked/2025-steinhorst-scheuenfest.webp',
				type: 'image'
			}
		]
	},
	{
		id: 'filow-2025',
		name: 'Filow',
		year: 2025,
		location: 'Hamburg',
		involvement: EventInvolvement.WORKED_ON,
		showfile: false,
		lasers: false,
		sortIndex: 20,
		eventPageUrl: 'https://instagram.com/filow',
		lights: true,
		sound: false,
		tags: ['filow', 'club', 'show'],
		media: [
			{
				name: 'Filow @ 36',
				url: '/event-showcase/vids/worked/2025-filow-36.webm',
				type: 'video'
			}
		]
	}
];
