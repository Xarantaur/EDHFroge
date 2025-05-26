<script lang="ts">
    import type { DeckCard } from '$lib/types/cards'
    import CardPreview from './CardHoverTrigger.svelte';
    import CardSearch from './CardSearch.svelte';
    import Dialog from './Dialog.svelte';

	import TileHeader from './Tile/TileHeader.svelte';

    export let commander: DeckCard | null = null;
    export let onPick: (card: DeckCard) => void;
    
    let open = false;

    function handleSelect(card: DeckCard) {
        onPick(card);
        open = false;
    }
</script>



<div role="presentation"
aria-hidden="true" 
class="bg-gray-200 shadow p-6 cursor-pointer hover:bg-gray-100" on:click={() => (open = true)} >
<TileHeader title="Commander" subtitle="click to change"></TileHeader>
    {#if commander}
    <CardPreview card={commander} mode="static"/>
    {:else}
    <p>Click to choose your commander</p>
    {/if}
</div>

<Dialog bind:open title="Choose Your Commander" showFooter={true}>
    <CardSearch onAddCard={handleSelect} />
</Dialog>