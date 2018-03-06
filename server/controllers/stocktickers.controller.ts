import { get } from 'request';
import * as uriBuilder from 'build-url';
import { APIKEY } from './../config/init.config';

import { Request, Response } from 'express';
import { BatchData } from '../formats/interfaces/batchdata.interfaces';
import { ServerMessage } from '../formats/classes/servermessage.class';
import { StockData } from '../formats/interfaces/stockdata.interface';


export const StockTickersController = {
    /**
     * gets multiple stock instance data at once, shallow
     */
    getBatchStockData: (req: Request, res: Response) => {
        const stockQuery: BatchData = req.body;
        const uri = buildBatchUri(stockQuery.symbols);
        get(uri, (err, response, body) => {
            if (err) {
                res.status(400).json(new ServerMessage(false, body));
            } else {

                // if the api fails it sends a heroku iframe saying its broken
                // cant parse html
                try {
                    const data = JSON.parse(body)['Stock Quotes'];
                    if (data) {
                        res.status(200).json(new ServerMessage(true, data));
                    } else {
                        res.status(200).json(new ServerMessage(false, null, 'failing'));
                    }
                } catch (e) {
                    res.status(200).json(new ServerMessage(false, null, 'failing'));
                }
            }
        });
    },

    /**
     * gets one stock instance data, deep
     */
    getSingleStockData: (req: Request, res: Response) => {
        const stockQuery: StockData = req.body;
        const uri = buildSingleStockUri(
            stockQuery.symbol,
            stockQuery.function,
            stockQuery.interval
        );
        get(uri, (err, response, body) => {
            if (err) {
                res.status(400).json(new ServerMessage(false, body));
            } else {
                try {
                    const data = JSON.parse(body);
                    const seriesRetrieved = getKeyWithKeyWord(data, 'Series');
                    res.status(200).json(new ServerMessage(true, data[seriesRetrieved]));
                } catch (e) {
                    res.status(200).json(new ServerMessage(false, null, 'failing'));
                }
            }
        });
    }
};


/**
 * gets the first instances of a key with a given substring
 * @param obj object to search
 * @param keyword target substring to find
 */
const getKeyWithKeyWord = (obj, keyword: string) => {
    for (let key in obj) {
        if (key.includes(keyword)) {
            return key;
        }
    }
    return '';
}

/**
 * builds a query for a single stock
 * @param symbol stock symbol
 * @param timeFunc the api's time function
 * @param int the interval of time between stocks
 */
const buildSingleStockUri = (symbol: string, timeFunc: string, int: string) => {
    return uriBuilder('https://www.alphavantage.co', {
        path: 'query',
        queryParams: {
            function: timeFunc,
            symbol: symbol,
            interval: int,
            apikey: APIKEY
        }
    });
};

/**
 * builds a query for multiple stocks
 * @param symbols stock symbol or symbols
 */
const buildBatchUri = (symbols: string) => {
    return uriBuilder('https://www.alphavantage.co', {
        path: 'query',
        queryParams: {
            function: 'BATCH_STOCK_QUOTES',
            symbols: symbols,
            apikey: APIKEY
        }
    });
};