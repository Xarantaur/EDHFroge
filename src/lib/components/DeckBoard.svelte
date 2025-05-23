<script lang="ts">
    export let title: string = "Your Deck"

</script>

<div class="w-full px-4">
	<div class="bg-gray-200 shadow p-6 w-full max-w-7xl h-[90vh]">
        <h1 class="text-2xl font-bold mb-4">{title}</h1>
		<div class="overflow-y-auto h-full pr-2">
            <slot />
        </div>
     </div> 
 </div>