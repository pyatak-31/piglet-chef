import { defineStore } from 'pinia';
import { CreateResponse } from '~~/type/FbDb.interface';
import { SortOrder } from '~~/type/sorting';
import { SortField, sortParams, ToolRecord } from '~~/type/tools';
import { useAuthStore } from './auth';

export const useToolsStore = defineStore('tools', () => {
    const { isLoading, error, hasError, clearError, addError, startLoading, completeLoading } = useStore();
    const { convertDbResponse } = useFirebase();
    const authStore = useAuthStore();

    const tools = ref();
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
            const data = await $fetch<Array<ToolRecord>>('https://piglet-chef-default-rtdb.europe-west1.firebasedatabase.app/tools.json');
            tools.value = convertDbResponse(data);
            console.log(tools.value);
            return data;
        } catch (error) {
            throw new Error((error as Error).message);
        } finally {
            completeLoading();
        }
    };

    const create = async (body: ToolRecord) => {
        await authStore.checkToken();
        
        const data = await $fetch<CreateResponse>(`https://piglet-chef-default-rtdb.europe-west1.firebasedatabase.app/tools.json`, {
            method: 'POST',
            params: {
                auth: authStore.token
            },
            body
        });
        return data;
    };

    return { tools, toolsSorted, error, isLoading, sortOrder, sortField, setSortParams, fetchAll, create };
});
