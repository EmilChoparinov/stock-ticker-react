import * as React from 'react';
import * as ReactDOM from 'react-dom';
import StockGraph from './StockGraph';
import { DatePlots } from '../../../../formats/dateplots';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <StockGraph symbol="MSFT" plotData={new DatePlots()} passPlotData={() => { console.log('not empty'); }} />,
        div
    );
});