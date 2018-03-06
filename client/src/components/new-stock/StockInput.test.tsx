import * as React from 'react';
import * as ReactDOM from 'react-dom';
import StockInput from './StockInput';
import { BatchStock } from '../../formats/batchstock';
import { ServerMessage } from '../../formats/servermessage';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <StockInput
            handleNewStockRequest={() => {
                return new Promise<ServerMessage<Array<BatchStock>>>(
                    (resolve) => resolve({ success: true, output: [], apistatus: 'passing' }));
            }}
            stocksCalled={[]}
        />,
        div);
});