<template>
    <table class="table">
        <thead class="table__header">
            <tr class="table__row table-header">
                <ui-table-head-item
                    v-for="(headItem, index) in headItems"
                    :key="index"
                    :title="headItem.title"
                    :sort="headItem.sort"
                    @on-sort-by="sortBy"
                />
            </tr>
        </thead>
        <tbody class="table__body">
            <tr class="table__row">
                <td>1</td>
                <td>Arrow</td>
                <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, recusandae?</td>
                <td><img src="https://i.ibb.co/2k5j7gM/terka.jpg" alt="terka" border="0"></td>
                <td><ui-button>Clear</ui-button></td>
            </tr>
            <tr class="table__row">
                <td>1</td>
                <td>Arrow</td>
                <td>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, recusandae?</td>
                <td><img src="https://i.ibb.co/2k5j7gM/terka.jpg" alt="terka" border="0"></td>
                <td><ui-button>Clear</ui-button></td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">export default { name: 'UiTable' }</script>

<script setup lang="ts">
    interface TableHeadItem {
        title: string,
        sort?: string,
    };

    interface TableProps {
        headItems: Array<TableHeadItem>,
    };

    interface SortParams {
        // type: string,
        value?: string,
    };

    const props = defineProps<TableProps>();

    const emit = defineEmits(['onSortBy']);

    // const sortType = 'asc';

    const sortBy = (fieldName?: string) => {
        emit('onSortBy', fieldName);
    };
</script>

<style scoped lang="scss">
    .table {
        display: block;
        width: 100%;
        margin-top: 15px;
        margin-bottom: 40px;
        background-color: #fff;

        &__header {
            display: block;
        }

        &__body {
            display: block;
        }

        &__row {
            display: grid;
            grid-template-columns: 50px 1fr 2fr 150px 140px;

        }
    }

    .table-header {
        text-align: left;
    }
</style>