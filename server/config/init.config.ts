import * as express from 'express';

import { json as jsonParser } from 'body-parser';
import { join as pathJoin } from 'path';

import { logger } from './logger.config';

import { readFileSync } from 'fs';

const key: string = JSON.parse(readFileSync(pathJoin(__dirname, './../setup.json')).toString()).apiKey;

const server = express();

server.use(jsonParser());

server.use(express.static(pathJoin(__dirname, './../../client/build/')));

server.use(logger);

export const PORT = 8000, app = server, APIKEY = key;