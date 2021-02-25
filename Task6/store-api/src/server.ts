import 'dotenv/config';

import App from './app';
import validateEnv from './utils/validateEnv';
import IndexRoute from './routes/index.route';
import ProductsRoute from './routes/products.route';
import OrdersRoute from './routes/orders.route';
import UsersRoute from './routes/users.route';
import AuthRoute from './routes/auth.route';

validateEnv();

const app = new App([
    new IndexRoute(),
    new ProductsRoute(),
    new OrdersRoute(),
    new UsersRoute(),
    new AuthRoute()
]);

app.listen();
