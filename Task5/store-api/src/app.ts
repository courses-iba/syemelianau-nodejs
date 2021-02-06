import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import compression from 'compression';
import { connect, set, connection } from 'mongoose';

import { dbConnection } from './database';
import Routes from './interfaces/routes.interface';
import errorMiddleware from './middlewares/error.middleware';
import { logger, stream } from './utils/logger';

const { PORT, NODE_ENV, ALLOWED_ORIGINS } = process.env;

class App {
    public app: express.Application;
    public port: string | number;
    public env: string;

    constructor(routes: Routes[]) {
        this.app = express();
        this.port = PORT || 3000;
        this.env = NODE_ENV || 'development';

        this.connectToDatabase();
        this.initializeMiddlewares();
        this.initializeRoutes(routes);
        this.initializeErrorHandling();
    }

    public listen() {
        this.app.listen(this.port, () => {
            logger.info(`🚀 App listening on the port ${this.port}`);
        });
    }

    private connectToDatabase() {
        if (this.env !== 'production') {
            set('debug', true);
        }

        connect(dbConnection.url, dbConnection.options)
            .then(() => {
                logger.info('🟢 The database is connected.');
            })
            .catch((error: Error) => {
                logger.error(`🔴 Unable to connect to the database: ${error}.`);
            });

        const disconnect = callback => connection.close(() => callback())
            .then(() => {
                logger.info('🟢 The database is disconnected.');
            }).catch((error: Error) => {
                logger.error(`🔴 Unable to disconnect from the database: ${error}.`);
            });

        process.once('SIGUSR2', () => disconnect(() => process.kill(process.pid, 'SIGUSR2')));
        process.on('SIGTERM', () => disconnect(() => process.exit()));
        process.on('SIGINT', () => disconnect(() => process.exit()));
    }

    private initializeMiddlewares() {
        if (this.env === 'production') {
            this.app.use(morgan('combined', { stream }));
            this.app.use(cors({ origin: ALLOWED_ORIGINS || '*', credentials: true }));
        } else if (this.env === 'development') {
            this.app.use(morgan('dev', { stream }));
            this.app.use(cors({ origin: true, credentials: true }));
        }

        this.app.use(hpp());
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(cookieParser());
    }

    private initializeRoutes(routes: Routes[]) {
        routes.forEach(route => {
            this.app.use('/', route.router);
        });
    }

    private initializeErrorHandling() {
        this.app.use(errorMiddleware);
    }
}

export default App;
