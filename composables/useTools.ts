import { useToolsStore } from '~~/store/tools';

export const useTools = () => {
    const toolsStore = useToolsStore();

    const tools = computed(() => toolsStore.tools);
    const sortOrder = computed(() => toolsStore.sortOrder);

    const isLoading = computed(() => toolsStore.isLoading);

    const loadTools = async () => {
        await useLazyAsyncData(() => toolsStore.fetchAll());
    };
    
    const create = () => {
        toolsStore.create({
            name: 'Нож',
            description: 'Выбор мастеров',
            images: {
                small: 'https://i.ibb.co/2k5j7gM/terka.jpg',
                medium: 'https://i.ibb.co/bK7rgzv/terka.jpg',
                full: 'img src="https://i.ibb.co/bK7rgzv/terka.jpg'
            },
            date: new Date()
        });
    };

    const sortBy = (params) => {
        toolsStore.setSortParams(params);
    };

    return { tools, isLoading, sortOrder, loadTools, create, sortBy }
};
