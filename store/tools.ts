import { defineStore } from 'pinia';
import { CreateResponse } from '~~/type/FbDb.interface';
import { ToolRecord } from '~~/type/tools.interface';
import { useAuthStore } from './auth';

const convertDbResponse = (data: Object) => Object.entries(data).map(([id, value]) => ({...value, id}));
export const useToolsStore = defineStore('tools', () => {
    const { isLoading, error, hasError, clearError, addError, startLoading, completeLoading } = useStore();
    const authStore = useAuthStore();
    const { getErrorMessage } = useFirebaseAuth();

    type SortField = 'name' | 'description';
    type SortOrder = null | 'asc' | 'desc';

    interface ToolsItem {
        name: string;
        description: string;
        image: string;
    };

    const tools = ref();
    const sortField = ref<SortField>('name');
    const sortOrder = ref<SortOrder>(null);

    const toolsSorted = computed(() => {
        if (sortOrder === null) {
            return tools;
        } else {
            return tools.value.sort((a: ToolsItem, b:ToolsItem) => {
                let modifier = 1;
                if (sortOrder.value === 'desc') modifier = -1;
                if (a[sortField.value] < b[sortField.value]) return -1 * modifier;
                if (a[sortField.value] > b[sortField.value]) return 1 * modifier;
                return 0;
            });
        }
    });

    const setSortParams = (newSortField: SortField) => {
        if (newSortField === sortField.value) {
            changeSortOrder();
        } else {
            sortField.value = newSortField;
        }
        console.log(sortOrder.value, sortField.value);
    };

    const changeSortOrder = () => {
        switch (sortOrder.value) {
            case null: sortOrder.value = 'asc'; break;
            case 'asc': sortOrder.value = 'desc'; break;
            case 'desc': sortOrder.value = null; break;
        }
    };

    const fetchAll = async () => {
        try {
            startLoading();
            const data = await $fetch<Array<ToolsItem>>('https://piglet-chef-default-rtdb.europe-west1.firebasedatabase.app/tools.json');
            tools.value = convertDbResponse(data);
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

    return { tools, toolsSorted, error, isLoading, sortOrder, setSortParams, fetchAll, create };
});
