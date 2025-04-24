<script>
    import { toast } from '@zerodevx/svelte-toast';
</script>

<p> this will be ... </p>

<button on:click={() => toast.push('Manual test!', { duration: 6000 })}>
	Show test toast
</button>