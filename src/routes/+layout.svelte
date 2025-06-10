<script>
	import '../app.css';
	import NavBar from '$lib/components/NavBar.svelte';
	import { onMount } from 'svelte';
	import CardHoverPreview from '$lib/components/CardHoverPreview.svelte';
	import Toaster from '$lib/components/Toaster.svelte'
	

	export let data;
	const user = data.user
	
	onMount(() => {
		
		window.addEventListener('mousemove', (e) => {
		const previewWidth = 256; // or whatever max preview width you allow (e.g. 16rem)
		const margin = 16; // padding so it's not touching the edge

		const maxX = window.innerWidth - previewWidth - margin;
		const maxY = window.innerHeight - 300; // optional for height safety

		const clampedX = Math.min(e.pageX, maxX);
		const clampedY = Math.min(e.pageY, maxY);

		document.documentElement.style.setProperty('--mouse-x', `${clampedX}px`);
		document.documentElement.style.setProperty('--mouse-y', `${clampedY}px`);
	});
});
</script>

<NavBar {user}>
	<img src="/latest edhforgelogotrans.png" alt="Logo" class="w-10 h-10" slot="logo" />
  </NavBar>


<slot />
<Toaster />
<CardHoverPreview />

