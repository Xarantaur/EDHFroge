<script>
  export let title = "EDH Forge";
</script>

<nav class="bg-gray-900 text-white px-6 py-4 shadow-md">
  <div class="max-w-7xl mx-auto flex items-center justify-between">
    
    <a href="/" class="flex items-center gap-3 text-white hover:text-orange-400 font-bold">
      <slot name="logo" />
      {title}
    </a>

    <ul class="flex gap-6 text-sm font-medium">
      <li><a href="/login" class="hover:text-orange-400">Login</a></li>
      <li><a href="/signup" class="text-white bg-orange-600 hover:bg-orange-400 focus:ring-4 focus:ring-orange-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 dark:bg-orange-600 dark:hover:bg-orange-700 focus:outline-none dark:focus:ring-orange-800">Sign Up</a></li>
    </ul>
  </div>
</nav>