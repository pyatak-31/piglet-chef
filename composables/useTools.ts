import { useToolsStore } from '~~/store/tools';
import { SortParams } from '~~/type/sorting';
import { ToolRecord } from '~~/type/tools';

export const useTools = () => {
    const toolsStore = useToolsStore();
    const router = useRouter();

    const tools = computed(() => toolsStore.toolsSorted);
    const tool = computed(() => toolsStore.tool);
    const sortOrder = computed(() => toolsStore.sortOrder);
    const sortField = computed(() => toolsStore.sortField);

    const isLoading = computed(() => toolsStore.isLoading);

    const loadTools = async () => {
        await useLazyAsyncData(async () => await toolsStore.downloadToolList());
    };

    const loadTool = async (id: string) => {
        await useLazyAsyncData(() => toolsStore.downloadToolItem(id));
    };
    
    const createTool = async (body: ToolRecord) => {
        await toolsStore.createTool(body);
        // if (!toolsStore.hasError) {
            router.push('/tools');
        // }
    };

    const editTool = async (id: string, body: ToolRecord) => {
        
        await toolsStore.editTool(id, body);

        router.push('/tools');
        
    };

    const deleteToolAndLoadTools = async (id: string) =>{
        toolsStore.startLoading();
        await toolsStore.deleteTool(id);
        await toolsStore.downloadToolList();
    };

    const sortBy = (params: SortParams) => {
        toolsStore.setSortParams(params);
    };

    const clearTool = () => {
        toolsStore.clearTool();
    };

    return {
        tools,
        tool,
        isLoading,
        sortOrder,
        sortField,
        loadTools,
        loadTool,
        createTool,
        sortBy,
        deleteToolAndLoadTools,
        editTool,
        clearTool,
    };
};
