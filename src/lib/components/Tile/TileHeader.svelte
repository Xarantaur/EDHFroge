<script lang="ts">
    import { tileStyles } from "./tileStyles";
    export let title: string;
    export let subtitle: string;
</script>

<div class={tileStyles.header}>
    <h2 class={tileStyles.title}>{title}</h2>
    {#if subtitle} 
        <p class={tileStyles.subtitle}></p>
    {/if}
</div>