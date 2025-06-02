<script lang=ts>
	import Button from "./Button.svelte";

  export const title = "EDH Forge";
  export let data: { user: string | null };
</script>

<nav class="bg-gray-900 text-white px-6 py-4 shadow-md">
  <div class="max-w-7xl mx-auto flex items-center justify-between">
    
    <a href="/" class="flex items-center gap-3 text-white hover:text-orange-400 font-bold">
      <slot name="logo" />
      {title}
    </a>

    <ul class="flex gap-6 text-sm font-medium items-center">
      {#if data.user}
      <li><a href="/decks" class="hover:text-orange-400">Decks</a></li>
      <li><a href="/profile" class="hover:text-orange-400">Profile</a></li>
      <li>
          <form method="POST" action="/logout">
            <Button type="submit" variant="primary">Logout</Button>
          </form>
        </li>
      {:else}
      <li><a href="/login" class="hover:text-orange-400">Login</a></li>
       <li><a href="/signup" class="text-white bg-orange-600 hover:bg-orange-400 px-4 py-2 rounded">Sign Up</a></li>
      {/if}
    </ul>
  </div>
</nav>