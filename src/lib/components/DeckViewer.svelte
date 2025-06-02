<script lang="ts">
    import type { DeckCard } from '$lib/types/cards'
	import CardTypeSection from './CardTypeSection.svelte';
	import DeckBoard from './DeckBoard.svelte';
	import { groupCardsByType } from '$lib/utils/groupCardsByType';
	import CommanderPicker from './CommanderPicker.svelte';
	import CardHoverTrigger from './CardHoverTrigger.svelte';
	import { getLegalityClass } from '$lib/utils/cardLegality';

	export let deck: DeckCard[] = []
	export let commander: DeckCard | undefined = undefined;
	export let onPickCommander: (card: DeckCard) => void
	export let onRemoveCard: (card: DeckCard) => void;

	$: groupedCards = groupCardsByType(deck)

</script>



<div class="flex items-start justify-center py-10 gap-10 w-full">
	<div class="w-[300px]">
<CommanderPicker {commander} onPick={onPickCommander} />
</div>
	<div class="flex-1 max-w-[60%]">
<DeckBoard>
	<CardTypeSection deck={deck} onRemove={onRemoveCard}/>
</DeckBoard>
    </div>
</div>