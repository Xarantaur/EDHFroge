import type { DeckCard } from '$lib/types/cards'
import { writable } from 'svelte/store'

export const previewCard = writable<{
    card: DeckCard; 
    commander: DeckCard | null;
} | null>(null)