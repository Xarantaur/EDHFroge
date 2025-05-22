<script lang="ts">
    import type { DeckCard } from '$lib/types/cards'
	export let cards: DeckCard[] = []

	const MAIN_TYPES = [
		"Creature",
		"Instant",
		"Sorcery",
		"Artifact",
		"Enchantment",
		"Planeswalker",
		"Battle",
		"Land"
	]

	$: groupedCards = MAIN_TYPES.reduce((acc, type) => {
		const matches = cards.filter(card => card.type_line.includes(type));
		if (matches.length > 0 ) acc[type] = matches;
		return acc;
	}, {} as Record<string, DeckCard[]>)

</script>

<div class="flex items-center justify-center min-h-screen px-4">
	<div class="bg-gray-200 shadow p-6 w-full max-w-4xl h-[90vh]">
		<div class="overflow-y-auto h-full pr-2">
			{#each Object.entries(groupedCards) as [type, cardsOfType]}
				<section class="mb-6">
					<h2 class="text-xl font-bold mb-2">{type}</h2>
								<ul class="space-y-2">
									{#each cardsOfType as card} 
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
									{/each}
								</ul>							
				</section>
			{/each}
		</div>
	</div>
</div> 