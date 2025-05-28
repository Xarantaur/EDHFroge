<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import DeckTile from "$lib/components/DeckTile.svelte";
	import Dialog from "$lib/components/Dialog.svelte";
	import { commander } from "$lib/utils/cardLegality";

	let showDialog = false;
	let pendingForm: HTMLFormElement | null = null;

	function handleDelete(_id: string, e: Event) {
		pendingForm = e.currentTarget as HTMLFormElement;
		showDialog = true
	}

	function confirmDelete() {
		if (pendingForm){
		pendingForm?.submit();
		showDialog = false;
	}
	}

	export let data: {
		decks: {
			id: string;
			name: string;
			createdAt: string;
			commander: {
				cardName: string;
				artCrop: string;
			} | null
		}[];
	};
</script>

<div class="p-6 max-w-4xl mx-auto">
	<h1 class="text-2xl font-bold mb-4">Your Decks</h1>

	{#if data.decks.length === 0}
		<p class="text-gray-500 italic p-2">You haven't created any decks yet.</p>
		<Button type="button" variant="primary"><a href="/decks/new">Create Deck</a></Button>
		
	{:else}
		
		<Button type="button" variant="primary"><a href="/decks/new">New Deck</a></Button>
		
		<ul class="flex gap-4 py-2">
			{#each data.decks as deck}
				<DeckTile {deck} onDelete={handleDelete} />
			{/each}
		</ul>
	{/if}
</div>

<Dialog
	bind:open={showDialog}
	title="Delete Deck?"
	showFooter={false}
>
	<div>
		<p>Are you sure you want to delete this deck? this cannot be undone</p>
	</div>
	<div>
		<Button type="button" variant="secondary" onClick={ () => showDialog = false }>Cancel</Button>
		<Button type="button" variant="danger" onClick={confirmDelete}>Delete</Button>
	</div>
</Dialog>
	
