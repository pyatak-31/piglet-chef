export const useLoadingStore = () => {
    const isLoading = ref<boolean>(false);

    const startLoading = () => { isLoading.value = true };
    const completeLoading = () => { isLoading.value = false };

    return { isLoading, startLoading, completeLoading };
};
