<script>
	import '../app.css';
	import NavBar from '$lib/components/NavBar.svelte';
	import { Toaster } from 'svelte-french-toast';
	import { onMount } from 'svelte';
	import CardHoverPreview from '$lib/components/CardHoverPreview.svelte';

	export let data;

	onMount(() => {
		window.addEventListener('mousemove',(e) => {
			document.documentElement.style.setProperty('--mouse-x', '${e.pageX}px')
			document.documentElement.style.setProperty('--mouse-y', '${e.pageY}px')
		});
	});
</script>

<NavBar {data}>
	<img src="/latest edhforgelogotrans.png" alt="Logo" class="w-10 h-10" slot="logo" />
  </NavBar>


<slot />
<CardHoverPreview />
<Toaster 
position="top-center"
	toastOptions={{
		duration: 4000,
		style: 'background-color: #333; color: white;'
	}}
	/>