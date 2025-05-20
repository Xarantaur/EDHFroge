<script lang="ts">
	import Button from "$lib/components/Button.svelte";

	export let data: {
		decks: {
			id: string;
			name: string;
			createdAt: string;
		}[];
	};
</script>

<div class="p-6 max-w-4xl mx-auto">
	<h1 class="text-2xl font-bold mb-4">Your Decks</h1>

	{#if data.decks.length === 0}
		<p class="text-gray-500 italic p-2">You haven't created any decks yet.</p>
		<a href="/decks/new" class="text-white bg-orange-600 hover:bg-orange-400 px-4 py-2 rounded">Create deck</a>
		
	{:else}
		<ul class="grid gap-4">
			{#each data.decks as deck}
				<li class="p-4 bg-white shadow rounded hover:bg-orange-50">
					<a href={`/decks/${deck.id}`} class="font-semibold text-lg">{deck.name}</a>
					<p class="text-sm text-gray-500">Created: {new Date(deck.createdAt).toLocaleDateString()}</p>
					<form method="POST" action={`/decks/delete/${deck.id}`}>
						<Button type="submit" variant="danger" >Delete Deck</Button>
					</form>
				</li>
			{/each}
		</ul>
	{/if}
</div>
