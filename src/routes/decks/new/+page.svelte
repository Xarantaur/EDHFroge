<script lang="ts">
    import DeckViewer from '$lib/components/DeckViewer.svelte';
	import CardSearch from '$lib/components/CardSearch.svelte';
	import Button from '$lib/components/Button.svelte';
	import type { DeckCard } from '$lib/types/cards';
    let deck: any[] = [];
    let commander: DeckCard 
	
	function addCard(card: any) {
        if(deck.some(c => c.name === card.name)) {
            console.error("card already in deck")
            return
        }
		deck = [...deck, card]
	}

    function removeCard(cardToRemove: any) {
		deck = deck.filter(card => card.name !== cardToRemove.name);
	}
    
    async function saveDeck() {
		const cardsWithoutCommander = deck.filter(card => card.cardName !== commander?.cardName)
		const response = await fetch('/decks/save', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name: 'My First Deck',
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
			console.log("reponse ok")
		} else {
            const error = await response.text();
            console.error('Save failed:', error);
		}
	}


</script>

<CardSearch onAddCard={addCard} />
<DeckViewer onSave={saveDeck} deck={deck} commander={commander} onRemoveCard={removeCard} onPickCommander={(card) => (commander = card)}/>
<Button onClick={saveDeck} type="button" variant="primary">Save Deck</Button>
