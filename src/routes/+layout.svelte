<script>
	import '../app.css';
	import NavBar from '$lib/components/NavBar.svelte';
	import { Toaster } from 'svelte-french-toast';
	

	export let data;


</script>

<NavBar {data}>
	<img src="/latest edhforgelogotrans.png" alt="Logo" class="w-10 h-10" slot="logo" />
  </NavBar>



<slot />
<Toaster 
position="top-center"
	toastOptions={{
		duration: 4000,
		style: 'background-color: #333; color: white;'
	}}
	/>