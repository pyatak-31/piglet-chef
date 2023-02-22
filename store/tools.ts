import { defineStore } from 'pinia';
import { dbApi } from '~~/api/dbApi';
import { RequestToolBody, ToolRecord, ToolsSortField } from '~~/type/tools';
import { useAuthStore } from './auth';

export const useToolsStore = defineStore('tools', () => {
    const { isLoading,  startLoading, completeLoading } = useLoadingStore();
    const { error, hasError, clearError, addError } = useErrorStore();
    const { sortField, sortOrder, setSortParams} = useSortStore();
    const { fetchAll, fetchOne, createRecord, editRecord, deleteRecord } = dbApi('tools');
    const { convertDbResponse } = useFirebase();
    const authStore = useAuthStore();

    const tools = ref<null | Array<ToolRecord>>(null);
    const tool = ref<null | ToolRecord>(null);
   
    const toolsSorted = computed(() => {
        if (sortOrder.value === null || sortField.value === null) {
            return tools.value;
        } else {
            const toolsSortField = sortField.value as ToolsSortField;
            return JSON.parse(JSON.stringify(tools.value)).sort((a: ToolRecord, b:ToolRecord) => {
                let modifier = 1;
                if (sortOrder.value === 'desc') modifier = -1;
                if (a[toolsSortField!] < b[toolsSortField!]) return -1 * modifier;
                if (a[toolsSortField!] > b[toolsSortField!]) return 1 * modifier;
                return 0;
            });
        }
    });

    const clearTool = () => { tool.value = null };

    const downloadToolList = async () => {
        try {
            startLoading();
            const data = await fetchAll();
            tools.value = convertDbResponse(data as Array<ToolRecord>);
            return data;
        } catch (err) {
            console.log(123)
            throw new Error((err as Error).message);
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

    const createTool = async (body: RequestToolBody) => {
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

    const editTool = async (id: string, body: RequestToolBody) => {
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
