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