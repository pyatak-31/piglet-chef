<template>
    <td class="table-column">
        <slot></slot>
    </td>
</template>

<script setup>

</script>

<style scoped lang="scss">
    .table-column {
        display: inline-block;
        padding: 20px;
        @include font($dark, 16px, 20px, 400);
    }
</style>