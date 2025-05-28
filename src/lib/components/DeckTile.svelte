<script lang="ts">
    import Button from "./Button.svelte";


		export let deck: {
			id: string;
			name: string;
			createdAt: string;
			commander: {
				cardName: string;
				artCrop: string;
			} | null
		};

    export let onDelete: (_id: string, e: Event) => void;
    
    function handleFormSubmit(e: Event) {
        e.preventDefault();
        onDelete(deck.id, e)
    }

</script>


<li aria-hidden=true 
    class="relative rounded overflow-hidden shadow-md text-white bg-cover bg-center aspect-[4/3]
        w-full sm:w-80 hover:ring-2 hover:ring-orange-400 transition cursor-pointer"
    style={`background-image: url('${deck.commander?.artCrop ?? ''}')`}
    on:click={() => window.location.href = `/decks/${deck.id}`}
    >				 
		<div class="absolute inset-0 bg-black/20 p-2 flex flex-col justify-between pointer-events-none">
	    	<div>
		        <p class="text-sm text-gray-900 bg-orange-500 px-1 py-1 w-fit rounded font-bold">{deck.name}</p>
                <p class="text-sm text-gray-900 bg-orange-500 px-1 py-1 w-fit rounded">Commander: {deck.commander?.cardName}</p>
                <p class="text-sm text-gray-900 bg-orange-500 px-1 py-1 w-fit rounded">Created: {new Date(deck.createdAt).toLocaleDateString()}</p>
            </div>
		</div>

		<form method="POST" action={`/decks/delete/${deck.id}`} on:submit={handleFormSubmit} on:click|stopPropagation aria-hidden="true" class="absolute bottom-2 right-2 z-10">
	        <Button type="submit" variant="danger" >Delete Deck</Button>
		</form>
</li>