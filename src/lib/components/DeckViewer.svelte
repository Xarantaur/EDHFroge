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

<DeckBoard>
	<CommanderPicker {commander} onPick={(card) => (commander = card)} />
	{#each Object.entries(groupedCards) as [type, cards]}
		<CardTypeSection title={type} {cards} />
	{/each}
</DeckBoard>