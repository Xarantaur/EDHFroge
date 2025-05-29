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
        if(deck.some(c => c.name === card.name))
    {
            toast.error("Card Already in Deck")
            return
        } 
        deck = [...deck, card]
        }

    function removeCard(cardToRemove: DeckCard) {
        deck = deck.filter(card => card.name !== cardToRemove.name);
    } 

    async function saveDeck() {
        const response = await fetch(`/decks/update/${data.deck.id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name,
                commander: {
                    cardName: commander.name,
                    imageUrl: commander.image_uris,
                    artCrop: commander.artCrop,
                    typeLine: commander.type_line,
                    cmc: commander?.cmc,
                    colors: commander?.colors,
                    colorIdentity: commander?.color_identity,
                },
                cards: deck.map(card => ({
                    cardName: card.name,
                    imageUrl: card.image_uris,
                    artCrop: card.artCrop,
                    typeLine: card?.type_line,
                    cmc: card?.cmc,
                    colors: card?.colors,
                    colorIdentity: card?.color_identity,
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