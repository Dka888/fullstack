import { Category } from "./Categoris";

export interface Product {
    imgUrl: string,
    name: string,
    category: Category,
    price: number,
    rating: number,
    description: string,
    _id: string,
    click: number,
}