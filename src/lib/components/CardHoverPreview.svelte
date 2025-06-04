<script lang="ts">
	import { previewCard } from "$lib/stores/previewCardStore";
    import { getLegalityMessage } from "$lib/utils/cardLegality";
    import { fly } from 'svelte/transition'
</script>

{#if $previewCard}
    <div
    class="fixed pointer-events-none z-50 top-[var(--mouse-y,0px)] left-[var(--mouse-x,0px)] transform translate-x-4 translate-y-4">
        <div class="relative w-full max-h-[12rem] sm:max-w-[16rem] max-h-[80vh]">
            <picture>
                <source srcset={$previewCard.card.image_uris.small} media="(max-width: 640px)" />
                <img 
                    src={$previewCard.card.image_uris?.normal} 
                    alt={$previewCard.card.cardName}
                    class="w-auto h-auto max-h-[80vh] rounded shadow-lg"
                    transition:fly={{ y: 8, duration: 150 }}
                />
           <!--  </picture> -->
            {#if getLegalityMessage($previewCard.card, $previewCard.commander ?? undefined)}
				<div class="absolute inset-0 bg-black/60 flex items-center justify-center rounded">
					<p class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-500 font-bold text-xl italic rotate-[-15deg]">
						{getLegalityMessage($previewCard.card, $previewCard.commander ?? undefined)}
					</p>
				</div>
			{/if}
        </div>
    </div>
{/if}
