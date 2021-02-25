import { Request } from 'express';

import { User } from './users.interface';

interface DataStoredInToken {
    _id: string;
}

interface TokenData {
    token: string;
}

interface RequestWithUser extends Request {
    user: User;
}

export {
    DataStoredInToken,
    TokenData,
    RequestWithUser
};
