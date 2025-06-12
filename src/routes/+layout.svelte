<script>
	import '../app.css';
	import NavBar from '$lib/components/NavBar.svelte';
	import { onMount } from 'svelte';
	import CardHoverPreview from '$lib/components/CardHoverPreview.svelte';
	import Toaster from '$lib/components/Toaster.svelte'
	import '../app.css';
	import Footer from '$lib/components/Footer.svelte'
	

	export let data;
	const user = data.user
	
	onMount(() => {
		
		window.addEventListener('mousemove', (e) => {
		const previewWidth = 256; 
		const margin = 16; 

		const maxX = window.innerWidth - previewWidth - margin;
		const maxY = window.innerHeight - 300; 

		const clampedX = Math.min(e.pageX, maxX);
		const clampedY = Math.min(e.pageY, maxY);

		document.documentElement.style.setProperty('--mouse-x', `${clampedX}px`);
		document.documentElement.style.setProperty('--mouse-y', `${clampedY}px`);
	});
});
</script>


<div class="min-h-screen flex flex-col">
<NavBar {user}>
	<img src="/latest-edhforgelogotrans.png" alt="Logo" class="w-10 h-10" slot="logo" />
  </NavBar>

  <main class="flex-grow pb-24 pt-2">
    <slot />
  </main>
<Toaster />
<CardHoverPreview />

  <Footer />
</div>
