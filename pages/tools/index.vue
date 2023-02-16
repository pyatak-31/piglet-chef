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

        <app-loader
            class="tools__loader"
            v-if="isLoading && !tools"
        />
      
        <module-tools-table
            class="tools__table"
            v-else-if="!isLoading && tools"    
        />

        <span v-else-if="!isLoading && !tools">
        Empty</span>
    </div>
</template>

<script lang="ts">export default { name: 'ToolsPage' };</script>

<script setup lang="ts">
    definePageMeta({ middleware: ["auth"], pageTransition: { name: 'page' }});
    const { tools, isLoading, loadTools } = useTools();

    await loadTools();
</script>

<style scoped lang="scss">
    .tools {
        position: relative;
        min-height: 100%;

        &__head {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }

        &__table {
            margin-top: 50px;
        }

        &__loader {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
        }
    }
</style>