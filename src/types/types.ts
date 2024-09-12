export interface Book {
    id: number;
    title: string;
    desc: string;
    price: string;
    stock: number
    author?: Author;
}

export interface Author {
    id: number;
    name: string;
    bio: string;
    key: string;
    country: string;
}

export interface LarApiMeta {
    current_page: number;
    from: number;
    last_page: number;
    per_page: number;
    to: number;
    total: number
}

export interface BookApiResponse {
    books: Book[],
    meta: LarApiMeta
}

export interface ApiBookFormError {
    message: string;
    errors: {
        title: string;
        price: string;
        stock: string;
    };
}