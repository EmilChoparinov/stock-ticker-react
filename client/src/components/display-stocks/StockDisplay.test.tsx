import * as React from 'react';
import * as ReactDOM from 'react-dom';
import StockDisplay from './StockDisplay';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<StockDisplay stocks={[]} />, div);
});