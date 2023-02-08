<template>
    <tr
        class="table-row"
        :style="{ 'grid-template-columns': colSizes }"
    >
        <slot></slot>
    </tr>
</template>

<script lang="ts">export default { name: 'UiTableRow' };</script>

<script setup lang="ts">
    interface TableRowProps {
        colSizes: string;
    }

    const props = defineProps<TableRowProps>();
</script>

<style lang="scss">
    .table-row {
        display: grid;
        transition: background-color .3s;

        &:nth-child(even) {
            background-color: #f8f8f8;
        }

        &:hover {
            background-color: $primary-20;
        }
    }
</style>