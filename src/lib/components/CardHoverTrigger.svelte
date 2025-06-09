<script lang="ts">
import { previewCard } from '$lib/stores/previewCardStore';
import type { ParsedDeckCard } from '$lib/types/parsedDeckCard';

export let card: ParsedDeckCard;
export let commander: ParsedDeckCard | null = null;
export let className: string = '';
</script>

<span
	class={`relative inline-block group text-gray-800 font-medium cursor-pointer ${className}`}
	on:mouseenter={() => previewCard.set({card, commander})}
	on:mouseleave={() => previewCard.set(null)}
	aria-hidden=true
>
 {card.card.cardName}
</span>