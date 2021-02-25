import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { isEmpty } from 'lodash';

import HttpException from '../exceptions/HttpException';
import { CreateUserDto } from '../dtos/users.dto';
import { DataStoredInToken, TokenData } from '../interfaces/auth.interface';
import { User } from '../interfaces/users.interface';
import userModel from '../models/users.model';

const { JWT_SECRET } = process.env;

class AuthService {
    public users = userModel;

    public async signup(userData: CreateUserDto): Promise<User> {
        if (isEmpty(userData)) {
            throw new HttpException(400, `You're not userData`);
        }
        const findUser: User = await this.users.findOne({ email: userData.email }).exec();
        if (findUser) {
            throw new HttpException(409, `You're email '${userData.email}' already exists`);
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(userData.password, salt);

        return await this.users.create({ ...userData, password: hash });
    }

    public async login(userData: CreateUserDto): Promise<{ cookie: string; findUser: User }> {
        if (isEmpty(userData)) {
            throw new HttpException(400, `You're not userData`);
        }
        const findUser: User = await this.users.findOne({ email: userData.email }).exec();
        const isPasswordMatching: boolean = await bcrypt.compare(userData.password, findUser.password);
        if (!findUser || !isPasswordMatching) {
            throw new HttpException(409, `You're credentials are wrong`);
        }

        const tokenData = this.createToken(findUser);
        const cookie = this.createCookie(tokenData);

        return { cookie, findUser };
    }

    public async logout(userData: User): Promise<User> {
        if (isEmpty(userData)) {
            throw new HttpException(400, `You're not userData`);
        }
        const findUser: User = await this.users.findOne({ password: userData.password }).exec();
        if (!findUser) {
            throw new HttpException(409, `You're not user`);
        }
        return findUser;
    }

    public createToken(user: User): TokenData {
        const dataStoredInToken: DataStoredInToken = { _id: user._id };
        return { token: jwt.sign(dataStoredInToken, JWT_SECRET) };
    }

    public createCookie(tokenData: TokenData): string {
        return `Authorization=${tokenData.token}; HttpOnly;`;
    }
}

export default AuthService;
