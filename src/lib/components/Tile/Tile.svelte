<script lang="ts">
    import { tileStyles } from "./tileStyles";
    export let className: string = "";
</script>
   
<div class={`${tileStyles.base} ${className}`}>
    <slot name="header" />
    <slot />
    <slot name="footer"/>
</div>