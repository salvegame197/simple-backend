import { Router } from 'express';
import { uuid } from 'uuidv4';
import CategoryController from './controllers/CategoryController';
import ProductController from './controllers/ProductController';

const routes = new Router();

//request

routes.post('/categories', CategoryController.store);
routes.put('/categories/:id', CategoryController.update);
routes.delete('/categories/:id', CategoryController.delete);
routes.get('/categories', CategoryController.index);

routes.post('/products', ProductController.store);
routes.get('/products', ProductController.index);
routes.put('/products/:id', ProductController.update);
routes.delete('/products/:id', ProductController.delete);

export default routes;
