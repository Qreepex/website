import { browser } from '$app/environment';
import { writable } from 'svelte/store';

const KEY = 'fx-disabled';

const initial = browser
	? (() => {
		const saved = localStorage.getItem(KEY);
		if (saved !== null) return saved === 'true';

		return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	})()
	: false;
const { subscribe, update, set } = writable<boolean>(initial);

export const fxDisabled = {
	subscribe,

	toggle() {
		update((v) => {
			const next = !v;
			if (browser) localStorage.setItem(KEY, String(next));
			return next;
		});
	},

	/** Imperatively set the value (e.g. from page-level effects). */
	setValue(val: boolean) {
		if (browser) localStorage.setItem(KEY, String(val));
		set(val);
	}
};
