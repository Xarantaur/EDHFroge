<script lang="ts">
	import Button from "$lib/components/Button.svelte";
	import Dialog from "$lib/components/Dialog.svelte";
	import { commander } from "$lib/utils/cardLegality";

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
			commander: {
				commanderName: string;
				commanderCropArt: string;
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
			<a href={`/decks/${deck.id}`}>
				<li class="relative rounded overflow-hidden shadow-md text-white bg-cover bg-center aspect-[4/3] w-full sm:w-80 hover:ring-2 hover:ring-orange-400 transition"
		     		style={`background-image: url('${deck.commander?.commanderCropArt ?? ''}')`}>
			
					<p class="text-sm text-gray-900 bg-orange-500 px-1 py-1 w-fit rounded font-bold">{deck.name}</p>
					<p class="text-sm text-gray-900 bg-orange-500 px-1 py-1 w-fit rounded">Commander: {deck.commander?.commanderName}</p>
					<p class="text-sm text-gray-900 bg-orange-500 px-1 py-1 w-fit rounded">Created: {new Date(deck.createdAt).toLocaleDateString()}</p>
					<form method="POST" action={`/decks/delete/${deck.id}`} on:submit={handleFormSubmit} class="absolute bottom-2 right-2">
						<Button type="submit" variant="danger" >Delete Deck</Button>
					</form>
				
				</li>
			</a>
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
	
