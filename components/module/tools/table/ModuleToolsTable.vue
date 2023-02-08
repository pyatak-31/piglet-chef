<template>
    <ui-table
        class="tools-table"
        :headItems="headItems"
        :sortField="sortField"
        :colSizes="gridColumn"
        @on-sort-by="sortBy"
    >
        <ui-table-row
            :colSizes="gridColumn"
            v-for="(tool, index) in tools"
            :key="tool.id"    
        >
            <ui-table-column>{{ index + 1 }}</ui-table-column>
            <ui-table-column>{{ tool.name }}</ui-table-column>
            <ui-table-column>{{ tool.description }}</ui-table-column>
            <ui-table-column>
                <div class="tools-table__image">
                    <img :src="tool.image.small" alt="terka">
                </div>
            </ui-table-column>
            <ui-table-column><ui-button>Clear</ui-button></ui-table-column>
        </ui-table-row>
    </ui-table>
</template>

<script lang="ts">export default { name: 'ModuleToolsTable' };</script>

<script setup lang="ts">
    const { tools, isLoading, sortField, sortOrder, loadTools, sortBy } = useTools();

    const headItems = [
        { title: '#' },
        { title: 'Название', sort: 'name' },
        { title: 'Описание', sort: 'description' },
        { title: 'Фото' },
        { title: 'Действия' },
    ];

    const gridColumn = '50px minmax(200px, 1fr) minmax(300px, 2fr) 120px 140px';
</script>

<style scoped lang="scss">
    .tools-table {
        max-height: 85vh;

        &__image {
            width: 65px;
        }
    }
</style>