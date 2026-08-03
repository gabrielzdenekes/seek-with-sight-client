export interface CategorySearchItem {
    id: string;

    name: string;
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    children?: Category[];
}
