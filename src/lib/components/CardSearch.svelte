<script lang="ts">
  import { searchCardByName, autocompleteCardNames } from '$lib/utils/scryfall';
  import { parseDeckCard } from '$lib/utils/parseDeckCard'
	import Button from './Button.svelte';

  export let title = '';
  let query = '';
  let card: any = null;
  let error = '';
  let suggestions: string[] = [];
  let debouncerTimer: NodeJS.Timeout;

    $: if (query.length > 1) {
      clearTimeout(debouncerTimer);
      debouncerTimer = setTimeout(async () => {
        suggestions = await autocompleteCardNames(query);
      }, 300);
    }


    async function search() {
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
  }

  export let onAddCard: (card: any) => void;

  function handleAdd() {
    if (!card) return;
    onAddCard(card);
    card = null;
  }
</script>

<div class="max-w-md mx-auto p-6">
	<h2 class="text-2xl font-bold mb-4">{title}</h2>
<div class="relative top-full">
	<div class="flex gap-2 mb-4">
		<input
			type="text"
			bind:value={query}
			placeholder="Search for a card name"
			class="flex-grow p-2 border border-gray-300 rounded"
			on:keydown={(e) => e.key === 'Enter' && search()}
		/>
        <Button onClick={search} type="button" variant="primary">Search</Button>
</div>
        {#if suggestions.length > 0}
          <ul class="absolute z-10 left-0 right-0 border border-gray-300 rounded bg-white max-h-48 overflow-y-auto mt-0">
            {#each suggestions as suggestion}
            <li 
            role="presentation"
            class="px-3 py-2 hover:bg-gray-100 cursor-pointer"
            on:click={() => {
              query = suggestion;
              search();
              suggestions = [];
            }}
            >
            {suggestion}
            </li>
            {/each}
        </ul>
        {/if}
	</div>

    {#if error}
    <p class="text-red-500">{error}</p>
  {/if}

  {#if card}
    <div class="shadow rounded bg-white">
      <img src={card.image_uris?.normal} alt={card.name} class="rounded p-4" />
      <Button onClick={handleAdd} type="button" variant="primary">Add Card</Button>
    </div>
  {/if}
</div>