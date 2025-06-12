<script lang="ts">
	import CardSearch from '$lib/components/CardSearch.svelte';
	import DeckViewer from '$lib/components/DeckViewer.svelte';
	import { toastStore } from '$lib/stores/toast';
    import type { ParsedDeckCard } from '$lib/types/parsedDeckCard';
	import { withPrice } from '$lib/utils/addPrice';
    import { totalCardCount } from '$lib/utils/cardCountUtility'
	import { passingSingletonRule } from '$lib/utils/cardLegality';
    import { removeCardFromDeck, saveDeckToServer, addCardToDeck } from '$lib/utils/deckEditor';

    export let data: {
        deck: {
            id: string;
            name: string;
            commander: ParsedDeckCard
            cards: ParsedDeckCard[]; 
        }
    };

    let deck: ParsedDeckCard[] = [...data.deck.cards]
    let commander: ParsedDeckCard = data.deck.commander;
    let name: string = data.deck.name;

    async function addCard(card: ParsedDeckCard) {
        if(!passingSingletonRule(deck, card, commander)) return;

        const pricedCard = await withPrice(card.card)
        const updatedCard: ParsedDeckCard = {
            ...card,
            card: pricedCard
        }
		deck = addCardToDeck(deck, updatedCard)
	}

    function removeCard( cardToRemove: ParsedDeckCard) {
       deck = removeCardFromDeck(deck, cardToRemove)
    } 

    async function saveDeck() {
		if (!commander) {
		toastStore.error('Please select a Commander before saving');
		return;
	}

	const result = await saveDeckToServer({
        deckId: data.deck.id,
		name,
		commander,
		deck,
		url: data.deck ? `/decks/update/${data.deck.id}` : '/decks/save'
		});
	if(result.success){
		toastStore.success('deck saved successfully')
	} else {
		toastStore.error(result.error ?? 'Failed to save deck')
	}
}
    $:  deckSize = totalCardCount(deck, commander)
</script>


<CardSearch onAddCard={addCard} />

<DeckViewer {deckSize} bind:name {deck} bind:commander onRemoveCard={removeCard} onPickCommander={(card) => (commander = card)} onSave={saveDeck}/>

   