<script lang="ts">
	import { searchCardByName } from '$lib/utils/scryfall';

	let query = '';
	let card: any = null;
	let error = '';

	async function search() {
		error = '';
		card = null;

		try {
			card = await searchCardByName(query);
		} catch (err) {
			error = 'Card not found';
		}
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
		/>
		<button on:click={search} class="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">
			Search
		</button>
	</div>

	{#if error}
		<p class="text-red-500">{error}</p>
	{/if}

	{#if card}
		<div class="bg-white p-4 shadow rounded">
			<h3 class="text-lg font-semibold mb-2">{card.name}</h3>
			<img src={card.image_uris?.normal} alt={card.name} class="rounded" />
		</div>
	{/if}
</div>