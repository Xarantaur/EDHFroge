<script lang="ts">
    import DeckViewer from '$lib/components/DeckViewer.svelte';
	import CardSearch from '$lib/components/CardSearch.svelte';
	import type { ParsedDeckCard } from '$lib/types/parsedDeckCard';
	import { toastStore } from '$lib/stores/toast';
	import { totalCardCount } from '$lib/utils/cardCountUtility'
	import { passingSingletonRule } from '$lib/utils/cardLegality';
	import { removeCardFromDeck, saveDeckToServer, addCardToDeck } from '$lib/utils/deckEditor';
	import { goto } from '$app/navigation';
	import { withPrice } from '$lib/utils/addPrice';
	
    let deck: any[] = [];
    let commander: ParsedDeckCard | null = null
	export let name: string = ""
	
	async function addCard(card: ParsedDeckCard) {
		if(!passingSingletonRule(deck, card, commander)) return;
		const pricedCard = await withPrice(card.card)
        const updatedCard: ParsedDeckCard = {
            ...card,
            card: pricedCard
        }
		deck = addCardToDeck(deck, updatedCard)	
	}

    function removeCard(cardToRemove: ParsedDeckCard) {
		deck = removeCardFromDeck(deck, cardToRemove)
	}
    
    async function saveDeck() {
		if (!commander) {
		toastStore.error('Please select a Commander before saving');
		return;
	}

	const result = await saveDeckToServer({
		name,
		commander,
		deck,
		url: '/decks/save'
		});

	if(result.success){
		toastStore.success('deck saved successfully')
		if(result.deckId) {
			goto(`/decks/update/${result.deckId}`)
		}
		goto(`/decks/update/${result.deckId}`);
	} else {
		toastStore.error(result.error ?? 'Failed to save deck')
	}
}
</script>

<CardSearch onAddCard={addCard} />
<DeckViewer deckSize={totalCardCount(deck, commander)} bind:name onSave={saveDeck} deck={deck} commander={commander} onRemoveCard={removeCard} onPickCommander={(card) => (commander = card)}/>
