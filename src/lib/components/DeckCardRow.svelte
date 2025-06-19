<script lang="ts">
    import type { ParsedDeckCard } from "$lib/types/parsedDeckCard"
    import CardHoverTrigger from "./CardHoverTrigger.svelte";
    import { getLegalityClass } from "$lib/utils/cardLegality";

    export let card: ParsedDeckCard
    export let commander: ParsedDeckCard | null = null
    export let removeCard: () => void;
    export let addCard: () => void;
</script>

{#snippet removeButton(onClick: () => void)}
    <button
        type="button"
        on:click={onClick}
        class="w-4 h-4 flex items-center justify-center text-sm font-bold text-gray-500 hover:text-red-600 border border-gray-300 rounded-full hover:border-red-500 transition cursor-pointer"
        >
        &minus;
    </button> 
{/snippet}

{#snippet addButton(onClick: () => void)}
    <button
        type="button"
        on:click={onClick}
        class="w-4 h-4 flex items-center justify-center text-sm font-bold text-gray-500 hover:text-green-600 border border-gray-300 rounded-full hover:border-green-500 transition cursor-pointer"
        >
        &plus;
    </button> 
{/snippet}

<div class="flex items-center justify-between w-full">
<li class="flex items-center justify-between gap-2 text-xs border-b border-transparent hover:text-orange-500 hover:border-orange-400">
    <CardHoverTrigger
        {card}
        {commander}
        className={getLegalityClass(card, commander ?? undefined)}
    />
</li>
<div class="flex gap-2 text-xs">
    {#if card.card.price}
        <span class="px-2 text-gray-500">{card.card.price}£</span>
        {/if}
        {#if card.card.quantity && card.card.quantity > 1}
			<span>x{card.card.quantity}</span>
		{/if}
        {#if card.card.typeLine.includes('Basic Land') || card.card.typeLine.includes('Basic Snow Land')} 
            {@render addButton(addCard)}
        {/if}
	    {@render removeButton(removeCard)}
    
</div>
</div>