import { cleanEnv, port, str } from 'envalid';

const validateEnv = () => {
    cleanEnv(process.env, {
        PORT: port(),
        DB_URI: str(),
        NODE_ENV: str(),
        ALLOWED_ORIGINS: str(),
        LOG_LEVEL: str(),
        JWT_SECRET: str()
    });
};

export default validateEnv;
