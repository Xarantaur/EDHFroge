<script lang="ts">
    import Button from '$lib/components/Button.svelte';
	import CardSearch from '$lib/components/CardSearch.svelte';
	import DeckViewer from '$lib/components/DeckViewer.svelte';
    import type { DeckCard } from '$lib/types/cards';
	import toast from 'svelte-french-toast';

    export let data: {
        deck: {
            id: string;
            name: string;
            commander: DeckCard
            cards: DeckCard[]; 
        }
    };

    let deck: DeckCard[] = [...data.deck.cards]
    let commander: DeckCard = data.deck.commander;
    let name: string = data.deck.name;

    function addCard(card: DeckCard) {
        if(deck.some(c => c.cardName === card.cardName))
    {
            toast.error("Card Already in Deck")
            return
        } 
        deck = [...deck, card]
        }

    function removeCard(cardToRemove: DeckCard) {
        deck = deck.filter(card => card.cardName !== cardToRemove.cardName);
    } 

    async function saveDeck() {
        const cardsWithoutCommander = deck.filter(card => card.cardName !== commander.cardName)
        const response = await fetch(`/decks/update/${data.deck.id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                commander: {
                    id: commander.id,
                    cardName: commander.cardName,
                     image_uris: {
						normal: commander.image_uris?.normal,
						art_crop: commander.image_uris?.art_crop,
					},
                    typeLine: commander.typeLine,
                    cmc: commander?.cmc,
                    colors: commander?.colors,
                    colorIdentity: commander?.colorIdentity,
                },
                cards: cardsWithoutCommander.map(card => ({
                    id: card.id,
                    cardName: card.cardName,
                    image_uris: {
						normal: card.image_uris?.normal,
						art_crop: card.image_uris?.art_crop,
					},
                    typeLine: card?.typeLine,
                    cmc: card?.cmc,
                    colors: card?.colors,
                    colorIdentity: card?.colorIdentity,
                }))
            })
        });

        if (response.ok) {
            toast.success('Deck updated')
        } else {
            const error = await response.text();
            console.error('Update failed', error)
            toast.error('Seomthing went wrong updating the deck')
        }
    }
</script>


<CardSearch onAddCard={addCard} />

<DeckViewer {deck} {commander} onRemoveCard={removeCard} onPickCommander={(card) => (commander = card)} />

<Button onClick={saveDeck} type="button" variant="primary"> Save Changegs </Button>    