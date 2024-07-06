import { writable } from 'svelte/store';

export const personsArray = writable([]);

export const userAnschlaege = writable([]);

export const currentUser = writable();

export const orderedAnschlaege = writable();