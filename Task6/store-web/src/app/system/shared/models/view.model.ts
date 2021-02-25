import { Product } from './product.model';
import { User } from '../../../shared/models/user.model';

interface ProductView extends Product {
    count: number;
}

interface OrderedProductView extends ProductView {
    total: number;
}

interface OrderView {
    _id?: string;
    userId: string;
    date?: Date;
    total: number;
    products: Array<OrderedProductView>;
}

interface UserOrdersView extends User {
    orders?: Array<OrderView>;
}

export {
    ProductView,
    OrderedProductView,
    OrderView,
    UserOrdersView
};
