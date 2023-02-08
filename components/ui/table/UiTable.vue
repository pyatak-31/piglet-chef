<template>
    <table class="table">
            <thead class="table__header">
                <ui-table-row :col-sizes="colSizes">
                    <ui-table-head-item
                    class="table__header-item"
                    v-for="(headItem, index) in headItems"
                    :key="index"
                    :title="headItem.title"
                    :sort="headItem.sort"
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
    import { SortOrder } from '~~/type/sorting';

    interface TableHeadItem {
        title: string,
        sort?: string,
    };

    interface TableProps {
        headItems: Array<TableHeadItem>,
        sortField?: string | null,
        colSizes: string,
    };

    const props = defineProps<TableProps>();

    const emit = defineEmits(['onSortBy']);

    const sortOrder = ref<SortOrder>(null);

    const sortBy = (sortField: string) => {
        if (props.sortField === sortField) {
            switch (sortOrder.value) {
                case null: sortOrder.value = 'asc'; break;
                case 'asc': sortOrder.value = 'desc'; break;
                case 'desc': sortOrder.value = null; break;
            }
        } else {
            sortOrder.value = 'asc';
        }

        emit('onSortBy', { sortField, sortOrder: sortOrder.value });
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