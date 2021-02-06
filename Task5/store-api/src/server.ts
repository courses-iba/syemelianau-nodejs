import 'dotenv/config';

import App from './app';
import validateEnv from './utils/validateEnv';
import IndexRoute from './routes/index.route';
import ProductsRoute from './routes/products.route';
import OrdersRoute from './routes/orders.route';

validateEnv();

const app = new App([new IndexRoute(), new ProductsRoute(), new OrdersRoute()]);

app.listen();
