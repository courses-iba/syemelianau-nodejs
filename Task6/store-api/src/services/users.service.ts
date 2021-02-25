import bcrypt from 'bcrypt';
import { isEmpty } from 'lodash';

import HttpException from '../exceptions/HttpException';
import { CreateUserDto } from '../dtos/users.dto';
import { User } from '../interfaces/users.interface';
import userModel from '../models/users.model';
import AuthService from './auth.service';
import OrderService from './orders.service';

class UserService {
    public users = userModel;
    public authService = new AuthService();
    public orderService = new OrderService();

    public async findAllUsers(): Promise<Array<User>> {
        return await this.users.find().exec();
    }

    public async findUserById(userId: string): Promise<User> {
        const findUserData: User = await this.users.findById(userId).exec();
        if (!findUserData) {
            throw new HttpException(409, `You're not user`);
        }
        return findUserData;
    }

    public async findUserByEmail(userEmail: string): Promise<boolean> {
        const findUserData: User = await this.users.findOne({ email: userEmail }).exec();
        return !!findUserData;
    }

    public async createUser(userData: CreateUserDto): Promise<User> {
        return await this.authService.signup(userData);
    }

    public async updateUser(userId: string, userData: User): Promise<User> {
        if (isEmpty(userData)) {
            throw new HttpException(400, `You're not userData`);
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(userData.password, salt);

        const updateUserDataById: User = await this.users.findByIdAndUpdate(
            userId,
            { ...userData, password: hash }
        ).exec();
        if (!updateUserDataById) {
            throw new HttpException(409, `You're not user`);
        }
        return updateUserDataById;
    }

    public async deleteUser(user: User, userId: string): Promise<User> {
        if (user._id.toString() === userId) {
            throw new HttpException(403, 'Permission denied');
        }
        await this.orderService.deleteOrdersByUserId(userId);
        const deleteUserDataById: User = await this.users.findByIdAndDelete(userId).exec();
        if (!deleteUserDataById) {
            throw new HttpException(409, `You're not user`);
        }
        return deleteUserDataById;
    }
}

export default UserService;
