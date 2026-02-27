export type SkillGroup = {
	title: string;
	description: string;
	items: SkillItem[];
};

export type SkillItem = {
	name: string;
	featured?: true;
	description?: string;
};

export const skillGroups: SkillGroup[] = [
	{
		title: 'Cloud Native & Microservices',
		description:
			'Cloud-native software engineering with production-ready microservices, resilient APIs and scalable infrastructure patterns. Targeting High Availability using Kuberntes.',
		items: [
			{
				name: 'Cloud Native',
				featured: true,
				description:
					'Designs and ships cloud-native systems built for high availability, rapid iteration and reliable production operations.'
			},
			{
				name: 'Microservices',
				featured: true,
				description:
					'Builds service-oriented backend platforms with clear domain boundaries, event-driven communication and operational resilience.'
			},
			{ name: 'Docker' },
			{ name: 'Kubernetes', featured: true },
			{ name: 'AWS' },
			{ name: 'Networking / Ingress / Routing' },
			{ name: 'Cloudflare Workers', featured: true },
			{ name: 'Cloudflare KV' },
			{ name: 'Cloudflare WAF' },
			{ name: 'Cloudflare One / Zero Trust' },
			{ name: 'Temporal.io Workflow Orchestration', featured: true }
		]
	},
	{
		title: 'Programming Languages',
		description:
			'Polyglot backend and frontend development with strong expertise in TypeScript, Go and JavaScript.',
		items: [
			{
				name: 'TypeScript',
				featured: true,
				description:
					'Expert-level TypeScript for scalable web applications, API platforms and long-term maintainable codebases.'
			},
			{
				name: 'Go',
				featured: true,
				description:
					'Expert in Go for high-performance backend services, concurrent workers and infrastructure-focused tooling.'
			},
			{ name: 'Node.js', featured: true },
			{ name: 'JavaScript' },
			{ name: 'Rust', featured: true },
			{ name: 'Java' },
			{ name: 'C' },
			{ name: 'x86 Assembler' },
			{ name: 'Python (currently ramping up)' },
			{ name: 'C++ (currently ramping up)' },
			{ name: 'Regex' }
		]
	},
	{
		title: 'Frameworks, APIs & Integrations',
		description:
			'Full-stack product development with modern frontend frameworks, robust backend frameworks and platform integrations.',
		items: [
			{ name: 'Express' },
			{ name: 'Discord API', featured: true },
			{ name: 'Meta API' },
			{ name: 'Twitch API' },
			{ name: 'Google APIs' },
			{ name: 'YouTube APIs' },
			{ name: 'Payment Integrations (Paddle, Stripe)', featured: true },
			{ name: 'React', featured: true },
			{ name: 'Svelte / SvelteKit', featured: true },
			{ name: 'CSS / Sass' },
			{ name: 'Tailwind / Bootstrap' }
		]
	},
	{
		title: 'Data, Messaging & Observability',
		description:
			'Data-intensive systems with reliable persistence, asynchronous messaging and deep observability for production operations.',
		items: [
			{ name: 'MongoDB', featured: true },
			{ name: 'PostgreSQL', featured: true },
			{ name: 'InfluxDB' },
			{ name: 'Redis', featured: true },
			{ name: 'Kafka' },
			{ name: 'RabbitMQ' },
			{ name: 'MQTT' },
			{ name: 'Grafana' },
			{ name: 'Prometheus' },
			{ name: 'VictoriaMetrics' }
		]
	},
	{
		title: 'Delivery, Security & Compliance',
		description:
			'Production delivery pipelines with strong software quality standards, security posture and privacy/compliance awareness.',
		items: [
			{ name: 'Git', featured: true },
			{ name: 'CI/CD', featured: true },
			{ name: 'GitHub Actions' },
			{ name: 'Build & Release Pipelines' },
			{ name: 'GDPR / DSGVO / Compliance', featured: true },
			{ name: 'ISO 27001 Familiarity' }
		]
	}
];
