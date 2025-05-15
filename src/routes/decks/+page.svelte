<script lang="ts">
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
		<p class="text-gray-500 italic">You haven't created any decks yet.</p>
		<a href="/decks/new" class="text-orange-600 hover:underline mt-4 inline-block">+ Create your first deck</a>
	{:else}
		<ul class="grid gap-4">
			{#each data.decks as deck}
				<li class="p-4 bg-white shadow rounded hover:bg-orange-50">
					<a href={`/decks/${deck.id}`} class="font-semibold text-lg">{deck.name}</a>
					<p class="text-sm text-gray-500">Created: {new Date(deck.createdAt).toLocaleDateString()}</p>
				</li>
			{/each}
		</ul>
	{/if}
</div>
