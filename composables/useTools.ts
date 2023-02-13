import { useToolsStore } from '~~/store/tools';
import { sortParams, ToolRecord } from '~~/type/tools';

export const useTools = () => {
    const toolsStore = useToolsStore();
    const router = useRouter();

    const tools = computed(() => toolsStore.toolsSorted);
    const sortOrder = computed(() => toolsStore.sortOrder);
    const sortField = computed(() => toolsStore.sortField);

    const isLoading = computed(() => toolsStore.isLoading);

    const loadTools = async () => {
        await useLazyAsyncData(() => toolsStore.fetchAll());
    };
    
    const createTool = async (body: ToolRecord) => {
        await toolsStore.createTool(body);
        router.push('/tools');
    };

    const deleteToolAndLoadTools = async (id: string) =>{
        await toolsStore.deleteTool(id);
        await toolsStore.fetchAll();
    };

    const sortBy = (params: sortParams) => {
        toolsStore.setSortParams(params);
    };

    return { tools, isLoading, sortOrder, sortField, loadTools, createTool, sortBy, deleteToolAndLoadTools }
};
