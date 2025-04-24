<script>
	import '../app.css';
	import NavBar from '$lib/components/NavBar.svelte';
	import { SvelteToast } from '@zerodevx/svelte-toast';

	const options = {
		duration: 4000,
		intro: { x: 256 }
	}
</script>

<NavBar >
	<img src="/latest edhforgelogotrans.png" alt="Logo" class="w-10 h-10" slot="logo" />
  </NavBar>

  <SvelteToast {options}/>
<slot />
