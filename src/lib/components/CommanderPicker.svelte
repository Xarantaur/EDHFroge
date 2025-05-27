<script lang="ts">
	import { previewCard } from '$lib/stores/previewCardStore';
    import type { DeckCard } from '$lib/types/cards'
    import CardSearch from './CardSearch.svelte';
    import Dialog from './Dialog.svelte';

	import TileHeader from './Tile/TileHeader.svelte';

    export let commander: DeckCard | null = null;
    export let onPick: (card: DeckCard) => void;
    
    let open = false;

    function handleSelect(card: DeckCard) {
        onPick(card);
        previewCard.set(null)
        open = false;
    }
</script>

{#snippet CommanderCardPreview(card:DeckCard)}
    <div class="">
        <img src={card.image_uris?.normal} alt={card.name} class="w-64 max-h-[80vh] rounded shadow-lg"/>
    </div>
{/snippet}
<TileHeader title="Commander" subtitle="click to change"></TileHeader>
<div role="presentation"
aria-hidden="true" 
class="bg-gray-200 shadow p-6 cursor-pointer hover:bg-gray-100" on:click={() => (open = true)} >

    {#if commander}
        {@render CommanderCardPreview(commander)}
    {:else}
        <p>pick commander</p>
    {/if}
</div>

<Dialog bind:open title="Choose Your Commander" showFooter={true}>
    <CardSearch onAddCard={handleSelect} />
</Dialog>