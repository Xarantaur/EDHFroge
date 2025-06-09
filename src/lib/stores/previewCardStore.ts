import { writable } from 'svelte/store';
import type { ParsedDeckCard } from '$lib/types/parsedDeckCard';

export const previewCard = writable<{
	card: ParsedDeckCard;
	commander: ParsedDeckCard | null;
} | null>(null);
