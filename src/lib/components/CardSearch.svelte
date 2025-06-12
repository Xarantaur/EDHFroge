<script lang="ts">
  import { searchCardByName, autocompleteCardNames } from '$lib/utils/scryfall';
  import { transformToParsedDeckCard } from '$lib/utils/transformToParsedDeckCard'
  import { clickOutSide } from '$lib/utils/clickOutSide';
	import type { ParsedDeckCard  } from '$lib/types/parsedDeckCard';
	import CardHoverTrigger from './CardHoverTrigger.svelte';
  import { previewCard } from '$lib/stores/previewCardStore';
  import { debounce } from '$lib/utils/debounce';

  export let title = '';
  export let onAddCard: (card: ParsedDeckCard) => void;

  let query = '';
  let suggestions: ParsedDeckCard[] = [];
  let inputRef: HTMLInputElement;

    async function fetchSuggestions() {
      const names = await autocompleteCardNames(query);
      suggestions = await Promise.all(names.map(async (name) => {
        const raw = await searchCardByName(name);
        return transformToParsedDeckCard(raw)
      }))
    }

    async function handleAddFirstSuggestion() {
      if(suggestions.length > 0 ) {
        handleAdd(suggestions[0]);
      }
    }

    async function handleAdd(card: ParsedDeckCard) {
      onAddCard(card);
      query = '';
      suggestions = [];
      previewCard.set(null)
      inputRef?.focus();
    }
  const debouncedFetch = debounce(fetchSuggestions, 250)
$: if (query.length > 1) {
      debouncedFetch();
    }

</script>
{console.log()}
<div class="max-w-md mx-auto p-6">
	<h2 class="text-2xl font-bold mb-4">{title}</h2>
  
<div class="relative flex items-start gap-4" use:clickOutSide={() =>{ suggestions = [];}}>
	<div class="relative w-full">
		<input
    bind:this={inputRef}
			type="text"
			bind:value={query}
			placeholder="Search for a card name"
			class="w-full p-2 border border-orange-600 rounded"
       on:keydown={(e) => {if(e.key === "Enter")  {e.preventDefault(); handleAddFirstSuggestion()}}}
		/>
</div>
        {#if suggestions.length > 0}
          <ul class="absolute top-full left-0 right-0 z-10 bg-white border border-gray-300 rounded bg-white shadow max-h-48 overflow-y-auto mt-0">
            {#each suggestions as card }
            <li 
            role="presentation"
            class="relative px-3 py-2 hover:bg-orange-100 cursor-pointer"
            on:click={() => handleAdd(card)}
            >
            <CardHoverTrigger {card} />
            </li>
            {/each}
        </ul>
        {/if}
</div>
</div>