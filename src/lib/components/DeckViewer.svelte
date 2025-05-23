<script lang="ts">
    import type { DeckCard } from '$lib/types/cards'
	import CardTypeSection from './CardTypeSection.svelte';
	import DeckBoard from './DeckBoard.svelte';

	import { groupCardsByType } from '$lib/utils/groupCardsByType';
	import CommanderPicker from './CommanderPicker.svelte';

	export let cards: DeckCard[] = []
	export let commander: DeckCard;

	$: groupedCards = groupCardsByType(cards)

</script>



<div class="flex items-start justify-center py-10 gap-10 w-full">
	<div class="w-[300px]">
<CommanderPicker {commander} onPick={(card) => (commander = card)} />
</div>

	<div class="flex-1 max-w-[60%]">
<DeckBoard>
	{#each Object.entries(groupedCards) as [type, cards]}
		<CardTypeSection title={type} {cards} />
	{/each}
</DeckBoard>
    </div>
</div>