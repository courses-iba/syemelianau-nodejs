import { Router } from 'express';

import OrdersController from '../controllers/orders.controller';
import Route from '../interfaces/routes.interface';

class OrdersRoute implements Route {
    public path = '/orders';
    public router = Router();
    public ordersController = new OrdersController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, this.ordersController.getOrders);
        this.router.get(`${this.path}/:id`, this.ordersController.getOrderById);
        this.router.post(`${this.path}`, this.ordersController.createOrder);
        this.router.put(`${this.path}/:id`, this.ordersController.updateOrder);
        this.router.delete(`${this.path}/:id`, this.ordersController.deleteOrder);
    }
}

export default OrdersRoute;
