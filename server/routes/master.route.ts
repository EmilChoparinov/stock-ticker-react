import { Express } from 'express';
import { resolve as resolvePath } from 'path';
import { stockRoutes } from './stocktickers.route';

export const routes = (app: Express) => {
    stockRoutes(app);
    app.get('/', (req, res) => res.sendfile(resolvePath(__dirname, './../../client/build/index.html')));
};