<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import ConfirmDialog from "$lib/components/confirmDialog.svelte";

	let showDialog = false;
	let pendingForm: HTMLFormElement | null = null;

	function handleFormSubmit(e: Event) {
		e.preventDefault();
		const form = e.currentTarget as HTMLFormElement;
		pendingForm = form;
		showDialog = true;
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
		
		<ul class="grid gap-4">
			{#each data.decks as deck}
				<li class="p-4 bg-white shadow rounded hover:bg-orange-50">
					<a href={`/decks/${deck.id}`} class="font-semibold text-lg">{deck.name}</a>
					<p class="text-sm text-gray-500">Created: {new Date(deck.createdAt).toLocaleDateString()}</p>
					<form method="POST" action={`/decks/delete/${deck.id}`} on:submit={handleFormSubmit}>
						<Button type="submit" variant="danger" >Delete Deck</Button>
					</form>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<ConfirmDialog
	bind:open={showDialog}
	title="Delete Deck?"
	message="Are you sure you want to delete this deck? this cannot be undone"
	confirmLabel="Delete"
	cancelLabel="Cancel"
	onConfirm={confirmDelete}
	onCancel={() => (showDialog = false)}
	confirmProps={{ variant: 'danger' }}
	cancelProps={{ variant: 'secondary' }}
/>
	
