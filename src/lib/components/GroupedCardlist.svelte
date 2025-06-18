<script lang="ts">
    import type { ParsedDeckCard } from "$lib/types/parsedDeckCard";
    import DeckCardRow from './DeckCardRow.svelte'
   

   function sumUpBasiclands(cards:ParsedDeckCard[]) {
		const total = cards.reduce((sum, item) => sum + (item.card.quantity || 1), 0);
		return total
	}

    export let type: String;
    export let cards: ParsedDeckCard[];
    export let commander: ParsedDeckCard | null = null;
    export let onRemove: (card: ParsedDeckCard ) => void;

</script>

<ul class="space-y-1 w-full max-w-full px-4">
    <li class="font-bold text-sm sm:text-base mb-1 sm:mb-2 border-b w-full">
        {type}s {sumUpBasiclands(cards)}
    </li>
    {#each cards as card}
    <DeckCardRow
        {card}
        {commander}
        onRemove={() => onRemove(card)} 
    />
    {/each}
</ul>