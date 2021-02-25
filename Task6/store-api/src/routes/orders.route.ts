import { Router } from 'express';

import OrdersController from '../controllers/orders.controller';
import Route from '../interfaces/routes.interface';
import authMiddleware from '../middlewares/auth.middleware';
import adminMiddleware from '../middlewares/admin.middleware';

class OrdersRoute implements Route {
    public path = '/orders';
    public router = Router();
    public ordersController = new OrdersController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, adminMiddleware, this.ordersController.getOrders);
        this.router.get(`${this.path}/:id`, adminMiddleware, this.ordersController.getOrderById);
        this.router.get(`${this.path}/user/:id`, authMiddleware, this.ordersController.getOrdersByUserId);
        this.router.post(`${this.path}`, authMiddleware, this.ordersController.createOrder);
        this.router.put(`${this.path}/:id`, authMiddleware, this.ordersController.updateOrder);
        this.router.delete(`${this.path}/:id`, adminMiddleware, this.ordersController.deleteOrder);
    }
}

export default OrdersRoute;
