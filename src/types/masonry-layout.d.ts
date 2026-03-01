declare module 'masonry-layout' {
	export type MasonryOptions = {
		itemSelector?: string;
		columnWidth?: string | number | Element;
		gutter?: string | number | Element;
		percentPosition?: boolean;
		horizontalOrder?: boolean;
		transitionDuration?: string | number;
	};

	export default class Masonry {
		constructor(element: Element, options?: MasonryOptions);
		layout(): void;
		destroy(): void;
	}
}
