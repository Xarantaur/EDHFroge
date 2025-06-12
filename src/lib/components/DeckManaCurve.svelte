<script lang="ts">
  import { BarChartSimple } from '@carbon/charts-svelte';
  import type { ParsedDeckCard } from '$lib/types/parsedDeckCard';
  import { ScaleTypes } from '@carbon/charts-svelte';
	import { Tooltip } from '@carbon/charts';

  export let deck: ParsedDeckCard[] = [];
  $: filteredDeck = deck.filter(entry => !entry.card.typeLine.includes('Land'))

  $: cmcData = (() => {
    const maxCmc = Math.max(0, ...filteredDeck.map(d => d.card.cmc));
    return Array.from({ length: maxCmc + 1 }, (_, cmc) => {
      const count = filteredDeck.reduce(
        (acc, entry) => entry.card.cmc === cmc ? acc + (entry.card.quantity ?? 1) : acc,
        0
      );
      return { group: cmc.toString(), value: count };
    }).filter(b => b.value > 0); 
  })();

  $: averageCmc = (() => {
  const total = filteredDeck.reduce((sum, entry) => {
    const quantity = entry.card.quantity ?? 1;
    return sum + (entry.card.cmc * quantity);
  }, 0);
  const count = filteredDeck.reduce((sum, entry) => sum + (entry.card.quantity ?? 1), 0);
  return count > 0 ? (total / count).toFixed(2) : '0.00';
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
<div class="bg-gray-200">
<BarChartSimple data={cmcData} options={options} />
<p>Average Mana Cost: {averageCmc}</p>
</div>