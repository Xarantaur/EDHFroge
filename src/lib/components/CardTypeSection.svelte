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
class="w-4 h-4 flex items-center justify-center text-sm font-bold text-gray-500 hover:text-red-600 border border-gray-300 rounded-full hover:border-red-500 transition cursor-pointer"
>
&minus;
</button> 
{/snippet}
 
<div>
	<div class="grid grid-flow-col auto-cols-[220px] gap-6">
		{#each Object.entries(groupedCards) as [type, cards]}
			<ul class="max-w-[900] break-inside-avoid space-y-1">
				<li class="font-bold text-sm mb-2 border-b">
					{type}s ({cards.length})
				</li>
			

				{#each cards as card}
					<li class="flex items-center justify-between gap-2 text-xs border-b border-transparent hover:text-orange-500 hover:border-orange-400">
						<CardHoverTrigger card={card} className={getLegalityClass(card, commander)} />
						{@render removeButton(() => onRemove(card))}
					</li>
				{/each}
			</ul>
		{/each}

	</div>
</div>
