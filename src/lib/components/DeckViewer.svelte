<script lang="ts">
    import type { ParsedDeckCard } from '$lib/types/parsedDeckCard'
	import DeckBoard from './DeckBoard.svelte';
	import CommanderPicker from './CommanderPicker.svelte';
	import Button from './Button.svelte';
	import DeckNameInput from './DeckNameInput.svelte';
	import DeckManaCurve from './DeckManaCurve.svelte';
	import GroupedCardlist from './GroupedCardlist.svelte';
	import { groupCardsByType } from '$lib/utils/groupCardsByType';


	export let name: string;
	export let deckSize: number;
	export let deck: ParsedDeckCard[] = []
	export let commander: ParsedDeckCard | null = null;
	export let onPickCommander: (card: ParsedDeckCard) => void
	export let removeCard: (card: ParsedDeckCard) => void;
	export let onSave: () => Promise<void>;
	export let addCard: (card: ParsedDeckCard) => void;
	

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


<div class="w-full max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-6 sm:items-center lg:items-start">	

	<div class="flex flex-col gap-4 w-auto lg:w-[300px] px-4">
		<CommanderPicker commander={commander} onPick={onPickCommander} />
		<DeckManaCurve {deck}/>
	</div >

		<div class="flex flex-col flex-1 w-auto justify-center">
			<DeckBoard bind:name {deckSize} >
		<div class="columns-1 sm:columns-1 md:columns-2 lg:columns-3 gap-8 ">
				{#each orderedGroupedCards as [type, cards]}
					<GroupedCardlist 
							{type}
							{cards}
							{commander}
							removeCard={removeCard}
							addCard={addCard}
						/>
						{/each}
					</div>
					</DeckBoard>

						<div class="flex justify-end p-4">
						<Button onClick={handleSave} type="button" variant="primary" loading={saving}>Save Deck</Button>
						</div> 
   				 </div>

</div>