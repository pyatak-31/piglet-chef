import { SortOrder } from "~~/type/sorting";
import { SortField, sortParams } from "~~/type/tools";

export const useSort = () => {
    const sortOrder = ref<SortOrder>(null);

    const getSortParams = (oldSortField: string, chosenSortField: string) => {
        if (oldSortField === chosenSortField) {
            switch (sortOrder.value) {
                case null: sortOrder.value = 'asc'; break;
                case 'asc': sortOrder.value = 'desc'; break;
                case 'desc': sortOrder.value = null; break;
            }
        } else {
            sortOrder.value = 'asc';
        }

        return { sortField: chosenSortField, sortOrder: sortOrder.value };
    };

    return {  sortOrder, getSortParams };
};
