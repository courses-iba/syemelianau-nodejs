import { isEmpty } from 'lodash';

import HttpException from '../exceptions/HttpException';
import { Product } from '../interfaces/products.interface';
import productModel from '../models/products.model';
import orderModel from '../models/orders.model';
import { Order } from '../interfaces/orders.interface';

class ProductService {
    public products = productModel;
    public orders = orderModel;

    public async findAllProducts(): Promise<Array<Product>> {
        return await this.products.find().exec();
    }

    public async countAllProducts(): Promise<number> {
        return await this.products.countDocuments({}).exec();
    }

    public async findProductsFromTo(from: number, to: number): Promise<Array<Product>> {
        return await this.products.find().skip(from).limit(to).exec();
    }

    public async findProductById(productId: string): Promise<Product> {
        const findProductData: Product = await this.products.findById(productId).exec();
        if (!findProductData) {
            throw new HttpException(409, `Product '${productId}' not found`);
        }
        return findProductData;
    }

    public async findProductsByIds(productsIds: Array<string>): Promise<Array<Product>> {
        return await this.products.find({ '_id': { $in: productsIds } }).lean().exec();
    }

    public async createProduct(productData: Product): Promise<Product> {
        if (isEmpty(productData)) {
            throw new HttpException(400, `Incorrect product data ${productData}`);
        }
        const findProductData: Product = await this.products.findOne({ name: productData.name }).exec();
        if (findProductData) {
            throw new HttpException(409, `Product '${productData.name}' already exists`);
        }
        return await this.products.create({ ...productData });
    }

    public async updateProduct(productId: string, productData: Product): Promise<Product> {
        if (isEmpty(productData)) {
            throw new HttpException(400, `Incorrect product data ${productData}`);
        }
        const updateProductDataById: Product = await this.products.findByIdAndUpdate(productId, { ...productData }).exec();
        if (!updateProductDataById) {
            throw new HttpException(409, `Product '${productId}' does not exist`);
        }
        return updateProductDataById;
    }

    public async deleteProduct(productId: string): Promise<Product> {
        const ordersWithProduct: Array<Order> = await this.orders.find(
            { products: { $elemMatch: { 'productId': productId } } }
        ).exec();
        if (ordersWithProduct.length) {
            throw new HttpException(403, `Product are in use`);
        }
        const deleteProductDataById: Product = await this.products.findByIdAndDelete(productId).exec();
        if (!deleteProductDataById) {
            throw new HttpException(409, `Product '${productId}' does not exist`);
        }
        return deleteProductDataById;
    }
}

export default ProductService;
