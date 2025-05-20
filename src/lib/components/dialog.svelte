<script lang="ts">
	import Button from "./Button.svelte";

    export let open = false;

    export let title = 'Form';
    export let fields: {
        name: string;
        label: string;
        type?: string;
        value?: string;
        required?: boolean;
    }[] = [];
    
    let fieldValues: Record<string, string> = {};

    $: if (open) {
		fieldValues = Object.fromEntries(fields.map(f => [f.name, f.value ?? '']));
	}

</script>



{#if open}
<div class="fixed inset-0 z-50 flex justify-center items-center backdrop-blur-sm bg-white/10">
<form method="POST" class="pointer-events-auto bg-white/90 backdrop-blur-lg border border-gray-200 shadow-lg rounded-lg p-6 w-full max-w-md space-y-4">
	<h2 class="text-xl font-semibold">{title}</h2>

	{#each fields as field, index}
		<div class="flex flex-col gap-1">
			<label for={"field-" + index} class="text-sm font-medium">{field.label}</label>
			<input
				id={"field-" + index}
				name={field.name}
				class="p-2 border rounded"
				type={field.type ?? 'text'}
				bind:value={fieldValues[field.name]}
				required={field.required ?? true}
			/>
		</div>
	{/each}

	<div class="flex justify-end gap-2 pt-2">
		<Button onClick={() => ( open = false )} type="button" variant="secondary">Cancel</Button>
		<Button type="submit" variant="primary">Submit</Button>
	</div>
</form>
</div>
{/if}