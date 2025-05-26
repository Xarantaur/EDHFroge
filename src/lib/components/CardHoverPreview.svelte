<script lang="ts">
	import { previewCard } from "$lib/stores/previewCardStore";
    import { fly } from 'svelte/transition'
    import { onMount } from 'svelte'
    import { get } from 'svelte/store'

    let card: any;
    $: previewCard.subscribe(value => (card = value));
</script>

{#if card}
    <div
    class="fixed pointer-events-none z-50 top-[var(--mouse-y,0px)] left-[var(--mouse-x,0px)] transform translate-x-4 translate-y-4">
    <img 
        src={card.image_uris?.normal}
        alt={card.name}
        class="w-64 max-h-[80vh] rounded shadow-lg"
        transition:fly={{ y: 8, duration: 150 }}
    />
    </div>
{/if}
