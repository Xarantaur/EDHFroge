<script lang="ts">
  import { searchCardByName } from '$lib/utils/scryfall';
  import toast from 'svelte-french-toast';
	import Button from './Button.svelte';

  export let onAddCard: (card: any) => void;

  let query = '';
  let card: any = null;
  let error = '';

  async function search() {
    error = '';
    card = null;

    try {
      card = await searchCardByName(query);
      query = '';
    } catch (err) {
      error = 'Card not found';
    }
  }

  function handleAdd() {
    if (!card) return;
    onAddCard(card);
    card = null;
  }
</script>

<div class="max-w-md mx-auto p-6">
	<h2 class="text-2xl font-bold mb-4">Search for a Card</h2>

	<div class="flex gap-2 mb-4">
		<input
			type="text"
			bind:value={query}
			placeholder="Enter card name"
			class="flex-grow p-2 border border-gray-300 rounded"
			on:keydown={(e) => e.key === 'Enter' && search()}
		/>
        <Button onClick={search} type="button" variant="primary">Search</Button>
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