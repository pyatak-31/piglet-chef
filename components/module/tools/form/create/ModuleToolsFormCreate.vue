<template>
    <app-form
        class="form-create"
        :is-loading="isLoading"
        @on-submit="createTool(newToolData)"
    >
        <ui-input
            label="Название"
            placeholder="Введите название"
            required
            v-model.trim="newToolData.name"
        />

        <ui-textarea
            label="Описание"
            placeholder="Введите описание"
            rows="10"
            v-model.trim="newToolData.description"
        />

        <ui-input
            label="Малое изображение"
            placeholder="Введите адрес ссылки"
            v-model.trim="newToolData.image.small"
        />

        <ui-input
            label="Среднее изображение"
            placeholder="Введите адрес ссылки"
            v-model.trim="newToolData.image.medium"
        />

        <ui-input
            label="Большое изображение"
            placeholder="Введите адрес ссылки"
            v-model.trim="newToolData.image.full"
        />

        <div class="form-create__buttons">
            <ui-button
                theme="success"
                type="submit"
            >
                Создать
            </ui-button>

            <ui-button
                theme="secondary"
                outline
                type="reset"
            >
                Стереть
            </ui-button>
        </div>
    </app-form>
</template>

<script lang="ts">export default { name: 'ModuleToolsFormCreate' };</script>

<script setup lang="ts">
    import { ToolRecord } from '~~/type/tools';

    const { isLoading, createTool } = useTools();

    const newToolData: ToolRecord = {
        name: '',
        description: '',
        image: {
            small: '',
            medium: '',
            full: ''
        }
    };
</script>

<style scoped lang="scss">
    .form-create {
        display: flex;
        flex-direction: column;
        gap: 20px;
        
        &__buttons {
            display: flex;
            gap: 30px;
            margin-top: 30px;
        }
    }
</style>