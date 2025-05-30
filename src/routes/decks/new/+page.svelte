<script lang="ts">
    import DeckViewer from '$lib/components/DeckViewer.svelte';
	import toast from 'svelte-french-toast';
	import CardSearch from '$lib/components/CardSearch.svelte';
	import Button from '$lib/components/Button.svelte';
	import type { DeckCard } from '$lib/types/cards';
    let deck: any[] = [];
    let commander: DeckCard 
	
	function addCard(card: any) {
        if(deck.some(c => c.name === card.name)) {
            toast.error("card already in deck")
            return
        }
		deck = [...deck, card]
	}

    function removeCard(cardToRemove: any) {
		deck = deck.filter(card => card.name !== cardToRemove.name);
	}
    
    async function saveDeck() {
		const response = await fetch('/decks/save', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				name: 'My First Deck',
                commander: {
                    cardName: commander.cardName,
                    image_uris: {
						normal: commander.image_uris?.normal,
						artCrop: commander.image_uris?.artCrop,
					},
                    typeLine: commander?.typeLine,
                    cmc: commander?.cmc,
                    colors: commander?.colors,
                    colorIdentity: commander?.colorIdentity
                },
				cards: deck.map(card => ({
					cardName: card.cardName,
					 image_uris: {
						normal: card.image_uris?.normal,
						artCrop: card.image_uris?.artCrop,
					},
                    typeLine: card.typeLine,
                    cmc: card?.cmc,
                    colors: card?.colors,
                    colorIdentity: card?.color_identity
				}))
			})
		});

		if (response.ok) {
			toast.success('Deck saved!');
		} else {
            const error = await response.text();
            console.error('Save failed:', error);
			toast.error('Something went wrong saving the deck');
		}
	}


</script>



<CardSearch onAddCard={addCard} />
<DeckViewer deck={deck} commander={commander} onRemoveCard={removeCard} onPickCommander={(card) => (commander = card)}/>
<Button onClick={saveDeck} type="button" variant="primary">Save Deck</Button>
