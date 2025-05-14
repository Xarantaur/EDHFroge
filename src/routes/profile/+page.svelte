<script lang="ts">
	import { error } from '@sveltejs/kit';
    import toast from 'svelte-french-toast'
	export let data: {
		user: {
			id: string;
			email: string;
            decks: [];
            createdAt: Date;
		};
	};

    import Dialog from '$lib/components/dialog.svelte'
    let open = false; 

    const handlePasswordSubmit = async (form: FormData) => {
        await fetch('/profile', {method: 'POST', body: form})
        open = false;
    }
    export let form: any;
</script>

{#if form?.success} 
    {toast.success('Password Changed')}
{/if}
{#if form?.error}
    {toast.error('❌ something went wrong')}
{/if}

<Dialog
	bind:open={open}
	title="Change Password"
	fields={[
		{ name: 'newPassword', label: 'New Password', type: 'password', required: true },
		{ name: 'confirm', label: 'Confirm Password', type: 'password', required: true }
	]}
	onSubmit={handlePasswordSubmit}
/>

<div class="flex items-start justify-center p-4">
    <div class="bg-orange-100 shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 class="font-bold">Profile Information</h1> 
        <ul>
            <li class="px-4 py-1 rounded hover:bg-orange-200 cursor-pointer"><p class="font-medium">Email:</p> {data.user.email}</li>
            <li class="px-4 py-1 rounded hover:bg-orange-200 cursor-pointer"><p class="font-medium">User-Id:</p> {data.user.id}</li>
            <li class="px-4 py-1 rounded hover:bg-orange-200 cursor-pointer"><p class="font-medium">Decks:</p> {data.user.decks.length}</li>
            <li class="px-4 py-1 rounded hover:bg-orange-200 cursor-pointer"><p class="font-medium">Member Since:</p> {data.user.createdAt}</li>
         </ul>
    </div>
</div>

<div class="flex items-start justify-center p-4">
    <div class="bg-orange-100 shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 class="font-bold">security</h1>
       <ul>
             <li class="px-4 py-2 rounded">
                <button on:click={() => (open = true)} class="text-white bg-orange-600 hover:bg-orange-400 px-4 py-2 rounded">Change password</button>
            </li>
            <li class="px-4 py-2 rounded hover:bg-orange-200 hover:text-orange-400">
                🔄 Button to regenerate session (log out from everywhere)
            </li>
       </ul>
    </div>
</div>

<div class="flex items-start justify-center p-4">
    <div class="bg-orange-100 shadow-lg rounded-lg p-8 w-full max-w-md">
        <h1 class="font-medium">Personalization</h1>
            <ul>
                <li class="px-4 py-1 rounded hover:bg-orange-200 hover:text-orange-400 ">🧙‍♂️ Avatar (Gravatar or uploaded)</li>
                <li class="px-4 py-1 rounded hover:bg-orange-200 hover:text-orange-400 ">🧾 Bio / About me</li>
                <li class="px-4 py-1 rounded hover:bg-orange-200 hover:text-orange-400 ">🎨 Theme or UI preferences (light/dark, card style, etc.)</li>
            </ul>
    </div>
</div>

<div class="flex items-start justify-center p-4">
    <div class="bg-orange-100 shadow-lg rounded-lg p-8 w-full max-w-md">

        <h1 class="font-medium">Danger Zone</h1>
        <ul>
             <li class="px-4 py-1 rounded hover:bg-orange-200 hover:text-orange-400 ">❌ Delete account (with confirmation)</li>
            <li class="px-4 py-1 rounded hover:bg-orange-200 hover:text-orange-400 ">🚪 Log out of all sessions</li>
            
            </ul>
        </div>
</div>
