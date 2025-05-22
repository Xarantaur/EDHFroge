<script lang="ts">
    import Dialog from '$lib/components/dialog.svelte';
	import Button from '$lib/components/Button.svelte';
    import toast from 'svelte-french-toast';

	export let data: {
		user: {
			id: string;
			email: string;
            decks: [];
            createdAt: Date;
		};
	};

    
    let openDialog = false; 

    export let form: any;

    $: if (form?.success) {
	toast.success(' Password changed!')
    openDialog = false;
}
$: if (form?.error) {
	toast.error('❌ Something went wrong')
}
</script>


<Dialog
	bind:open={openDialog}
	title="Change Password"
    showFooter={false}
>
<form method="POST" class="space-y-4">
    <ul>
        <li>
            <input name="newPassword" type="password" placeholder="New Password" class="w-full p-2 border rounded" required>
        </li>
        <li>
            <input name="confirm" type="password" placeholder="Confirm Password" class="w-full p-2 border rounded" required>
        </li>
    </ul>
    <div>
    <Button type="button" variant="secondary" onClick={() => (openDialog = false)}>cancel</Button>
    <Button type="submit" variant="primary">Submit</Button>
</div>
</form>
</Dialog>

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
                <Button onClick={() => ( openDialog = true )} type="button" variant="primary">Change password</Button>
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
