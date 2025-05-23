<script lang="ts">
  import { searchCardByName, autocompleteCardNames } from '$lib/utils/scryfall';
  import { parseDeckCard } from '$lib/utils/parseDeckCard'
	import Button from './Button.svelte';
  import { clickOutSide } from '$lib/utils/clickOutSide';
	import type { DeckCard } from '$lib/types/cards';
	import CardPreview from './CardPreview.svelte';

  export let title = '';
  export let onAddCard: (card: any) => void;

  let query = '';
  let card: any = null;
  let hoveredName: string = '';
  let hoveredCard: DeckCard | null = null
  let error = '';
  let suggestions: string[] = [];
  let debouncerTimer: NodeJS.Timeout;
  let previewX = 0;
  let previewY = 0;

    
    

    async function fetchSuggestions() {
      suggestions = await autocompleteCardNames(query);
    }

    async function fetchHoverCard(name: string) {
      console.log("fetching preview for", name)
      const raw = await searchCardByName(name);
      hoveredCard = parseDeckCard(raw)
      console.log("got preview card" , hoveredCard)
    }

    async function handleAdd(name: string) {
      const raw = await searchCardByName(name);
      const parsed = parseDeckCard(raw);
      onAddCard(parsed);
      query = '';
      suggestions = [];
      hoveredCard = null;
    }

$: if (query.length > 1) {
      clearTimeout(debouncerTimer);
      debouncerTimer = setTimeout(fetchSuggestions, 250);
    }

 /*    async function search() {
      error = '';
      card = null;
    try {
      const raw = await searchCardByName(query);
      card = parseDeckCard(raw)
      console.log(card)
      console.log(raw)
      query = '';
    } catch (err) {
      error = 'Card not found';
    }
  } */

 /*  function handleAdd() {
    if (!card) return;
    onAddCard(card);
    card = null;
  } */
</script>

<div class="max-w-md mx-auto p-6">
	<h2 class="text-2xl font-bold mb-4">{title}</h2>
  
<div class="relative flex items-start gap-4" use:clickOutSide={() =>{ suggestions = []; hoveredCard = null; hoveredName = '';}}>

	<div class="relative w-full">
		<input
			type="text"
			bind:value={query}
			placeholder="Search for a card name"
			class="w-full p-2 border border-orange-600 rounded"
			on:keydown={(e) => e.key === 'Enter' && handleAdd(query)}
		/>
</div>

        {#if suggestions.length > 0}
          <ul class="absolute top-full left-0 right-0 z-10 bg-white border border-gray-300 rounded bg-white shadow max-h-48 overflow-y-auto mt-1">
            {#each suggestions as name}
            <li 
            role="presentation"
            class="relative px-3 py-2 hover:bg-orange-100 cursor-pointer"
            on:click={() => handleAdd(name)}
            on:mouseenter={(e) => {
              hoveredName = name;
              fetchHoverCard(name)
              const rect = e.currentTarget.getBoundingClientRect();
              previewX = rect.right + 16;
              previewY = rect.top;
            }}
            >
            <span>{name}</span>
            
            </li>
            {/each}
        </ul>
        {/if}
	</div>
          {#if hoveredCard}
            <div 
                class="fixed w-64 max-h-[80px] z-50 pointer-events-none "
                style="top: {previewY}px; left: {previewX}px;">
                 <CardPreview card={hoveredCard} mode="static" />
            </div>
          {/if}


</div>