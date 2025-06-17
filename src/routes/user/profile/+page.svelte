<script lang="ts">
    import Dialog from '$lib/components/Dialog.svelte';
	import Button from '$lib/components/Button.svelte';
    import type { PublicUser } from '$lib/types/PublicUser';
    import { Tile, TileHeader, TileBody } from '$lib/components/Tile'
	import { tileStyles } from '$lib/components/Tile/tileStyles';
    import { toastStore } from '$lib/stores/toast';
	import { goto } from '$app/navigation';
	
	

	export let data: {
		user:PublicUser
	};
    let openDeleteDialog = false;
    let openPasswordDialog = false; 

    async function confirmDeleteUser() {
        const res = await fetch(`/user/delete/${data.user.id}`, {
            method: 'DELETE'
        });
        
        if(!res.ok){
            toastStore.error('Failed to Delete Account')
        }

        toastStore.success('account deleted')
        window.location.href = '/user/login'
        /* goto('/user/login', {invalidateAll: true}) */
    }

    export let form: any;

    $: if (form?.success) {
	toastStore.success(' Password changed!')
    openPasswordDialog = false;
    }
    $: if (form?.error) {
        toastStore.error('❌ Something went wrong')
    }
</script>

<Dialog
    bind:open={openDeleteDialog}
    title="Delete Account"
    onConfirm={confirmDeleteUser}
    showFooter={true}
    >
    <p>
        are you sure you want to delete your account? this action is <strong>permanent</strong> and cannot be undone.
    </p>
</Dialog>

<Dialog
	bind:open={openPasswordDialog}
	title="Change Password"
    showFooter={false}
>
    <form method="POST" class="space-y-4">
        <ul>
            <li>
                <input 
                name="newPassword" 
                type="password" 
                placeholder="New Password" 
                class="w-full p-2 border rounded" 
                required>
            </li>
            <li>
                <input
                 name="confirm" 
                 type="password" 
                 placeholder="Confirm Password" 
                 class="w-full p-2 border rounded" 
                 required>
            </li>
        </ul>
            <div>
                <Button type="button" variant="secondary" onClick={() => (openPasswordDialog = false)}>cancel</Button>
                <Button type="submit" variant="primary">Submit</Button>
            </div>
    </form>
</Dialog>

<div class="flex flex-col gap-6 items-center min-h-screen p-4">
    <Tile>
        <TileHeader slot="header" title="Profile Information" subtitle="" />
            <TileBody>
                <ul>
                    <li class={tileStyles.li}><p class="font-medium">Email:</p> {data.user.email}</li>
                    <li class={tileStyles.li}><p class="font-medium">User-Id:</p> {data.user.id}</li>
                    <li class={tileStyles.li}><p class="font-medium">Decks:</p> {data.user.decks.length}</li>
                    <li class={tileStyles.li}><p class="font-medium">Member Since:</p> {data.user.createdAt}</li>
                </ul>
            </TileBody>
    </Tile>
    <Tile>
        <TileHeader slot="header" title="Security" subtitle="" />
            <TileBody>
                <ul>
                    <Button onClick={() => ( openPasswordDialog = true )} type="button" variant="primary">Change password</Button>
                    <Button onClick={() => (openDeleteDialog = true) } type="button" variant="primary">Delete Account</Button>
                    <li class={tileStyles.li}> <p>possible delete button</p></li>
                </ul>
            </TileBody>
            
    </Tile>
    <Tile>
        <TileHeader slot="header" title="Personalization" subtitle="" />
            <TileBody>
                <ul>
                        <li class={tileStyles.li}>🧙‍♂️ Avatar (Gravatar or uploaded)</li>
                        <li class={tileStyles.li}>🧾 Bio / About me</li>
                        <li class={tileStyles.li}>🎨 Theme or UI preferences (light/dark, card style, etc.)</li>
                </ul>
            </TileBody>
    </Tile>
</div>
