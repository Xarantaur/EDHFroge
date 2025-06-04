<script lang="ts">
	import { previewCard } from '$lib/stores/previewCardStore';
    import type { DeckCard } from '$lib/types/cards'
    import CardSearch from './CardSearch.svelte';
    import Dialog from './Dialog.svelte';
    import { isLegalCommander } from '$lib/utils/legalCommander';

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
        <img src={card.image_uris?.normal} alt={card.cardName} class="w-64 max-h-[80vh] rounded shadow-lg"/>
        
    </div>
{/snippet}

<TileHeader title="Commander" subtitle="click to change"></TileHeader>
<div role="presentation"
aria-hidden="true" 
class="bg-gray-200 shadow p-6 cursor-pointer hover:bg-gray-100" on:click={() => (open = true)} >

    {#if commander}
    <div class="relative w-fit">
        {@render CommanderCardPreview(commander)}
        {#if !isLegalCommander(commander)}
            <div class="absolute inset-0 bg-black/60 flex items-center justify-center rounded">
        <p class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-500 font-bold text-lg italic rotate-[-30deg]">Commnader Not Legal</p>
      </div>
        {/if}
    </div>
    {:else}
        <p>pick commander</p>
    {/if}
</div>

<Dialog bind:open title="Choose Your Commander" showFooter={true}>
    <CardSearch onAddCard={handleSelect} />
</Dialog>