<template>
    <th>
        {{ title }}
        <button
            v-if="sort"
            @click="onSortBy(sort)"    
        >
            {{ sort }}
        </button>
    </th>
</template>

<script lang="ts">export default { name: 'UiTableHeadItem' }</script>

<script setup lang="ts">
    interface TableHeadItem {
        title: string;
        sort?: string;
    }

    const props = defineProps<TableHeadItem>();

    const emit = defineEmits(['onSortBy']);

    // const emit = defineEmits<{
    //     (e: 'onSortBy', obj: { type: string, value?: string}): void
    // }>();

    const onSortBy = (fieldName?: string) => {
        emit('onSortBy', fieldName);
    };
</script>

<style scoped>

</style>