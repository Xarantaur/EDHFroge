import type { DeckCard } from '$lib/types/cards'
import { writable } from 'svelte/store'

export const previewCard = writable<DeckCard | null>(null)