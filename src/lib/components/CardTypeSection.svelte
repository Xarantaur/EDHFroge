<script lang="ts">
    import type { DeckCard } from "$lib/types/cards";
	import CardHoverTrigger from "./CardHoverTrigger.svelte";
	import RemoveDeckCardButton from "./RemoveDeckCardButton.svelte";

    export let title: string;
    export let deck: DeckCard[] = []
    export let onRemove: (card: DeckCard) => void;

</script>

<section class="mb-6">
    <h2 class="text-xl font-bold mb-2">{title}'s ({deck.length})</h2>
    <ul class="space-y-2">
        {#each deck as card}
        <div class="flex space-x-2">
            <CardHoverTrigger card={card} /> <RemoveDeckCardButton onClick={() => onRemove(card)}/> 
        </div>
        {/each}
    </ul>
</section>