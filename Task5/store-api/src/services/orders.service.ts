import HttpException from '../exceptions/HttpException';
import { Order } from '../interfaces/orders.interface';
import orderModel from '../models/orders.model';
import productModel from '../models/products.model';
import { isEmpty } from '../utils/util';

class OrderService {
    public orders = orderModel;
    public products = productModel;

    public async findAllOrders(): Promise<Array<Order>> {
        const ordersData: Array<Order> = await this.orders.find().exec();
        return ordersData;
    }

    public async findOrderById(orderId: string): Promise<Order> {
        const findOrderData: Order = await this.orders.findById(orderId).exec();
        if (!findOrderData) {
            throw new HttpException(409, `Order '${orderId}' not found`);
        }
        return findOrderData;
    }

    public async createOrder(orderData: Order): Promise<Order> {
        if (isEmpty(orderData)) {
            throw new HttpException(400, `Incorrect order data ${orderData}`);
        }
        const isValidIds = orderData.products.every(
            async orderedProduct => await this.products.findById(orderedProduct.productId).exec()
        );
        if (!isValidIds) {
            throw new HttpException(409, `Invalid ordered products ids`);
        }
        const createOrderData: Order = await this.orders.create({ ...orderData }).then();
        return createOrderData;
    }

    public async updateOrder(orderId: string, orderData: Order): Promise<Order> {
        if (isEmpty(orderData)) {
            throw new HttpException(400, `Incorrect order data ${orderData}`);
        }
        const updateOrderDataById: Order = await this.orders.findByIdAndUpdate(orderId, { ...orderData }).exec();
        if (!updateOrderDataById) {
            throw new HttpException(409, `Product '${orderId}' does not exist`);
        }
        return updateOrderDataById;
    }

    public async deleteOrder(orderId: string): Promise<Order> {
        const deleteOrderDataById: Order = await this.orders.findByIdAndDelete(orderId).exec();
        if (!deleteOrderDataById) {
            throw new HttpException(409, `Product '${orderId}' does not exist`);
        }
        return deleteOrderDataById;
    }
}

export default OrderService;
