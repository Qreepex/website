export type Project = {
	title: string;
	domain: string;
	description: string;
	tech: string[];
	image: string;
	color?: string;
	gradient?: string;
	url?: string;
	former?: boolean;
};

export type SmallerProject = {
	title: string;
	domain: string;
	description: string;
	tech: string[];
	url?: string;
};

export type ProjectsMode = 'dev' | 'event';
