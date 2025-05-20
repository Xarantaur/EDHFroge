<script lang="ts">
    export let cards: { name: string; image_uris?: { normal?: string } }[] = [];

</script>


<div class="flex items-center justify-center min-h-screen px-4">
	<div class="bg-gray-200 rounded shadow p-6 w-full max-w-4/6 h-[90vh]">
		<div class="overflow-y-auto h-full pr-2">
			<ul class="relative space-y-2">
				{#each cards as card (card.name)} 
						<li class="relative group p-2 bg-white rounded hover:bg-orange-100 transition">
							<div class="text-gray-900 font-medium">{card.name}</div>

							{#if card.image_uris?.normal}
								<div class="absolute left-0 top-0 translate-x-full ml-4 z-50 hidden group-hover:block pointer-events-none">
                                    <img
                                        src={card.image_uris?.normal}
                                        alt={card.name}
                                        class="w-64 max-h-[80vh] rounded shadow-lg"
                                    />
                                </div>
							{/if}
					</li>
				{/each}
			</ul>
		</div>
    </div>
</div>