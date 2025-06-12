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
	<div class="flex flex-wrap gap-6">
		{#each Object.entries(groupedCards) as [type, cards]}
			<ul class="w-full sm:basis-[45%] md:basis-[30%] lg:basis-[200px] space-y-1">
				<li class="font-bold text-sm sm:text-base mb-1 sm:mb-2 border-b w-full">
					{type}s ({cards.length})
				</li>
			

				{#each cards as card}
				
					<li class="flex items-center justify-between gap-2 text-xs border-b border-transparent hover:text-orange-500 hover:border-orange-400">
						<CardHoverTrigger card={card} commander={commander} className={getLegalityClass(card, commander ?? undefined)} /> 
						{#if card.card.price}
								<spanb class="text-gray-500">{card.card.price}£</spanb>
							{/if}
						{#if card.card.quantity && card.card.quantity > 1}
							<span class="">x{card.card.quantity}</span>
						{/if}
						{@render removeButton(() => onRemove(card))}
				    </li>
				
				{/each}
			</ul>
		{/each}

	</div>
</div>
