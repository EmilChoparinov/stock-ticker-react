import { DatePlot } from './dateplot';

export interface DatePlots {
    '1. open': Array<DatePlot>;
    '2. high': Array<DatePlot>;
    '3. low': Array<DatePlot>;
    '4. close': Array<DatePlot>;
    '5. volume': Array<DatePlot>;
}

export class DatePlots implements DatePlots {
    constructor() {
        this['1. open'] = [];
        this['2. high'] = [];
        this['3. low'] = [];
        this['4. close'] = [];
        this['5. volume'] = [];
    }
}