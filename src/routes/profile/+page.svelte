<script lang="ts">
    import Dialog from '$lib/components/Dialog.svelte';
	import Button from '$lib/components/Button.svelte';
    import toast from 'svelte-french-toast';
    import { Tile, TileHeader, TileBody, TileFooter } from '$lib/components/Tile'
	import { tileStyles } from '$lib/components/Tile/tileStyles';

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
                <Button type="button" variant="secondary" onClick={() => (openDialog = false)}>cancel</Button>
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
                    
                    <li class={tileStyles.li}><p>🔄 Button to regenerate session (log out from everywhere)</p></li>
                </ul>
            </TileBody>
            <TileFooter><Button onClick={() => ( openDialog = true )} type="button" variant="primary">Change password</Button></TileFooter>
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
    <Tile>
        <TileHeader slot="header" title="Personalization" subtitle="" />
            <TileBody>
                <ul>
                    <li class={tileStyles.li}>❌ Delete account (with confirmation)</li>
                    <li class={tileStyles.li}>🚪 Log out of all sessions</li>
                </ul>
            </TileBody>
    </Tile>
</div>
