import { Product } from './products.interface';

export interface ProductView extends Product {
    count: number;
}

export interface OrderedProductView extends ProductView {
    total: number;
}

export interface OrderView {
    _id: string;
    userId: string;
    date: Date;
    total: number;
    products: Array<OrderedProductView>;
}
