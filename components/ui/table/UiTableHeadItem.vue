<template>
    <th class="head-item">
        {{ title }}
        <button
            :class="sortBtnClass"
            v-if="sort"
            @click="onSortBy(sort)"    
        >
            <i class="sort-btn__icon">
                <app-icon name="carretDown" />
            </i>
        </button>
    </th>
</template>

<script lang="ts">export default { name: 'UiTableHeadItem' };</script>

<script setup lang="ts">
    interface TableHeadItemProps {
        title: string;
        sort?: string;
        sortField?: null | string;
        sortOrder?: null | string;
    }

    const props = defineProps<TableHeadItemProps>();

    const emit = defineEmits(['onSortBy']);

    const sortOrderValue = computed(() => {
        if (props.sortField === props.sort) {
            return props.sortOrder;
        } else {
            return null;
        }
    });

    const sortBtnClass = computed(() => {
        let className = 'sort-btn';
        if (sortOrderValue.value) {
            className += ' sort-btn--active';

            if (sortOrderValue.value === 'desc') {
                className += ' sort-btn--up';
            }
        }
        return className;
    });

    const onSortBy = (fieldName?: string) => {
        emit('onSortBy', fieldName);
    };
</script>

<style scoped lang="scss">
    .head-item {
        display: flex;
        align-items: center;
        padding: 20px;
        @include font($white, 16px, 20px, 700);
        text-transform: uppercase;
    }
    
    .sort-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-left: 5px;
        @include font($white, 16px, 20px, 700);
        border-radius: 50%;
        transition: background-color .3s;
        
        &--active {
            background-color:$primary-hover;
        }
        
        &--up {
            .sort-btn__icon {
                transform: rotateX(180deg);
            }
        }
        
        &__icon {
            display: inline-block;
            width: 20px;
            height: 20px;
            transition: transform .3s;
        }
    }
</style>