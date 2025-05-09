<script lang="ts">
import toast from 'svelte-french-toast';     
	export let form;

	$: if (form?.success) {
		toast.success('🎉 Signup successful!');
	}
	$: if (form?.error) {
		toast.error(`❌ ${form.error}`);
	}
	
	let email="";
    let password="";
    let confirm="";
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

			<input
				type="password"
				name="password"
				bind:value={password}
				placeholder="Password"
				required
				class="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
			/>

			<input
				type="password"
				name="confirm"
				bind:value={confirm}
				placeholder="Confirm Password"
				required
				class="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
			/>

			<button
				type="submit"
				class="bg-orange-600 text-white p-3 rounded hover:bg-orange-700 transition"
			>
				Create Account
			</button>
		</form>
	</div>
</div>
