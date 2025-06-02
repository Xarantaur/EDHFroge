<script lang="ts">
	import TileHeader from "./Tile/TileHeader.svelte";

    export let title: string = "Your Deck"

</script>

<div class="w-screen h-screen px-4 overflow-hidden">
	<div class="bg-gray-200 shadow p-6 w-[60%] h-[70%] overflow-hidden">
        <TileHeader title={title} subtitle=""></TileHeader>
		<div class="h-full flex flex-wrap content-start items-start gap-y-2 gap-x-6">
            <slot />
        </div>
     </div> 
 </div>