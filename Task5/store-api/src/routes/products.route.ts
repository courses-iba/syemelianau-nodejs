import { Router } from 'express';

import ProductsController from '../controllers/products.controller';
import Route from '../interfaces/routes.interface';

class ProductsRoute implements Route {
    public path = '/products';
    public router = Router();
    public productsController = new ProductsController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.productsController.getProducts);
        this.router.get(`${this.path}/:id`, this.productsController.getProductById);
        this.router.get(`${this.path}/all/count`, this.productsController.getProductsCount);
        this.router.get(`${this.path}/:from/:to`, this.productsController.getProductsFromTo);
        this.router.post(`${this.path}/find`, this.productsController.getProductsByIds);
        this.router.post(`${this.path}`, this.productsController.createProduct);
        this.router.put(`${this.path}/:id`, this.productsController.updateProduct);
        this.router.delete(`${this.path}/:id`, this.productsController.deleteProduct);
    }
}

export default ProductsRoute;
