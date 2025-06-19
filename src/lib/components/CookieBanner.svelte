<script>
	import Button from "./Button.svelte";


let cookieBannerAccept = false;

let userCanUsesite = true

</script>


{#if !cookieBannerAccept}
    <div class="fixed bottom-1 left-1/2 -translate-x-1/2 z-50 bg-red-300 w-100 h-35 p-2 border border-red-500">
        <div class="flex flex-col justify-center items-center">
            <p class="font-bold text-center">this site uses cookies, by using this site you accept that the sites store cookies in your browser to recognize you.</p>
            <div class="flex gap-2 pt-2">
            <Button type="button" variant="primary" onClick={() => (cookieBannerAccept = true)}>Accept</Button>
            <Button type="button" variant="danger" onClick={() => (userCanUsesite = false)}>cancel</Button>
            </div>
        </div>
    </div>
{/if}