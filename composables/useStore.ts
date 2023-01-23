import { NuxtError } from "nuxt/dist/app/composables";
import { ResError } from "~~/type/error.interface";

export const useStore = () => {
    const error = ref<ResError | undefined>(undefined);
    // const error = ref<any | undefined>(undefined);
    const isLoading = ref<boolean>(false);

    const hasError = computed<boolean>(() => Boolean(error.value));
    // const errorMessage = computed(() => error.value?.message);

    const clearError = () => { error.value = undefined };
    const startLoading = () => { isLoading.value = true };
    const completeLoading = () => { isLoading.value = false };
    // const addError = (err: string) => { error.value = err; };

    const baseAsyncAction = async (callback: Function) => {
        startLoading();
        try {
            await callback();
            clearError();
        } catch (resError) {
            console.log(resError);
            addError(resError);
        } finally {
            completeLoading();
        }
    };

    return { isLoading, hasError, clearError, startLoading, completeLoading };
};
