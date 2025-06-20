<script lang="ts">
  import { BarChartSimple } from '@carbon/charts-svelte';
  import type { ParsedDeckCard } from '$lib/types/parsedDeckCard';
  import { ScaleTypes } from '@carbon/charts-svelte';

  export let deck: ParsedDeckCard[] = [];


  $: filteredDeck = deck.filter(entry => !entry.typeLine.includes('Land'))

  $: cmcData = (() => {
    const cmcValues = filteredDeck.map(entry => entry.cmc ?? 0);
    const maxCmc = Math.max(0, ...cmcValues);

    const cmcGroups = Array.from ({ length: maxCmc + 1}, (_, cmc) => {
      const count = filteredDeck.reduce((total, entry) => {
        const entryCmc = entry.cmc ?? 0;
        const quantity = entry.quantity ?? 1;
        return entryCmc === cmc ? total + quantity : total;
      }, 0)

      return { group: cmc.toString(), value: count }
    })

    return cmcGroups.filter(group => group.value > 0);
  })();

  $: averageCmc = (() => {
    const totalCmc = filteredDeck.reduce((sum, entry) => {
      const cmc = entry.cmc ?? 0;
      const quantity = entry.quantity ?? 1;
      return sum + (cmc * quantity);
    }, 0)

    const totalCards = filteredDeck.reduce((sum, entry) => {
      return sum + (entry.quantity ?? 1);
    }, 0)

    return totalCards > 0 ? (totalCmc / totalCards).toFixed(2) : '0.00'
})();

  const options = {
  title: 'Mana Curve',
  height: '200px',
  axes: {
    left: {
      mapsTo: 'value',
      scaleType: ScaleTypes.LINEAR,
      ticks: {
        formatter: (tick: number | Date, _i: number) =>
          typeof tick === 'number' && Number.isInteger(tick) ? tick.toString() : ''
      }
    },
    bottom: {
      mapsTo: 'group',
      scaleType: ScaleTypes.LABELS
    }
  },
  toolbar:{
    enabled: false
  },
  legend: {
  enabled: false
},
  tooltip: {
  enabled: false
},
 
}
</script>
<div class="bg-gray-200 mt-4 rounded">
<BarChartSimple data={cmcData} options={options} />
<p class="text-center font-bold">Average Mana Cost: {averageCmc}</p>
</div>