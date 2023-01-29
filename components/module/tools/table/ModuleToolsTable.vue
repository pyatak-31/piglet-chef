<template>
    <ui-table-2
        :headItems="headItems"
        :sortOrder="sortOrder"
        @on-sort-by="sortBy"
    >

    </ui-table-2>
</template>

<script lang="ts">export default { name: 'ModuleToolsTable' }</script>

<script setup lang="ts">
    const { tools, isLoading, sortOrder, loadTools, sortBy } = useTools();
    
    const headItems = [
        { title: '#' },
        { title: 'Название', sort: 'name' },
        { title: 'Описание', sort: 'description' },
        { title: 'Фото' },
        { title: 'Действия' },
    ];
</script>

<style scoped>

</style>