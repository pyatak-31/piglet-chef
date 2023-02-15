import { useAuthStore } from "~~/store/auth";

export const useDbApi = (tableName: string) => {
    const config = useRuntimeConfig();
    const authStore = useAuthStore();

    const fetchAll = (): Promise<Array<Object>> =>
        $fetch(`${ config.BASE_URL }/${ tableName }.json`);

    const fetchOne = (id: string): Promise<Object> =>
        $fetch(`${ config.BASE_URL }/${ tableName }/${ id }.json`);

    const createRecord = (body: object): Promise<Object> => 
        $fetch(`${ config.BASE_URL }/${ tableName }.json`, {
            method: 'POST',
            params: {
                auth: authStore.token
            },
            body
        });

    const editRecord = (id: string, body: object): Promise<Object> =>
        $fetch(`${ config.BASE_URL }/${ tableName }/${ id }.json`, {
            method: 'PUT',
            params: {
                auth: authStore.token
            },
            body
        });

    const deleteRecord = (id: string): Promise<null> =>
        $fetch(`${ config.BASE_URL }/${ tableName }/${ id }.json`, {
            method: 'DELETE',
            params: {
                auth: authStore.token
            },
        });

    return { fetchAll, fetchOne, createRecord, editRecord, deleteRecord };
};