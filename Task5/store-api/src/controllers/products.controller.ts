import { NextFunction, Request, Response } from 'express';

import { Product } from '../interfaces/products.interface';
import ProductService from '../services/products.service';

class ProductsController {
    public productService = new ProductService();

    public getProducts = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const findAllProductsData: Array<Product> = await this.productService.findAllProducts();
            res.status(200).json(findAllProductsData);
        } catch (error) {
            next(error);
        }
    };

    public getProductsCount = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const countAllProductsData: number = await this.productService.countAllProducts();
            res.status(200).json(countAllProductsData);
        } catch (error) {
            next(error);
        }
    };

    public getProductsFromTo = async (req: Request, res: Response, next: NextFunction) => {
        const from: number = +req.params.from;
        const to: number = +req.params.to;

        try {
            const countAllProductsData: number = await this.productService.countAllProducts();
            const findProductsFromToData: Array<Product> = await this.productService.findProductsFromTo(from, to);
            res.status(200).json({
                count: countAllProductsData,
                products: findProductsFromToData
            });
        } catch (error) {
            next(error);
        }
    };

    public getProductById = async (req: Request, res: Response, next: NextFunction) => {
        const productId: string = req.params.id;

        try {
            const findOneProductData: Product = await this.productService.findProductById(productId);
            res.status(200).json(findOneProductData);
        } catch (error) {
            next(error);
        }
    };

    public getProductsByIds = async (req: Request, res: Response, next: NextFunction) => {
        const productsIds: Array<string> = req.body;

        try {
            const findProductsData: Array<Product> = await this.productService.findProductsByIds(productsIds);
            res.status(200).json(findProductsData);
        } catch (error) {
            next(error);
        }
    };

    public createProduct = async (req: Request, res: Response, next: NextFunction) => {
        const productData: Product = req.body;

        try {
            const createProductData: Product = await this.productService.createProduct(productData);
            res.status(201).json(createProductData);
        } catch (error) {
            next(error);
        }
    };

    public updateProduct = async (req: Request, res: Response, next: NextFunction) => {
        const productId: string = req.params.id;
        const productData: Product = req.body;

        try {
            const updateProductData: Product = await this.productService.updateProduct(productId, productData);
            res.status(200).json(updateProductData);
        } catch (error) {
            next(error);
        }
    };

    public deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
        const productId: string = req.params.id;

        try {
            const deleteProductData: Product = await this.productService.deleteProduct(productId);
            res.status(200).json(deleteProductData);
        } catch (error) {
            next(error);
        }
    };
}

export default ProductsController;
