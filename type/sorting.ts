export type SortOrder = null | 'asc' | 'desc';
export type SortField = null | string;

export interface SortParams {
    sortField: SortField,
    sortOrder: SortOrder
};
