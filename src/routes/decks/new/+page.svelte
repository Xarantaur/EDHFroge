<script lang="ts">
    import DeckViewer from '$lib/components/DeckViewer.svelte';
	import CardSearch from '$lib/components/CardSearch.svelte';
	import type { DeckCard } from '$lib/types/cards';
	import { toastStore } from '$lib/stores/toast';
	import { totalCardTount } from '$lib/utils/cardCountUtility'
    let deck: any[] = [];
    let commander: DeckCard | null = null
	export let name: string = ""
	
	function addCard(card: any) {
		console.log(card)
        if(deck.some(c => c.cardName === card.cardName)) {
			console.log(card)
            toastStore.error("card already in deck")
            return
        }
		deck = [...deck, card]
	}

    function removeCard(cardToRemove: any) {
		deck = deck.filter(card => card.name !== cardToRemove.name);
	}
    
    async function saveDeck() {
		if(!commander) {
			toastStore.error('Please Select a Commander before saving')
			return;
		}
		if (!name || name.trim().length < 1 ){
			toastStore.error('Deck must have a Name');
			return;
		}
		const cardsWithoutCommander = deck.filter(card => card.cardName !== commander?.cardName)
		const response = await fetch('/decks/save', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name: name,
                commander: {
                    cardName: commander.cardName,
                    image_uris: {
						normal: commander.image_uris?.normal,
						art_crop: commander.image_uris?.art_crop,
					},
                    typeLine: commander?.typeLine,
                    cmc: commander?.cmc,
                    colors: commander?.colors,
                    colorIdentity: commander?.colorIdentity
                },
				cards: cardsWithoutCommander.map(card => ({
					cardName: card.cardName,
					 image_uris: {
						normal: card.image_uris?.normal,
						art_crop: card.image_uris?.art_crop,
					},
                    typeLine: card.typeLine,
                    cmc: card?.cmc,
                    colors: card?.colors,
                    colorIdentity: card?.color_identity
				}))
			})
		});

		if (response.ok) {
			toastStore.success('Deck saved Successfully')
		} else {
            const error = await response.text();
            console.error('Save failed:', error);
			toastStore.error('Failed to save deck')
		}
	}


</script>

<CardSearch onAddCard={addCard} />
<DeckViewer deckSize={totalCardTount(deck, commander)} bind:name onSave={saveDeck} deck={deck} commander={commander} onRemoveCard={removeCard} onPickCommander={(card) => (commander = card)}/>
