import { useToolsStore } from '~~/store/tools';
import { sortParams, ToolRecord } from '~~/type/tools';

export const useTools = () => {
    const toolsStore = useToolsStore();
    const router = useRouter();

    const tools = computed(() => toolsStore.toolsSorted);
    const tool = computed(() => toolsStore.tool);
    // const tool = computed(() => toolsStore.tool);
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
        await toolsStore.editTool(id, body);
        router.push('/tools');
        
    };

    const deleteToolAndLoadTools = async (id: string) =>{
        await toolsStore.deleteTool(id);
        await toolsStore.fetchAll();
    };

    const sortBy = (params: sortParams) => {
        toolsStore.setSortParams(params);
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
    };
};
