import type { Project, ProjectsMode } from './types';

export type GradientPreset = {
	className: string;
	background: string;
};

export const DEV_GRADIENT_CLASSES: readonly GradientPreset[] = [
	{
		className: 'bg-gradient-to-r from-red-400 via-fuchsia-500 to-violet-400',
		background:
			'linear-gradient(100deg, rgba(248,113,113,1) 0%, rgba(217,70,239,1) 55%, rgba(167,139,250,1) 100%)'
	},
	{
		className: 'bg-gradient-to-r from-violet-400 via-purple-400 to-cyan-400',
		background:
			'linear-gradient(100deg, rgba(167,139,250,1) 0%, rgba(192,132,252,1) 52%, rgba(34,211,238,1) 100%)'
	},
	{
		className: 'bg-gradient-to-r from-rose-400 via-violet-500 to-cyan-300',
		background:
			'linear-gradient(100deg, rgba(251,113,133,1) 0%, rgba(139,92,246,1) 50%, rgba(103,232,249,1) 100%)'
	},
	{
		className: 'bg-gradient-to-r from-orange-400 via-red-500 to-violet-500',
		background:
			'linear-gradient(100deg, rgba(251,146,60,1) 0%, rgba(239,68,68,1) 48%, rgba(139,92,246,1) 100%)'
	},
	{
		className: 'bg-gradient-to-r from-red-500 via-orange-400 to-violet-400',
		background:
			'linear-gradient(100deg, rgba(239,68,68,1) 0%, rgba(251,146,60,1) 45%, rgba(167,139,250,1) 100%)'
	},
	{
		className: 'bg-gradient-to-r from-orange-300 via-fuchsia-500 to-cyan-400',
		background:
			'linear-gradient(100deg, rgba(253,186,116,1) 0%, rgba(217,70,239,1) 56%, rgba(34,211,238,1) 100%)'
	},
	{
		className: 'bg-gradient-to-r from-red-400 via-purple-500 to-cyan-300',
		background:
			'linear-gradient(100deg, rgba(248,113,113,1) 0%, rgba(168,85,247,1) 52%, rgba(103,232,249,1) 100%)'
	}
] as const;

export const EVENT_GRADIENT_CLASSES: readonly GradientPreset[] = [
	{
		className: 'bg-gradient-to-r from-red-500 via-violet-500 to-cyan-400',
		background:
			'linear-gradient(100deg, rgba(239,68,68,1) 0%, rgba(139,92,246,1) 52%, rgba(34,211,238,1) 100%)'
	},
	{
		className: 'bg-gradient-to-r from-violet-500 via-fuchsia-400 to-cyan-300',
		background:
			'linear-gradient(100deg, rgba(139,92,246,1) 0%, rgba(232,121,249,1) 55%, rgba(103,232,249,1) 100%)'
	},
	{
		className: 'bg-gradient-to-r from-red-400 via-purple-500 to-cyan-400',
		background:
			'linear-gradient(100deg, rgba(248,113,113,1) 0%, rgba(168,85,247,1) 50%, rgba(34,211,238,1) 100%)'
	},
	{
		className: 'bg-gradient-to-r from-orange-400 via-red-500 to-violet-500',
		background:
			'linear-gradient(100deg, rgba(251,146,60,1) 0%, rgba(239,68,68,1) 48%, rgba(139,92,246,1) 100%)'
	},
	{
		className: 'bg-gradient-to-r from-red-500 via-orange-400 to-cyan-400',
		background:
			'linear-gradient(100deg, rgba(239,68,68,1) 0%, rgba(251,146,60,1) 46%, rgba(34,211,238,1) 100%)'
	},
	{
		className: 'bg-gradient-to-r from-orange-300 via-violet-500 to-cyan-300',
		background:
			'linear-gradient(100deg, rgba(253,186,116,1) 0%, rgba(139,92,246,1) 52%, rgba(103,232,249,1) 100%)'
	},
	{
		className: 'bg-gradient-to-r from-red-400 via-fuchsia-500 to-cyan-400',
		background:
			'linear-gradient(100deg, rgba(248,113,113,1) 0%, rgba(217,70,239,1) 55%, rgba(34,211,238,1) 100%)'
	}
] as const;

export function gradientsForMode(mode: ProjectsMode): readonly GradientPreset[] {
	return mode === 'dev' ? DEV_GRADIENT_CLASSES : EVENT_GRADIENT_CLASSES;
}

type ProjectColorConfig = Pick<Project, 'color' | 'gradient'>;

function softColorStop(color: string): string {
	const shortHexMatch = color.match(/^#([\da-fA-F]{3})$/);
	if (shortHexMatch) {
		const [redHex, greenHex, blueHex] = shortHexMatch[1]
			.split('')
			.map((channel) => `${channel}${channel}`);
		const red = Number.parseInt(redHex, 16);
		const green = Number.parseInt(greenHex, 16);
		const blue = Number.parseInt(blueHex, 16);
		const mixedRed = Math.round(red * 0.72 + 12 * 0.28);
		const mixedGreen = Math.round(green * 0.72 + 15 * 0.28);
		const mixedBlue = Math.round(blue * 0.72 + 20 * 0.28);
		return `rgb(${mixedRed}, ${mixedGreen}, ${mixedBlue})`;
	}

	const longHexMatch = color.match(/^#([\da-fA-F]{6})$/);
	if (longHexMatch) {
		const hex = longHexMatch[1];
		const red = Number.parseInt(hex.slice(0, 2), 16);
		const green = Number.parseInt(hex.slice(2, 4), 16);
		const blue = Number.parseInt(hex.slice(4, 6), 16);
		const mixedRed = Math.round(red * 0.72 + 12 * 0.28);
		const mixedGreen = Math.round(green * 0.72 + 15 * 0.28);
		const mixedBlue = Math.round(blue * 0.72 + 20 * 0.28);
		return `rgb(${mixedRed}, ${mixedGreen}, ${mixedBlue})`;
	}

	return `color-mix(in srgb, ${color} 72%, rgb(12, 15, 20) 28%)`;
}

export function projectHasSolidColor(project?: ProjectColorConfig): boolean {
	return Boolean(project?.color && !project?.gradient);
}

export function projectGradientValue(project?: ProjectColorConfig): string | null {
	if (!project) return null;
	if (project.gradient) return project.gradient;
	if (project.color) return `linear-gradient(100deg, ${project.color} 0%, ${project.color} 100%)`;
	return null;
}

export function projectGradientTextStyle(project?: ProjectColorConfig): string {
	if (!project) return '';
	if (projectHasSolidColor(project) && project.color) return `color: ${project.color};`;
	const gradient = projectGradientValue(project);
	return gradient ? `background-image: ${gradient};` : '';
}

export function gradientClassFor(
	index: number,
	assignedGradients: GradientPreset[],
	mode: ProjectsMode,
	project?: ProjectColorConfig
): string {
	if (mode === 'dev' && projectGradientValue(project)) return '';
	const assigned = assignedGradients[index];
	if (assigned) return assigned.className;
	const gradients = gradientsForMode(mode);
	return gradients[index % gradients.length].className;
}

export function gradientBackgroundFor(
	index: number,
	assignedGradients: GradientPreset[],
	mode: ProjectsMode,
	project?: ProjectColorConfig
): string {
	if (mode === 'dev') {
		if (project?.color) {
			return `linear-gradient(135deg, ${softColorStop(project.color)} 0%, rgb(12, 15, 20) 100%)`;
		}

		if (project?.gradient) {
			return project.gradient;
		}
	}

	const assigned = assignedGradients[index];
	if (assigned) return assigned.background;
	const gradients = gradientsForMode(mode);
	return gradients[index % gradients.length].background;
}

export function assignRandomGradientsForProjects(
	projectCount: number,
	mode: ProjectsMode
): GradientPreset[] {
	const gradients = [...gradientsForMode(mode)];
	const assignments: GradientPreset[] = [];

	for (let index = 0; index < projectCount; index += 1) {
		if (gradients.length === 0) {
			gradients.push(...gradientsForMode(mode));
		}

		const randomIndex = Math.floor(Math.random() * gradients.length);
		const [selected] = gradients.splice(randomIndex, 1);
		if (selected) assignments.push(selected);
	}

	return assignments;
}

export function sectionTitleClass(
	mode: ProjectsMode,
	sectionTitleGradientClass: string,
	project?: ProjectColorConfig
): string {
	if (mode === 'dev' && projectHasSolidColor(project)) {
		return 'text-5xl font-black tracking-[-0.04em] uppercase sm:text-6xl lg:text-7xl xl:text-8xl';
	}

	return mode === 'dev'
		? `bg-clip-text text-5xl font-black tracking-[-0.04em] text-transparent uppercase ${sectionTitleGradientClass} sm:text-6xl lg:text-7xl xl:text-8xl`
		: 'text-5xl font-black tracking-[-0.04em] text-mist-100 uppercase sm:text-6xl lg:text-7xl xl:text-8xl';
}

export function projectMetaClass(mode: ProjectsMode): string {
	return mode === 'dev'
		? 'text-xs font-bold tracking-[0.18em] text-mist-100/85 uppercase'
		: 'text-xs font-light tracking-[0.2em] text-mist-100/60 uppercase';
}

export function projectTitleClass(mode: ProjectsMode, project?: ProjectColorConfig): string {
	if (mode === 'dev' && projectHasSolidColor(project)) {
		return 'mt-4 text-4xl font-black tracking-[-0.02em] uppercase sm:text-5xl lg:text-6xl';
	}

	return mode === 'dev'
		? 'mt-4 bg-clip-text text-4xl font-black tracking-[-0.02em] text-transparent uppercase sm:text-5xl lg:text-6xl'
		: 'mt-4 text-4xl font-black tracking-[-0.02em] text-mist-100 uppercase sm:text-5xl lg:text-6xl';
}

export function techTagClass(mode: ProjectsMode): string {
	return mode === 'dev'
		? 'rounded-md border border-electric-400/45 px-2.5 py-1 text-xs font-semibold bg-electric-500/24 text-electric-100'
		: 'rounded-sm border border-orange-400/75 bg-anthracite-800/90 px-3 py-1 text-[11px] font-light tracking-[0.11em] text-mist-100/58 uppercase ring-1 ring-orange-400/25';
}
