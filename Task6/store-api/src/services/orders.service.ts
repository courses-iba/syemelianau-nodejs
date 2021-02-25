import { isEmpty } from 'lodash';

import HttpException from '../exceptions/HttpException';
import { Order } from '../interfaces/orders.interface';
import orderModel from '../models/orders.model';
import { OrderedProductView, OrderView } from '../interfaces/views.interface';
import { Product } from '../interfaces/products.interface';
import ProductService from './products.service';

class OrderService {
    public orders = orderModel;
    public productService = new ProductService();

    public async findAllOrders(): Promise<Array<Order>> {
        return await this.orders.find().exec();
    }

    public async findOrderById(orderId: string): Promise<Order> {
        const findOrderData: Order = await this.orders.findById(orderId).exec();
        if (!findOrderData) {
            throw new HttpException(409, `Order '${orderId}' not found`);
        }
        return findOrderData;
    }

    public async findOrdersByUserId(userId: string): Promise<Array<OrderView>> {
        const findOrdersData: Array<Order> = await this.orders.find({ 'userId': userId }).lean().exec();
        if (!findOrdersData) {
            throw new HttpException(409, `'${userId}' orders not found`);
        }
        const ordersViewsData = new Array<OrderView>();
        for (const order of findOrdersData) {
            const products = new Array<OrderedProductView>();
            const productsIds: Array<string> = order.products.map(product => product.productId);
            const findProductsData: Array<Product> = await this.productService.findProductsByIds(productsIds);
            for (const orderedProduct of order.products) {
                const findProductIndex = findProductsData.findIndex(
                    ({ _id }) => _id.toString() === orderedProduct.productId.toString()
                );
                const findProductData = findProductsData.splice(findProductIndex, 1).pop();
                products.push({
                    ...findProductData,
                    count: orderedProduct.count,
                    total: orderedProduct.count * findProductData.cost
                });
            }
            ordersViewsData.push({ ...order, products });
        }
        return ordersViewsData;
    }

    public async createOrder(orderData: Order): Promise<Order> {
        if (isEmpty(orderData)) {
            throw new HttpException(400, `Incorrect order data ${orderData}`);
        }
        const isValidIds = orderData.products.every(
            async orderedProduct => await this.productService.findProductById(orderedProduct.productId)
        );
        if (!isValidIds) {
            throw new HttpException(409, `Invalid ordered products ids`);
        }
        return await this.orders.create({ ...orderData });
    }

    public async updateOrder(orderId: string, orderData: Order): Promise<Order> {
        if (isEmpty(orderData)) {
            throw new HttpException(400, `Incorrect order data ${orderData}`);
        }
        const updateOrderDataById: Order = await this.orders.findByIdAndUpdate(orderId, { ...orderData }).exec();
        if (!updateOrderDataById) {
            throw new HttpException(409, `Order '${orderId}' does not exist`);
        }
        return updateOrderDataById;
    }

    public async deleteOrder(orderId: string): Promise<Order> {
        const deleteOrderDataById: Order = await this.orders.findByIdAndDelete(orderId).exec();
        if (!deleteOrderDataById) {
            throw new HttpException(409, `Order '${orderId}' does not exist`);
        }
        return deleteOrderDataById;
    }

    public async deleteOrdersByUserId(userId: string): Promise<any> {
        return await this.orders.deleteMany({ 'userId': userId }).exec();
    }
}

export default OrderService;
