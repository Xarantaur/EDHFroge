<script>
	import '../app.css';
	import NavBar from '$lib/components/NavBar.svelte';
</script>

<NavBar >
	<img src="/edhforgefirst.png" alt="Logo" class="w-10 h-10" slot="logo" />
  </NavBar>

<slot />
