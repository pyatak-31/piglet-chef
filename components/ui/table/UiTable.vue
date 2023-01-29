<template>
    <div class="table-wrapper">
        <div class="table">
            <div
                class="table__head"
                :style="{ 'grid-template-columns': columnsTemplates }"    
            >
                <div
                    class="table__title"
                    v-for="(title, index) in head"
                    :key="index"    
                >
                    {{ title }}
                </div>
            </div>
            <slot />
        </div>
    </div>
</template>

<script lang="ts">export default { name: 'UiTable' }</script>

<script setup lang="ts">
    interface TableProps {
        head?: Array<string>;
        columnsTemplates?: string;
    }

    const props = defineProps<TableProps>();
</script>

<style scoped lang="scss">
    .table {
        width: 100%;
        margin-top: 15px;
        margin-bottom: 40px;
        background-color: #fff;

        &-wrapper {
            display: flex;
            justify-content: center;
        }

        &__head {
            display: grid;
            align-items: center;
            column-gap: 10px;
            padding: 5px 16px;
            background-color: #fff;
            border-bottom: 2px solid #eeeff4;
        }

        &__row {
            display: grid;
            align-items: center;
            column-gap: 10px;
            padding: 5px 16px;
            background-color: #fff;
            border-bottom: 2px solid #eeeff4;
            

            // @media (min-width: $md) {
            //     display: grid;
            // }

            &:last-child {
                border-bottom: none;
            }

            &--center {
                justify-content: center;
            }
        }

        &__column {
            position: relative;
            padding-top: 15px; 
            padding-bottom: 15px;

            &-image {}

            &-title {
                margin-right: 5px;
            }
        }
    }
</style>