import { Category } from "./Categoris";
import { Product } from "./Product";

export const enum status {
    in_Cart ="in_cart",
    purchased = "purchased"}

export interface Basket {
    userId: string,
    productId: Product,
    quantity: number,
    status: status,
    _id: string,
}

export interface ProductsInBasket {
    quantity: number,
    status: status;
    imgUrl: string;
    name: string;
    category: Category;
    price: number;
    rating: number;
    description: string;
    _id: string;
    click: number;
}