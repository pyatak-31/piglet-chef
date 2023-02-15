<template>
    <app-form
        class="form-edit"
        :is-loading="isLoading"
        @on-submit="editTool(id, toolData)"
    >
        <ui-input
            id="tool_name"
            label="Название"
            placeholder="Введите название"
            required
            v-model.trim="toolData.name"
        />

        <ui-textarea
            id="tool_description"
            label="Описание"
            placeholder="Введите описание"
            rows="10"
            v-model.trim="toolData.description"
        />

        <ui-input
            id="tool_small_image"
            label="Малое изображение"
            placeholder="Введите адрес ссылки"
            v-model.trim="toolData.image.small"
        />

        <ui-input
            id="tool_medium_image"
            label="Среднее изображение"
            placeholder="Введите адрес ссылки"
            v-model.trim="toolData.image.medium"
        />

        <ui-input
            id="tool_full_image"
            label="Большое изображение"
            placeholder="Введите адрес ссылки"
            v-model.trim="toolData.image.full"
        />

        <div class="form-edit__buttons">
            <ui-button
                theme="info"
                type="submit"
            >
                Изменить
            </ui-button>

            <ui-button
                theme="secondary"
                outline
                @on-click="reset"
            >
                Стереть
            </ui-button>
        </div>
    </app-form>
</template>

<script lang="ts">export default { name: 'ModuleToolsFormCreate' };</script>

<script setup lang="ts">
    import { ToolRecord } from '~~/type/tools';

    const { tool, isLoading, editTool, clearTool } = useTools();

    interface ToolsFormCreateProps {
        id: string,
    }

    const props = defineProps<ToolsFormCreateProps>();
    
    const toolData = ref<ToolRecord>(JSON.parse(JSON.stringify(tool.value)));

    const reset = () => {
        toolData.value = JSON.parse(JSON.stringify(tool.value));   
    };

    onUnmounted(() => {
        clearTool();
    });
</script>

<style scoped lang="scss">
    .form-edit {
        
        &__buttons {
            display: flex;
            gap: 30px;
            margin-top: 30px;
        }
    }
</style>