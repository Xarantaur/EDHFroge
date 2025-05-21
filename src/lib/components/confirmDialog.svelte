<script  lang="ts">
	import Button from "./Button.svelte";

export let open = false;
export let title = '';
export let message = '';
export let confirmLabel = 'confirm';
export let cancelLabel = 'cancel';
export let confirmProps = {}
export let cancelProps = {}

export let onConfirm: () => void;
export let onCancel: () => void = () => (open = false);

function handleConfirm() {
    onConfirm?.();
    open = false;
}
</script>

{#if open}
	<div class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
		<div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm space-y-4">
			<h2 class="text-xl font-bold">{title}</h2>
			<p class="text-gray-700">{message}</p>

			<div class="flex justify-end gap-2 pt-4">
                <Button onClick={onCancel} type="button" {...cancelProps}>{cancelLabel}</Button>
                <Button onClick={handleConfirm} type="button" {...confirmProps}>{confirmLabel}</Button>
			</div>
		</div>
	</div>
{/if}