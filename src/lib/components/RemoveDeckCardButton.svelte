<script lang="ts">
    export let onClick: (() => void) | undefined = undefined;
</script>

<button
type="button"
on:click={onClick}
class="w-6 h-6 flex items-center justify-center text-sm font-bold text-gray-500 hover:text-red-600 border border-gray-300 rounded-full hover:border-red-500 transition"
>
&minus;
</button>