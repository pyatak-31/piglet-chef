<template>
    <section class="tool-create">
        <ui-title rank="1">
            Создать инструмент
        </ui-title>

        <module-tools-form-create class="tool-create__form" />
    </section>
</template>

<script lang="ts">export default { name: 'ToolsCreatePage' };</script>

<script setup lang="ts">
    definePageMeta({ middleware: ["auth"], pageTransition: { name: 'page' }});
</script>

<style scoped lang="scss">
    .tool-create {

        &__form {  
            margin-top: 50px;
        }
    }
</style>