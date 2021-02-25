import { OrderedProduct } from './orderedProduct.model';

export interface Order {
    _id?: string;
    userId?: string;
    date?: Date;
    total: number;
    products: Array<OrderedProduct>;
}
