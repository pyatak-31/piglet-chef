<template>
    <section class="tool-edit">
        <ui-title rank="1">
            Редактирование
        </ui-title>

        <app-loader
            class="tool-edit__loader"
            v-if="isLoading && !tool"
        />

        <module-tools-form-edit
            class="tool-edit__form"
            :id="id"
            v-else-if="tool"
        />

        <span v-else-if="!isLoading && !tool">EMPTY</span>
    </section>
</template>

<script lang="ts">export default { name: 'ToolsEditPage' };</script>

<script setup lang="ts">
    definePageMeta({ middleware: ["auth"], pageTransition: { name: 'page' }});
    const { tool, isLoading, loadTool } = useTools();
    const route = useRoute();

    const id: string = route.params.id as string;
    await loadTool(id);
    
</script>

<style scoped lang="scss">
    .tool-edit {
        position: relative;
        min-height: 100%;

        &__form {  
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