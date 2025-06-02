<script lang="ts">
    import type { DeckCard } from '$lib/types/cards'
	import CardTypeSection from './CardTypeSection.svelte';
	import DeckBoard from './DeckBoard.svelte';
	import CommanderPicker from './CommanderPicker.svelte';

	export let deck: DeckCard[] = []
	export let commander: DeckCard | undefined = undefined;
	export let onPickCommander: (card: DeckCard) => void
	export let onRemoveCard: (card: DeckCard) => void;
</script>



<div class="flex items-start justify-center gap-10 w-full">
	<div class="w-[300px]">
<CommanderPicker {commander} onPick={onPickCommander} />
</div>
	<div class="flex-1 max-w-[57%]">
<DeckBoard>
	<CardTypeSection deck={deck} onRemove={onRemoveCard}/>
</DeckBoard>
    </div>
</div>