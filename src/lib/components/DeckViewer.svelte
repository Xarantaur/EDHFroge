<script lang="ts">
    import type { ParsedDeckCard } from '$lib/types/parsedDeckCard'
	import CardTypeSection from './CardTypeSection.svelte';
	import DeckBoard from './DeckBoard.svelte';
	import CommanderPicker from './CommanderPicker.svelte';
	import Button from './Button.svelte';
	import DeckNameInput from './DeckNameInput.svelte';
	import DeckManaCurve from './DeckManaCurve.svelte';
	import GroupedCardlist from './GroupedCardlist.svelte';
	import { groupCardsByType } from '$lib/utils/groupCardsByType';

	export let deck: ParsedDeckCard[] = []
	export let commander: ParsedDeckCard | null = null;
	export let onPickCommander: (card: ParsedDeckCard) => void
	export let onRemoveCard: (card: ParsedDeckCard) => void;
	export let onSave: () => Promise<void>;
	export let name: string;
	export let deckSize: number;

		function sortedDeck(deck: ParsedDeckCard[])  {
		const sortedDeck = deck.sort((a, b) => a.card.cardName.localeCompare(b.card.cardName)) 
		return sortedDeck
	}

	let saving = false;
	async function handleSave() {
		saving = true;
		try {
			await onSave();
		} finally {
			saving = false;
		}
	}

	$: groupedCards = groupCardsByType(deck)
	$: orderedGroupedCards = Object.entries(groupedCards).sort(([typeA], [typeB]) => {
		if (typeA === "Land" ) return 1;
		if (typeB === "Land" ) return -1;
		return 0
	})
</script>


<div class="flex items-start justify-center gap-10 w-full">	
	<div class="w-[300px]">
		<DeckNameInput bind:name />
			<CommanderPicker commander={commander} onPick={onPickCommander} />
				<DeckManaCurve {deck}/>
					</div >
						<div class="flex-1 max-w-[57%]">
					<DeckBoard deckSize={deckSize} >
						<div class="sm:columns-1 md:columns-2 lg:columns-3 gap-8">
						{#each orderedGroupedCards as [type, cards]}
						<GroupedCardlist 
							{type}
							{cards}
							{commander}
							onRemove={onRemoveCard}
						/>
						{/each}
					</div>
					</DeckBoard>
						<div class="flex justify-end p-4">
						<Button onClick={handleSave} type="button" variant="primary" loading={saving}>Save Deck</Button>
						</div> 
    </div>
</div>