import { useToolsStore } from '~~/store/tools';
import { sortParams } from '~~/type/tools';

export const useTools = () => {
    const toolsStore = useToolsStore();

    const tools = computed(() => toolsStore.toolsSorted);
    const sortOrder = computed(() => toolsStore.sortOrder);
    const sortField = computed(() => toolsStore.sortField);

    const isLoading = computed(() => toolsStore.isLoading);

    const loadTools = async () => {
        await useLazyAsyncData(() => toolsStore.fetchAll());
    };
    
    const create = () => {
        toolsStore.create({
            name: 'Кастрюля',
            description: 'Для лохов',
            image: {
                small: 'https://i.ibb.co/2k5j7gM/terka.jpg',
                medium: 'https://i.ibb.co/bK7rgzv/terka.jpg',
                full: 'img src="https://i.ibb.co/bK7rgzv/terka.jpg'
            },
            date: new Date()
        });
    };

    const deleteToolAndLoadTools = async (id: string) =>{
        await toolsStore.deleteTool(id);
        await toolsStore.fetchAll();
    };

    const sortBy = (params: sortParams) => {
        toolsStore.setSortParams(params);
    };

    return { tools, isLoading, sortOrder, sortField, loadTools, create, sortBy, deleteToolAndLoadTools }
};
