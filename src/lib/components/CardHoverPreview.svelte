<script lang="ts">
	import { previewCard } from "$lib/stores/previewCardStore";
	import type { ParsedDeckCard } from "$lib/types/parsedDeckCard";
	import { getLegalityMessage } from "$lib/utils/cardLegality";
	import { fly } from 'svelte/transition';

	function getImageUri(card: ParsedDeckCard, type = 'normal'): string {
		return card.images.find((img) => img.imageType === type)?.uri ?? '';
	}
</script>

{#if $previewCard}
	<div class="fixed pointer-events-none z-50 top-[var(--mouse-y,0px)] left-[var(--mouse-x,0px)] transform translate-x-4 translate-y-4">
		<div class="relative w-[min(90vw,256px)] max-h-[70vh]">
			<picture>
				<source srcset={getImageUri($previewCard.card, 'normal')} media="(max-width: 640px)"/>
				<img
					src={getImageUri($previewCard.card, 'normal')}
					alt={$previewCard.card.card.cardName}
					class="w-full h-auto rounded shadow-lg"
					transition:fly={{ y: 8, duration: 150, x: 4 }}
					/>
			</picture>

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
