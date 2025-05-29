<script lang="ts">
    import Button from "./Button.svelte";

		export let deck: {
			id: string;
			name: string;
			createdAt: string;
			commander: {
				cardName: string;
				artCrop: string;
				colorIdentity: string[];
			} | null
		};

    export let onDelete: (_id: string, e: Event) => void;
    
    function handleFormSubmit(e: Event) {
        e.preventDefault();
        onDelete(deck.id, e)
    }
</script>




<li aria-hidden=true 
    class="relative rounded overflow-hidden shadow-md cursor-pointer transition hover:ring-2 hover:ring-orange-400 w-full"
    on:click={() => window.location.href = `/decks/update/${deck.id}`}
    >		   		 
		<div class="relative bg-cover bg-center aspect-[4/3]"
			style={`background-image: url('${deck.commander?.artCrop ?? ''}')`}>
			<div class="absolute inset-0 bg-gradient-to-b from-transparent to-black/100 "></div>
		</div>
		<div class="bg-black p-1 text-white flex-1 items-center">
			<div class="flex mb-2 justify-center items-center space-x-2">
				{#each deck.commander?.colorIdentity ?? [] as color}
					<img 
						src={`https:svgs.scryfall.io/card-symbols/${color}.svg`}
						alt={`${color} mana Symbol`}
						width="20"
						height="20"
					/>
				{/each}
			</div>

			<p class="text-sm text-white text-center mb-2 bg-black font-bold">{deck.name}</p>
			<p class="text-sm text-white text-center mb-2 bg-black font-bold">{deck.commander?.cardName}</p>

			<form method="POST"
			  action={`/decks/delete/${deck.id}`} 
			  on:submit={handleFormSubmit} on:click|stopPropagation 
			  aria-hidden="true" 
			  class="flex justify-end"
			  >
	        <Button 
				type="submit" 
				variant="danger" 
				>Delete Deck
			</Button>
		</form>
		</div>
		</li>

		
	
		
