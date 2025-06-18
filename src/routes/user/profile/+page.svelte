<script lang="ts">
    import Dialog from '$lib/components/Dialog.svelte';
	import Button from '$lib/components/Button.svelte';
    import type { PublicUser } from '$lib/types/PublicUser';
    import { Tile, TileHeader, TileBody } from '$lib/components/Tile'
	import { tileStyles } from '$lib/components/Tile/tileStyles';
    import { toastStore } from '$lib/stores/toast';
    import { Eye, EyeOff } from 'lucide-svelte'
	
	

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
    }

    export let form: any;
    let showPassword = false;
    let showConfirm = false;

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
            <div class="relative">
			<input
				type={showPassword ? 'text' : 'password'}
				name="newPassword"
				
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
				
				placeholder="confirm"
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
                <ul class="flex flex-col p-4 space-y-4">
                    <Button onClick={() => ( openPasswordDialog = true )} type="button" variant="primary">Change password</Button>
                    <Button onClick={() => (openDeleteDialog = true) } type="button" variant="primary">Delete Account</Button>
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
