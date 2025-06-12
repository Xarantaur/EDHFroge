<script lang="ts">
	import TileHeader from "./Tile/TileHeader.svelte";

    export let title: string = "Main Deck"
    export let deckSize: number 

</script>

<div class="w-full px-4">
	<div class="bg-gray-200 shadow p-6 rounded">
        <TileHeader title={title} subtitle={`CardCount: ${deckSize}`}></TileHeader>
		<div class="flex flex-wrap gap-6">
            <slot />
        </div>
     </div> 
 </div>