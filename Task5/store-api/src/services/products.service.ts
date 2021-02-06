import HttpException from '../exceptions/HttpException';
import { Product } from '../interfaces/products.interface';
import productModel from '../models/products.model';
import { isEmpty } from '../utils/util';

class ProductService {
    public products = productModel;

    public async findAllProducts(): Promise<Array<Product>> {
        const productsData: Array<Product> = await this.products.find().exec();
        return productsData;
    }

    public async countAllProducts(): Promise<number> {
        const countAllProductsData: number = await this.products.countDocuments({}).exec();
        return countAllProductsData;
    }

    public async findProductsFromTo(from: number, to: number): Promise<Array<Product>> {
        const productsFromToData: Array<Product> = await this.products.find().skip(from).limit(to).exec();
        return productsFromToData;
    }

    public async findProductById(productId: string): Promise<Product> {
        const findProductData: Product = await this.products.findById(productId).exec();
        if (!findProductData) {
            throw new HttpException(409, `Product '${productId}' not found`);
        }
        return findProductData;
    }

    public async findProductsByIds(productsIds: Array<string>): Promise<Array<Product>> {
        const findProductsData: Array<Product> = await this.products.find({ '_id': { $in: productsIds } }).exec();
        return findProductsData;
    }

    public async createProduct(productData: Product): Promise<Product> {
        if (isEmpty(productData)) {
            throw new HttpException(400, `Incorrect product data ${productData}`);
        }
        const findProductData: Product = await this.products.findOne({ name: productData.name }).exec();
        if (findProductData) {
            throw new HttpException(409, `Product '${productData.name}' already exists`);
        }
        const createProductData: Product = await this.products.create({ ...productData }).then();
        return createProductData;
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
        const deleteProductDataById: Product = await this.products.findByIdAndDelete(productId).exec();
        if (!deleteProductDataById) {
            throw new HttpException(409, `Product '${productId}' does not exist`);
        }
        return deleteProductDataById;
    }
}

export default ProductService;
