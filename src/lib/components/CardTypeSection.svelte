<script lang="ts">
    import type { ParsedDeckCard } from "$lib/types/parsedDeckCard";
	import CardHoverTrigger from "./CardHoverTrigger.svelte";
    import { getLegalityClass } from "$lib/utils/cardLegality";
    import { groupCardsByType } from "$lib/utils/groupCardsByType";
	


    export let deck: ParsedDeckCard[] = []
    export let onRemove: (card: ParsedDeckCard) => void;
    export let commander: ParsedDeckCard | null = null

    $: groupedCards = groupCardsByType(deck)
	
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
 
<div>
	<div class="sm:columns-1 md:columns-2 lg:columns-3 gap-8">
		{#each Object.entries(groupedCards) as [type, cards]}
			<ul class=" space-y-1 w-full max-w-full px-4">
				<li class="font-bold text-sm sm:text-base mb-1 sm:mb-2 border-b w-full">
					{type}s ({cards.length})
				</li>
			

				{#each cards as card}
				
					<li class="flex items-center justify-between gap-2 text-xs border-b border-transparent hover:text-orange-500 hover:border-orange-400">
						<CardHoverTrigger card={card} commander={commander} className={getLegalityClass(card, commander ?? undefined)} /> 
						<div class="flex gap-2">
						{#if card.card.price}
								<span class="text-gray-500">{card.card.price}£</span>
							{/if}
						{#if card.card.quantity && card.card.quantity > 1}
							<span class="">x{card.card.quantity}</span>
						{/if}
						{@render removeButton(() => onRemove(card))}
					</div>
				    </li>
				
				{/each}
			</ul>
		{/each}

	</div>
</div>
