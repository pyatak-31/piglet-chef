import { SortOrder } from "./sorting";

export interface ToolRecord {
    name: string;
    description: string;
    image: {
        small: string,
        medium: string,
        full: string
    };
    date: Date
};

export type SortField = null | 'name' | 'description';

export interface sortParams {
    sortField: SortField,
    sortOrder: SortOrder
};
