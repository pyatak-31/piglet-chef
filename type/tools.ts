export interface RequestToolBody {
    name: string,
    description: string,
    image: {
        small: string,
        medium: string,
        full: string
    };
};

export interface ToolRecord extends RequestToolBody{
    id: string,
};

export type ToolsSortField = null | 'name' | 'description';
