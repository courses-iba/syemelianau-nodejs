import { OrderedProduct } from './orderedProduct.model';

export interface Order {
    _id?: string;
    products: Array<OrderedProduct>;
    date?: Date;
    total: number;
}
