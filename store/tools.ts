import { defineStore } from 'pinia';
import { ResponseToCreate } from '~~/type/FbDb.interface';
import { SortOrder } from '~~/type/sorting';
import { SortField, sortParams, ToolRecord } from '~~/type/tools';
import { useAuthStore } from './auth';

export const useToolsStore = defineStore('tools', () => {
    const { isLoading, error, hasError, clearError, addError, startLoading, completeLoading } = useStore();
    const config = useRuntimeConfig();
    const { convertDbResponse } = useFirebase();
    const authStore = useAuthStore();

    const tools = ref();
    const tool = ref<null | object>(null);
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

    const fetchAll = async () => {
        try {
            startLoading();
            const data = await $fetch<Array<ToolRecord>>(`${ config.BASE_URL }/tools.json`);
            tools.value = convertDbResponse(data);
            console.log(tools.value);
            return data;
        } catch (error) {
            throw new Error((error as Error).message);
        } finally {
            completeLoading();
        }
    };

    const fetchOne = async (id: string) => {
        try {
            startLoading();
            const data = await $fetch<ToolRecord>(`${ config.BASE_URL }/tools/${ id }.json`);
            tool.value = data;
            return data;
        } catch (error) {
            throw new Error((error as Error).message);
        } finally {
            completeLoading();
        }
    };

    const createTool = async (body: ToolRecord) => {
        try {
            await authStore.checkToken();
            
            await $fetch<ResponseToCreate>(`${ config.BASE_URL }/tools.json`, {
                method: 'POST',
                params: {
                    auth: authStore.token
                },
                body
            });
        } catch (error) {
            throw new Error((error as Error).message);
        }
    };

    const clearTool = () => {
        tool.value = null;
    }
    const editTool = async (id: string, body: ToolRecord) => {
        try {
            // startLoading();
            await authStore.checkToken();
            
            await $fetch<ToolRecord>(`${ config.BASE_URL }/tools/${ id }.json`, {
                method: 'PUT',
                params: {
                    auth: authStore.token
                },
                body
            });
            // tool.value = null;
        } catch (error) {
            throw new Error((error as Error).message);
        } finally {
            
            // completeLoading();
        }
    };

    const deleteTool = async (id: string) => {
        try {
            // startLoading();
            await authStore.checkToken();
            await $fetch<null>(`${ config.BASE_URL }/tools/1.json`, {
                method: 'DELETE',
                params: {
                    auth: authStore.token
                },
            });
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
        fetchAll,
        fetchOne,
        createTool,
        deleteTool,
        editTool,
        startLoading,
        completeLoading,
        clearTool,
    };
});
