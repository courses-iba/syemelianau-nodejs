import { Product } from './product.model';

export interface ProductsResponse {
    count: number;
    products: Array<Product>;
}
