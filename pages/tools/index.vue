<template>
    <div class="tools">
        <div class="tools__head">
            <ui-title rank="1">
                Инструменты
            </ui-title>
    
            <nuxt-link to="/tools/create">
                <ui-button theme="success" rounded>Добавить</ui-button>
            </nuxt-link>
        </div>

        <span v-if="isLoading">Load/.....</span>
      
        <module-tools-table
            class="tools__table"
            v-else    
        />
    </div>
</template>

<script lang="ts">export default { name: 'ToolsPage' };</script>

<script setup lang="ts">
    definePageMeta({ middleware: ["auth"], pageTransition: { name: 'page' }});
    const { tools, isLoading, loadTools } = useTools();

    const tableHeads = ['#', 'Название', 'Описание', 'Фото', 'Действия'];
    const tableSizeColumns = '50px 1fr 2fr 150px 140px';

    await loadTools();
</script>

<style scoped lang="scss">
    .tools {

        &__head {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        &__table {
            margin-top: 50px;
        }
    }
</style>