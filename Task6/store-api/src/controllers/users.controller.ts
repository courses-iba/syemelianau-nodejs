import { NextFunction, Request, Response } from 'express';

import UserService from '../services/users.service';
import { CreateUserDto } from '../dtos/users.dto';
import { User } from '../interfaces/users.interface';
import { RequestWithUser } from '../interfaces/auth.interface';

class UsersController {
    public userService = new UserService();

    public getUsers = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        try {
            const findAllUsersData: Array<User> = await this.userService.findAllUsers();
            res.status(200).json(findAllUsersData);
        } catch (error) {
            next(error);
        }
    };

    public getUserById = async (req: Request, res: Response, next: NextFunction) => {
        const userId: string = req.params.id;

        try {
            const findOneUserData: User = await this.userService.findUserById(userId);
            res.status(200).json(findOneUserData);
        } catch (error) {
            next(error);
        }
    };

    public isUserEmailExist = async (req: Request, res: Response, next: NextFunction) => {
        const userEmail: string = req.params.email;

        try {
            const isUserEmailExist: boolean = await this.userService.findUserByEmail(userEmail);
            res.status(200).json(isUserEmailExist);
        } catch (error) {
            next(error);
        }
    };

    public createUser = async (req: Request, res: Response, next: NextFunction) => {
        const userData: CreateUserDto = req.body;

        try {
            const createUserData: User = await this.userService.createUser(userData);
            res.status(201).json(createUserData);
        } catch (error) {
            next(error);
        }
    };

    public updateUser = async (req: Request, res: Response, next: NextFunction) => {
        const userId: string = req.params.id;
        const userData: User = req.body;

        try {
            const updateUserData: User = await this.userService.updateUser(userId, userData);
            res.status(200).json(updateUserData);
        } catch (error) {
            next(error);
        }
    };

    public deleteUser = async (req: RequestWithUser, res: Response, next: NextFunction) => {
        const user: User = req.user;
        const userId: string = req.params.id;

        try {
            const deleteUserData: User = await this.userService.deleteUser(user, userId);
            res.status(200).json(deleteUserData);
        } catch (error) {
            next(error);
        }
    };
}

export default UsersController;
