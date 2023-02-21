export const useStore = () => {
    const error = ref<string | undefined>(undefined);
    const isLoading = ref<boolean>(false);

    const hasError = computed<boolean>(() => Boolean(error.value));

    const clearError = () => { error.value = undefined };
    const startLoading = () => { isLoading.value = true };
    const completeLoading = () => { isLoading.value = false };
    const addError = (err: string) => { error.value = err; };

    // const baseAsyncAction = async (callback: Function) => {
    //     startLoading();
    //     try {
    //         await callback();
    //         clearError();
    //     } catch (resError) {
    //         console.log(resError);
    //         addError(resError);
    //     } finally {
    //         completeLoading();
    //     }
    // };

    return { isLoading, error, hasError, clearError, addError, startLoading, completeLoading };
};
