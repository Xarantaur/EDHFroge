<script lang="ts">
  export let onClick: (() => void) | undefined = undefined;
  export let type: 'button' | 'submit' = 'button';
  export let variant: 'primary' | 'secondary' | 'danger' = 'primary';
  export let loading: boolean = false;
</script>

<button
  type={type}
  on:click={onClick}
  class={`px-4 py-2 rounded font-semibold transition ${
    variant === 'primary' ? 'bg-orange-600 text-white hover:bg-orange-700' :
    variant === 'secondary' ? 'bg-gray-200 text-black hover:bg-gray-300' :
    'bg-red-600 text-white hover:bg-red-700'
  }`}
  disabled={loading}
>
  {#if loading}
    <span>Loading...</span>
  {:else}
    <slot />
  {/if}
</button>
