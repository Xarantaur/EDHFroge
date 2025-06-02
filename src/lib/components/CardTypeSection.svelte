<script lang="ts">
    import type { DeckCard } from "$lib/types/cards";
	import CardHoverTrigger from "./CardHoverTrigger.svelte";
    import { getLegalityClass } from "$lib/utils/cardLegality";
    import { groupCardsByType } from "$lib/utils/groupCardsByType";

    export let deck: DeckCard[] = []
    export let onRemove: (card: DeckCard) => void;
    export let commander: DeckCard | undefined = undefined

    $: groupedCards = groupCardsByType(deck)
</script>

{#snippet removeButton(onClick: () => void)}

<button
type="button"
on:click={onClick}
class="w-4 h-4 flex items-center justify-center text-sm font-bold text-gray-500 hover:text-red-600 border border-gray-300 rounded-full hover:border-red-500 transition"
>
&minus;
</button> 
{/snippet}
 
<div style="width: 70vw; height: 60vh; padding: 1rem; border: 1px solid #aaa">
    <div style="height: 100%; column-width: 200px; column-gap: 2rem">
        {#each Object.entries(groupedCards) as [type, cards]}
        <div style="break-inside: avoid; margin-bottom: 1rem">
            <h2 class="font-bold">{type} ({cards.length})</h2>
            <ul>
                {#each cards as card}
                <li class="flex gap-2 text-xs ">
                    <CardHoverTrigger card ={card} className={getLegalityClass(card, commander)}/>
                    {@render removeButton(() => onRemove(card)) }
                </li>
                {/each}
            </ul>
        </div>
        {/each}
    </div>
</div>