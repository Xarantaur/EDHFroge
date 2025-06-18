<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { toastStore } from '$lib/stores/toast.js';
	import { Eye, EyeOff } from 'lucide-svelte';
	
	export let form;
 	let email="";
    let password="";
	let showPassword = false;

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
			
			<div class="relative">
			<input
				type={showPassword ? 'text' : 'password'}
				name="password"
				bind:value={password}
				placeholder="Password"
				required
				class="p-3 pr-10 w-full rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
			/>
					<button
		type="button"
		class="absolute top-1/2 right-3 -translate-y-1/2 text-gray-600 focus:outline-none"
		on:click={() => (showPassword = !showPassword)}
	>
		{#if showPassword}
			<EyeOff size={20} />
		{:else}
			<Eye size={20} />
		{/if}
	</button>
				</div>
			<Button type="submit" variant="primary" >Log In</Button>
		</form>
		<a href="/user/forgot-password" class="block w-full mt-4 flex flex-col">
		<Button type="button" variant="secondary">Forgot Password</Button>
		</a>
	</div>
</div>
