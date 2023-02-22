export const useErrorStore = () => {
    const error = ref<string | undefined>(undefined);
    
    const hasError = computed<boolean>(() => Boolean(error.value));

    const clearError = () => { error.value = undefined };
    const addError = (err: string) => { error.value = err; };

    return { error, hasError, clearError, addError };
};
