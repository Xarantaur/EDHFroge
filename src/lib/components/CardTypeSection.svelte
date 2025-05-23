<script lang="ts">
    import type { DeckCard } from "$lib/types/cards";
    import CardPreview from "./CardPreview.svelte";

    export let title: string;
    export let cards: DeckCard[] = []
</script>

<section class="mb-6">
    <h2 class="text-xl font-bold mb-2">{title}'s ({cards.length})</h2>
    <ul class="space-y-2">
        {#each cards as card}
        <CardPreview {card}/>
        {/each}
    </ul>
</section>