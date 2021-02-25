import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

import HttpException from '../exceptions/HttpException';
import { DataStoredInToken, RequestWithUser } from '../interfaces/auth.interface';
import userModel from '../models/users.model';

const { JWT_SECRET } = process.env;

const adminMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
        const cookies = req.cookies;

        if (cookies && cookies.Authorization) {
            const verificationResponse = (await jwt.verify(cookies.Authorization, JWT_SECRET)) as DataStoredInToken;
            const userId = verificationResponse._id;
            const findUser = await userModel.findById(userId).exec();

            if (findUser) {
                if (findUser.role !== 'admin') {
                    next(new HttpException(403, 'Permission denied'));
                } else {
                    req.user = findUser;
                    next();
                }
            } else {
                next(new HttpException(401, 'Wrong authentication token'));
            }
        } else {
            next(new HttpException(404, 'Authentication token missing'));
        }
    } catch (error) {
        next(new HttpException(401, 'Wrong authentication token'));
    }
};

export default adminMiddleware;
