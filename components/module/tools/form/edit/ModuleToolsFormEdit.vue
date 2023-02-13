<template>
    <app-form
        class="form-edit"
        :is-loading="isLoading"
        @on-submit="editTool(id, toolData)"
    >
        <ui-input
            label="Название"
            placeholder="Введите название"
            required
            v-model.trim="toolData.name"
        />

        <ui-textarea
            label="Описание"
            placeholder="Введите описание"
            rows="10"
            v-model.trim="toolData.description"
        />

        <ui-input
            label="Малое изображение"
            placeholder="Введите адрес ссылки"
            v-model.trim="toolData.image.small"
        />

        <ui-input
            label="Среднее изображение"
            placeholder="Введите адрес ссылки"
            v-model.trim="toolData.image.medium"
        />

        <ui-input
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

    const { tool, isLoading, loadTool, editTool } = useTools();

    interface ToolsFormCreateProps {
        id: string,
    }

    const props = defineProps<ToolsFormCreateProps>();
    // await loadTool(props.id);
    // const toolData = computed<ToolRecord>(() => tool.value);
        const toolData = ref(JSON.parse(JSON.stringify(tool.value)));

        const reset = () => {
            console.log(JSON.parse(JSON.stringify(tool.value)));
            toolData.value = JSON.parse(JSON.stringify(tool.value));
        }
</script>

<style scoped lang="scss">
    .form-edit {
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