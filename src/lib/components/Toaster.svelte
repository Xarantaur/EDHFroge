<script lang="ts">
    import { toastStore } from '$lib/stores/toast';
</script>

<div class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 space-y-2">
    {#each $toastStore as toast (toast.id)}
        <div
            class="px-4 py-2 rounded shadow text-white text-sm max-w-sm w-full transition-all duration-300 animate-fade-in-out"
            class:bg-green-500={toast.type === 'success'}
            class:bg-red-500={toast.type === 'error'}
        >
            {toast.message}
            
        </div>
    {/each}
</div>

<style>
    @keyframes fade-in-out {
        0% { opacity: 0; transform: translateY(-100%)}
        10% { opacity: 1; transform: translateY(0)}
        100% { opacity: 0; transform: translateY(-10px)}
    }

    .animate-fade-in-out {
        animation: fade-in-out 3s ease-in-out forwards
    }
</style>