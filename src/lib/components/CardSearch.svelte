<script lang="ts">
  import { searchCardByName, autocompleteCardNames } from '$lib/utils/scryfall';
  import { parseDeckCard } from '$lib/utils/parseDeckCard'
  import { clickOutSide } from '$lib/utils/clickOutSide';
	import type { DeckCard } from '$lib/types/cards';
	import CardHoverTrigger from './CardHoverTrigger.svelte';

  export let title = '';
  export let onAddCard: (card: any) => void;

  let query = '';
  let card: any = null;
  let hoveredName: string = '';
  let hoveredCard: DeckCard | null = null
  let error = '';
  let suggestions: DeckCard[] = [];
  let debouncerTimer: NodeJS.Timeout;
  

    async function fetchSuggestions() {
      const names = await autocompleteCardNames(query);
      suggestions = await Promise.all(names.map(async (name) => {
        const raw = await searchCardByName(name);
        return parseDeckCard(raw)
      }))
    }


    async function handleAdd(card: DeckCard) {
      onAddCard(card);
      query = '';
      suggestions = [];
      hoveredCard = null;
    }

$: if (query.length > 1) {
      clearTimeout(debouncerTimer);
      debouncerTimer = setTimeout(fetchSuggestions, 250);
    }

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
		/>
</div>

        {#if suggestions.length > 0}
          <ul class="absolute top-full left-0 right-0 z-10 bg-white border border-gray-300 rounded bg-white shadow max-h-48 overflow-y-auto mt-1">
            {#each suggestions as card}
            <li 
            role="presentation"
            class="relative px-3 py-2 hover:bg-orange-100 cursor-pointer"
            on:click={() => handleAdd(card)}>
            <CardHoverTrigger {card} />
            </li>
            {/each}
        </ul>
        {/if}
</div>
</div>