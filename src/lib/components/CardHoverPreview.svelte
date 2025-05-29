<script lang="ts">
	import { previewCard } from "$lib/stores/previewCardStore";
    import { fly } from 'svelte/transition'
</script>

{#if $previewCard}
    <div
    class="fixed pointer-events-none z-50 top-[var(--mouse-y,0px)] left-[var(--mouse-x,0px)] transform translate-x-4 translate-y-4">
    <img 
        src={$previewCard.imageUrl?.normal}
        alt={$previewCard.cardName}
        class="w-64 max-h-[80vh] rounded shadow-lg"
        transition:fly={{ y: 8, duration: 150 }}
    />
    </div>
{/if}
