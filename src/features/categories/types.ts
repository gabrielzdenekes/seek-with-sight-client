export interface CategorySearchItem {
    id: string;

    name: string;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    description: string;
    children?: Category[];
}
