import { useToolsStore } from '~~/store/tools';
import { sortParams, ToolRecord } from '~~/type/tools';

export const useTools = () => {
    const toolsStore = useToolsStore();
    const router = useRouter();

    const tools = computed(() => toolsStore.toolsSorted);
    // const tool = computed(() => JSON.parse(JSON.stringify(toolsStore.tool)));
    const tool = computed(() => toolsStore.tool);
    const sortOrder = computed(() => toolsStore.sortOrder);
    const sortField = computed(() => toolsStore.sortField);

    const isLoading = computed(() => toolsStore.isLoading);

    const loadTools = async () => {
        await useLazyAsyncData(() => toolsStore.fetchAll());
    };

    const loadTool = async (id: string) => {
        await useLazyAsyncData(() => toolsStore.fetchOne(id));
    };
    
    const createTool = async (body: ToolRecord) => {
        await toolsStore.createTool(body);
        router.push('/tools');
    };

    const editTool = async (id: string ,body: ToolRecord) => {
        toolsStore.startLoading();
        await toolsStore.editTool(id, body);
        toolsStore.completeLoading();
        router.push('/tools');
        
    };

    const deleteToolAndLoadTools = async (id: string) =>{
        toolsStore.startLoading();
        await toolsStore.deleteTool(id);
        await toolsStore.fetchAll();
    };

    const sortBy = (params: sortParams) => {
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
