<script lang="ts">
	import Button from "$lib/components/Button.svelte";

    
	export let form;
	let email="";
</script>


<div class="flex items-start justify-center min-h-screen bg-gray-50 pt-32">
    
	<div class="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
		<h1 class="text-2xl font-bold mb-6 text-center">Reset password</h1>

		<form method="POST" class="flex flex-col gap-4">
			<input
				type="email"
				name="email"
				bind:value={email}
				placeholder="Email"
				required
				class="p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
			/>
			<Button type="submit" variant="primary" >reset password</Button>
		</form>
	</div>
</div>
