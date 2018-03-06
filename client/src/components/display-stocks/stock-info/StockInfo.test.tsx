import * as React from 'react';
import * as ReactDOM from 'react-dom';
import StockInfo from './StockInfo';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<StockInfo symbol="Tester" price={10} volume={10} />, div);
});