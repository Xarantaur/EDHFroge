<script lang="ts">
import type { DeckCard } from '$lib/types/cards'
export let card: DeckCard
export let mode: 'hover' | 'static' = 'hover';

</script>

{#if mode === 'static'}
	<img src={card.image_uris?.normal} alt={card.name} class="w-full rounded shadow" />
	{:else}
<li>
    <span class="relative inline-block group">
		<span class="text-gray-800 font-medium group-hover:text-orange-500 cursor-pointer">
			{card.name}
		</span>
													
			{#if card.image_uris?.normal}
				<div class="absolute top-0 left-full ml-4 w-64 z-50 pointer-events-none
				opacity-0 group-hover:opacity-100 transition-opacity duration-200">
					<img
						src={card.image_uris?.normal}
							alt={card.name}
							class="w-64 max-h-[80vh] rounded shadow-lg "
							/>
				</div>
			{/if}
	</span>
</li>
{/if}