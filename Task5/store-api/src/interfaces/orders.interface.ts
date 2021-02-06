import { OrderedProduct } from './orderedProducts.interface';

export interface Order {
    _id: string;
    products: Array<OrderedProduct>;
    date: Date;
    total: number;
}
