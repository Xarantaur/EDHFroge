<script lang="ts">
    export let name: string;

</script>

<div class="flex flex-col">
	<input
	id="deckName"
	type="text"
	bind:value={name}
	placeholder="Name your Deck"
	class="w-full p-2  rounded-b font-bold hover:bg-gray-100 bg-gray-200">
</div>