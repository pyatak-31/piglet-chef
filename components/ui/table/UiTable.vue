<template>
    <table class="table">
            <thead class="table__header">
                <ui-table-row :col-sizes="colSizes">
                    <ui-table-head-item
                    class="table__header-item"
                    v-for="({ title, sortName }, index) in headItems"
                    :key="index"
                    :title="title"
                    :sort-name="sortName"
                    :sort-field="sortField"
                    :sort-order="sortOrder"
                    @on-sort-by="sortBy"
                    />
                </ui-table-row>
            </thead>
        <tbody class="table__body">
            <slot />
        </tbody>
    </table>
</template>

<script lang="ts">export default { name: 'UiTable' };</script>

<script setup lang="ts">
    interface TableHeadItem {
        title: string,
        sortName?: string,
    };

    interface TableProps {
        headItems: Array<TableHeadItem>,
        sortField?: string | null,
        colSizes: string,
    };

    const props = defineProps<TableProps>();

    const emit = defineEmits(['onSortBy']);

    const { sortOrder, getSortParams } = useSort();
   
    const sortBy = (sortField: string) => {
        emit('onSortBy', getSortParams(props.sortField, sortField));
    };
</script>

<style scoped lang="scss">
    .table {
        @include scrollbar();
        display: grid;
        grid-template: 60px 1fr / 1fr;
        width: 100%;
        border-radius: 7px;
        box-shadow: $shadow-1;
        overflow: auto;

        &__header {
            position: sticky;
            top: 0;
            display: block;
            background-color: $primary;
        }

        &__header-item {
            text-align: left;
        }

        &__body {
            display: block;
            background-color: $white;
        }
    }
</style>