<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { toastStore } from '$lib/stores/toast.js';
	
	export let form;
 	let email="";
    let password="";

	$: if (form?.error) {
		toastStore.error('Wrong email or password')
	}
</script>



<div class="flex items-start justify-center min-h-screen bg-gray-50 pt-32">
    
	<div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
		<h1 class="text-2xl font-bold mb-6 text-center">Log In</h1>
		<form method="POST" class="flex flex-col gap-4">
			<input
				type="email"
				name="email"
				bind:value={email}
				placeholder="Email"
				required
				class="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
			/>

			<input
				type="password"
				name="password"
				bind:value={password}
				placeholder="Password"
				required
				class="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
			/>

			<Button type="submit" variant="primary" >Log In</Button>
		</form>
		<a href="/forgot-password" class="block w-full mt-4 flex flex-col">
		<Button type="button" variant="secondary">Forgot Password</Button>
		</a>
	</div>
</div>
