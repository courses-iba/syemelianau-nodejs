import { Router } from 'express';

import UsersController from '../controllers/users.controller';
import { CreateUserDto } from '../dtos/users.dto';
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import authMiddleware from '../middlewares/auth.middleware';
import adminMiddleware from '../middlewares/admin.middleware';

class UsersRoute implements Route {
    public path = '/users';
    public router = Router();
    public usersController = new UsersController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(`${this.path}`, adminMiddleware, this.usersController.getUsers);
        this.router.get(`${this.path}/:id`, adminMiddleware, this.usersController.getUserById);
        this.router.get(`${this.path}/email/:email`, this.usersController.isUserEmailExist);
        this.router.post(`${this.path}`, validationMiddleware(CreateUserDto, 'body'), this.usersController.createUser);
        this.router.put(`${this.path}/:id`, authMiddleware, this.usersController.updateUser);
        this.router.delete(`${this.path}/:id`, adminMiddleware, this.usersController.deleteUser);
    }
}

export default UsersRoute;
