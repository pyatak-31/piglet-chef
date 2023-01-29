<template>
    <div
        class="table__row"
        :style="{ 'grid-template-columns': columnsTemplates }"    
    >
        <slot></slot>
    </div>
</template>

<script lang="ts">export default { name: 'UiTableRow' }</script>

<script setup lang="ts">
    interface TableRowProps {
        columnsTemplates?: string;
    }

    const props = defineProps<TableRowProps>();
</script>

<style lang="scss">
    // .tabler
</style>