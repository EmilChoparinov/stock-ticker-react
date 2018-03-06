import * as React from 'react';
import './StockDisplay.css';
import { BatchStock } from '../../formats/batchstock';
import { v4 as idv4 } from 'uuid';
import StockInfo from './stock-info/StockInfo';

export interface Props {
    stocks: Array<BatchStock>;
}

class StockDisplay extends React.Component<Props, {}> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        const stockDisplayData = this.props.stocks.map((stock) => {
            return (
                <StockInfo
                    key={idv4()}
                    symbol={stock['1. symbol']}
                    price={stock['2. price']}
                    volume={stock['3. volume']}
                />
            );
        });
        return (
            <div className="StockDisplay">
                {stockDisplayData}
            </div>
        );
    }
}

export default StockDisplay;
