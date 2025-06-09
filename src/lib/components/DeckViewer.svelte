<script lang="ts">
    import type { ParsedDeckCard } from '$lib/types/parsedDeckCard'
	import CardTypeSection from './CardTypeSection.svelte';
	import DeckBoard from './DeckBoard.svelte';
	import CommanderPicker from './CommanderPicker.svelte';
	import Button from './Button.svelte';
	import DeckNameInput from './DeckNameInput.svelte';

	export let deck: ParsedDeckCard[] = []
	export let commander: ParsedDeckCard | null = null;
	export let onPickCommander: (card: ParsedDeckCard) => void
	export let onRemoveCard: (card: ParsedDeckCard) => void;
	export let onSave: () => Promise<void>;
	export let name: string;
	export let deckSize: number;

	let saving = false;
	async function handleSave() {
		saving = true;
		try {
			await onSave();
		} finally {
			saving = false;
		}
	}
</script>


<div class="flex items-start justify-center gap-10 w-full">
	
	<div class="w-[300px]">
		<DeckNameInput bind:name />
<CommanderPicker commander={commander} onPick={onPickCommander} />
</div>
	<div class="flex-1 max-w-[57%]">
<DeckBoard deckSize={deckSize} >
	<CardTypeSection deck={deck} onRemove={onRemoveCard} {commander}/>
</DeckBoard>
	<div class="flex justify-end p-4">
	<Button onClick={handleSave} type="button" variant="primary" loading={saving}>Save Deck</Button>
	</div> 
    </div>
</div>