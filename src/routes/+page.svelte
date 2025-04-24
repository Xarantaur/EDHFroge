<script>
	import { errorToast } from '$lib/utils/toasters';
    import { toast } from '@zerodevx/svelte-toast';
</script>

<p> this will be ... </p>

<button on:click={() => errorToast('Manual test!')}>
	Show test toast
</button>