<script lang="ts">
import { previewCard } from '$lib/stores/previewCardStore';
import type { DeckCard } from '$lib/types/cards'

export let card: DeckCard;
</script>

<span
	class="relative inline-block group text-gray-800 font-medium hover:text-orange-500 cursor-pointer"
	on:mouseenter={() => previewCard.set(card)}
	on:mouseleave={() => previewCard.set(null)}
	aria-hidden=true
>
 {card.name}
</span>