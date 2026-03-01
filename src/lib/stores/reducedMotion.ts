import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const KEY = 'fx-disabled';

const initial = browser ? localStorage.getItem(KEY) === 'true' : false;
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
