import { defineStore } from 'pinia';
import { SortOrder } from '~~/type/sorting';
import { SortField, sortParams, ToolRecord } from '~~/type/tools';
import { useAuthStore } from './auth';

export const useToolsStore = defineStore('tools', () => {
    const { isLoading, error, hasError, clearError, addError, startLoading, completeLoading } = useStore();
    const { convertDbResponse } = useFirebase();
    const authStore = useAuthStore();

    const tools = ref<null | Array<ToolRecord>>(null);
    const tool = ref<null | ToolRecord>(null);
    const sortField = ref<SortField>(null);
    const sortOrder = ref<SortOrder>(null);

    const toolsSorted = computed(() => {
        if (sortOrder.value == null || sortField.value == null) {
            return tools.value;
        } else {
            return JSON.parse(JSON.stringify(tools.value)).sort((a: ToolRecord, b:ToolRecord) => {
                let modifier = 1;
                if (sortOrder.value === 'desc') modifier = -1;
                if (a[sortField.value!] < b[sortField.value!]) return -1 * modifier;
                if (a[sortField.value!] > b[sortField.value!]) return 1 * modifier;
                return 0;
            });
        }
    });

    const setSortParams = (params: sortParams) => {
        sortField.value = params.sortField;
        sortOrder.value = params.sortOrder;
        if (sortOrder.value === null) {
            sortField.value = null;
        }
        console.log(sortOrder.value, sortField.value);
    };

    const clearTool = () => { tool.value = null };
    const { fetchAll, fetchOne, createRecord, editRecord, deleteRecord } = useDbApi('tools');

    const baseAction = async (callback: Function) => {
        try {
            startLoading();
            await callback();
        } catch (error) {
            throw new Error((error as Error).message);
        } finally {
            completeLoading();
        }
    };

    const downloadToolList = async () => {
        try {
            startLoading();
            const data = await fetchAll();
            tools.value = convertDbResponse(data as Array<ToolRecord>);
            return data;
        } catch (error) {
            throw new Error((error as Error).message);
        } finally {
            completeLoading();
        }
    };

    const downloadToolItem = async (id: string) => {
        try {
            startLoading();
            const data = await fetchOne(id);
            tool.value = data as ToolRecord;
            return data;
        } catch (error) {
            throw new Error((error as Error).message);
        } finally {
            completeLoading();
        }
    };

    const createTool = async (body: ToolRecord) => {
        try {
            startLoading();
            await authStore.checkToken();
            await createRecord(body);
        } catch (error) {
            throw new Error((error as Error).message);
        } finally {
            completeLoading();
        }
    };

    const editTool = async (id: string, body: ToolRecord) => {
        try {
            startLoading();
            await authStore.checkToken();
            await editRecord(id, body);
        } catch (error) {
            throw new Error((error as Error).message);
        } finally {
            completeLoading();
        }
    };

    const deleteTool = async (id: string) => {
        try {
            // startLoading();
            await authStore.checkToken();
            await deleteRecord(id);
        } catch (error) {
            throw new Error((error as Error).message);
        } finally {
            // completeLoading();
        }
    };

    return {
        tools,
        tool,
        toolsSorted,
        error,
        isLoading,
        sortOrder,
        sortField,
        setSortParams,
        downloadToolList,
        downloadToolItem,
        createTool,
        deleteTool,
        editTool,
        startLoading,
        completeLoading,
        clearTool,
    };
});
