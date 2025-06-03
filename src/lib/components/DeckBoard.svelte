<script lang="ts">
	import TileHeader from "./Tile/TileHeader.svelte";

    export let title: string = "Your Deck"

</script>

<div class="w-full px-4">
	<div class="bg-gray-200 shadow p-6 max-h-[80vh] overflow-y-auto rounded">
        <TileHeader title={title} subtitle=""></TileHeader>
		<div class="h-full overflow-hidden 
                    [column-width:160px] 
                    sm:[column-width:200px] 
                    md:[column-width:250px] 
                    column-gap-6 overflow-hidden"
        style="column-width: 250px; column-gap: 1rem;">
            <slot />
        </div>
     </div> 
 </div>