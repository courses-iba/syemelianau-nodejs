import { NextFunction, Request, Response } from 'express';

import OrderService from '../services/orders.service';
import { Order } from '../interfaces/orders.interface';
import { RequestWithUser } from '../interfaces/auth.interface';
import { OrderView } from '../interfaces/views.interface';

class OrdersController {
    public orderService = new OrderService();

    public getOrders = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const findAllOrdersData: Array<Order> = await this.orderService.findAllOrders();
            res.status(200).json(findAllOrdersData);
        } catch (error) {
            next(error);
        }
    };

    public getOrderById = async (req: Request, res: Response, next: NextFunction) => {
        const orderId: string = req.params.id;

        try {
            const findOneOrderData: Order = await this.orderService.findOrderById(orderId);
            res.status(200).json(findOneOrderData);
        } catch (error) {
            next(error);
        }
    };

    public getOrdersByUserId = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        const userId: string = req.params.id;

        try {
            const findOrdersData: Array<OrderView> = await this.orderService.findOrdersByUserId(userId);
            res.status(200).json(findOrdersData);
        } catch (error) {
            next(error);
        }
    };

    public createOrder = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        const orderData: Order = { ...req.body, userId: req.user._id };

        try {
            const createOrderData: Order = await this.orderService.createOrder(orderData);
            res.status(201).json(createOrderData);
        } catch (error) {
            next(error);
        }
    };

    public updateOrder = async (req: Request, res: Response, next: NextFunction) => {
        const orderId: string = req.params.id;
        const orderData: Order = req.body;

        try {
            const updateOrderData: Order = await this.orderService.updateOrder(orderId, orderData);
            res.status(200).json(updateOrderData);
        } catch (error) {
            next(error);
        }
    };

    public deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
        const orderId: string = req.params.id;

        try {
            const deleteOrderData: Order = await this.orderService.deleteOrder(orderId);
            res.status(200).json(deleteOrderData);
        } catch (error) {
            next(error);
        }
    };
}

export default OrdersController;
