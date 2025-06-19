<script>
    import { browser } from '$app/environment'
	import Button from "./Button.svelte";


let cookieBannerAccept = false;

if(browser) {
    const stored = localStorage.getItem('cookieAccepted');
    cookieBannerAccept = stored === 'true'
}

function acceptCookies() {
    localStorage.setItem('cookieAccepted', 'true');
    cookieBannerAccept = true;
}

</script>


{#if !cookieBannerAccept}
    <div class="fixed bottom-1 left-1/2 -translate-x-1/2 z-50 bg-red-300 w-100 h-35 p-2 border border-red-500">
        <div class="flex flex-col justify-center items-center">
            <p class="font-bold text-center">this site uses cookies, by using this site you accept that the sites store cookies in your browser to recognize you.</p>
            <Button type="button" variant="primary" onClick={acceptCookies}>Accept</Button>
        </div>
    </div>
{/if}