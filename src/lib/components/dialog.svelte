<script lang="ts">
	import { onDestroy, onMount } from "svelte";
import Button from "./Button.svelte";

	export let open = false;
    export let title = 'Form';
    export let showFooter = true;

	export let onConfirm: () => void = () => {}
	
	function confirmAction() {
	onConfirm();
	open = false;
	}

	export let slotClass: string = "[&_ul>li]:mb-2 [&_p]:mb-3 [&_label]:block [&_input]:w-full [&_input]:p-2 [&_input]:rounded [&_input]:border"
</script>
<svelte:window on:keydown={(e) => {
    if (e.key === 'Escape') open = false;
  }} />


{#if open}
<div role="button" 
tabindex="0"
aria-hidden="true" 
class="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-white/10"
on:click={() => (open = false)}
	>
	<div
	role="presentation"
	aria-hidden="true" 
	class="pointer-events-auto bg-white/90 backdrop-blur-lg border-gray-200 shadow-lg p-6 w-full max-w-md space-y-4"
	on:click|stopPropagation
	 >
		<h2 class="text-xl font-semibold">{title}</h2>
				<div class={`space-y-4 ${slotClass}`}>
				<slot />
					</div>

				{#if showFooter}
					<div class="flex justify-end gap-2 pt-4 border-t border-gray-200 mt-4 pt-4">
							<Button onClick={() => ( open = false )} type="button" variant="secondary">Cancel</Button>
							<Button onClick={confirmAction} type="button" variant="primary">Confirm</Button>
					</div>
				{/if}
	</div>
</div>
{/if}