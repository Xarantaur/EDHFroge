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
    <svg class="animate-spin h-4 w-4 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  {:else}
    <slot />
  {/if}
</button>
