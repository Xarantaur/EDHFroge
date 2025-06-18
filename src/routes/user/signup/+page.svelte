<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import { toastStore } from '$lib/stores/toast.js';
	import { Eye, EyeOff } from 'lucide-svelte'

	export let form;

	$: if (form?.error) {
		toastStore.error(`❌ ${form.error}`);
	}
	
	let email="";
    let password="";
	let showPassword = false;
    let confirm="";
    let showConfirm= false;
</script>


<div class="flex items-start justify-center min-h-screen bg-gray-50 pt-32">
    
	<div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
		<h1 class="text-2xl font-bold mb-6 text-center">Sign Up</h1>
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
	<div class="relative">
			<input
				type={showConfirm ? 'text' : 'password'}
				name="confirm"
				bind:value={confirm}
				placeholder="Confirm Password"
				required
				class="p-3 pr-10 w-full rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
			/>
			<button
                type="button"
                class="absolute top-1/2 right-3 -translate-y-1/2 text-gray-600 focus:outline-none"
                on:click={() => (showConfirm = !showConfirm)}
            >
                {#if showConfirm}
                    <EyeOff size={20} />
                {:else}
                    <Eye size={20} />
                {/if}
	        </button>
	</div>
			<Button type="submit" variant="primary">Create Account</Button>
		</form>
	</div>
</div>
