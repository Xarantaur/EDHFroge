<script lang="ts">
    import DeckNameInput from './DeckNameInput.svelte';
    export let name: string;
    export let deckSize: number 

</script>

<div class="w-full px-4 flex justify-center md:justify-start">
	<div class="bg-gray-200 shadow p-6 rounded justify-center">
        <DeckNameInput bind:name />
        <p class="text-gray-500 text-center">Card Count: {deckSize}</p>
		<div class="flex flex-wrap gap-6">
            <slot />
        </div>
     </div> 
 </div>