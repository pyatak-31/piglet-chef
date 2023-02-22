import { SortField, SortOrder, SortParams } from "~~/type/sorting";

export const useSortStore = () => {
    const sortField = ref<SortField>(null);
    const sortOrder = ref<SortOrder>(null);

    const setSortParams = (params: SortParams) => {
        sortField.value = params.sortField;
        sortOrder.value = params.sortOrder;
        if (sortOrder.value === null) {
            sortField.value = null;
        }
        console.log(sortOrder.value, sortField.value);
    };

    return { sortField, sortOrder, setSortParams };
};
