<script lang="ts">
    import type { DeckCard } from "$lib/types/cards";
	import CardHoverTrigger from "./CardHoverTrigger.svelte";
    import { getCardClassName } from "$lib/utils/colorIdentityRule";

    export let title: string;
    export let deck: DeckCard[] = []
    export let onRemove: (card: DeckCard) => void;
    export let commander: DeckCard | undefined = undefined

</script>

{#snippet removeButton(onClick: () => void)}
<button
type="button"
on:click={onClick}
class="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-500 hover:text-red-600 border border-gray-300 rounded-full hover:border-red-500 transition"
>
&minus;
</button> 
{/snippet}
 
<section class="mb-6">
<h2 class="text-xl font-bold mb-2">{title}'s ({deck.length})</h2>
    <ul class="space-y-2">
        {#each deck as card}
        <div class="flex space-x-2">
            <CardHoverTrigger card={card} className={getCardClassName(card, commander)} /> 
            {@render removeButton(() => onRemove(card))}
        </div>
        {/each}
    </ul>
</section>