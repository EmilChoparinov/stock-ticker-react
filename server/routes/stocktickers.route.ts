import { Express } from 'express';
import { resolve as resolvePath } from 'path';
import { StockTickersController } from '../controllers/stocktickers.controller';

export const stockRoutes = (app: Express) => {
    app.post('/api/findstocks', (req, res) => StockTickersController.getBatchStockData(req, res));
    app.post('/api/findstock', (req, res) => StockTickersController.getSingleStockData(req, res));
};