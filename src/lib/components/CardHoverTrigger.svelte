<script lang="ts">
import { previewCard } from '$lib/stores/previewCardStore';
import type { DeckCard } from '$lib/types/cards'

export let card: DeckCard;
export let commander: DeckCard | null = null;
export let className: string = '';
</script>

<span
	class={`relative inline-block group text-gray-800 font-medium cursor-pointer ${className}`}
	on:mouseenter={() => previewCard.set({card, commander})}
	on:mouseleave={() => previewCard.set(null)}
	aria-hidden=true
>
 {card.cardName}
</span>