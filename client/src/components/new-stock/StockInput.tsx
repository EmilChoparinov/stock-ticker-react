import * as React from 'react';
import './StockInput.css';
import { BatchStock } from '../../formats/batchstock';
import { ServerMessage } from '../../formats/servermessage';
import { StringUtils } from '../../utils/string.util';

export interface Props {
    handleNewStockRequest: (inputData: string) => Promise<ServerMessage<Array<BatchStock>>>;
    stocksCalled: Array<BatchStock>;
}

export interface State {
    message: string;
    stockInput: string;
}

class StockInput extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            message: '',
            stockInput: ''
        };
    }

    handleNewStockSubmit = () => {
        const filteredStocks = this._filterCalledStocks(this.state.stockInput);
        console.log(filteredStocks);
        if (filteredStocks.length > 0) {
            this.props.handleNewStockRequest(filteredStocks)
                .then((stocks) => {
                    const countOfStocks = StringUtils.countOccurances(filteredStocks, ',');
                    if (stocks.output.length !== countOfStocks + 1) {
                        this.setState({ message: '* some stocks were invalid' });
                    } else {
                        this.setState({ stockInput: '' });
                        this.setState({ message: '' });
                    }
                });
        } else {
            this.setState({ message: 'All given stocks already loaded' });
        }
    }

    handleStockChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({ stockInput: event.currentTarget.value });
    }

    getStockForm() {
        return (
            <div className="row">
                <div className="col s12" onSubmit={this.handleNewStockSubmit}>
                    <div id="remove-md" className="row">
                        <div className="input-field col s12">
                            <input
                                id="stock_symbol"
                                type="text"
                                className="validate"
                                value={this.state.stockInput}
                                onChange={this.handleStockChange}
                                onKeyPress={(event) => {
                                    event.persist();
                                    console.log(event);
                                    if (event.charCode === 13) {
                                        this.handleNewStockSubmit();
                                    }
                                }}
                            />
                            <label htmlFor="stock_symbol">Stock Symbol(s)</label>
                        </div>
                    </div>
                    <span id="stock-input-message">{this.state.message}</span>
                    <div className="right-align">
                        <div
                            className="waves-effect waves-light btn right-align"
                            onClick={this.handleNewStockSubmit}
                        >submit
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="StockInput">
                <div className="card">
                    <div className="card-content">
                        {this.getStockForm()}
                    </div>
                </div>
            </div>
        );
    }

    /**
     * filters out the stocks that have been currently added to avoid duplicates
     */
    private _filterCalledStocks = (stockRequests: string) => {
        const stockRequestArray = stockRequests.split(',');
        const filteredRequests = [];
        for (let stockRequest of stockRequestArray) {
            filteredRequests.push(stockRequest);
            for (let stock of this.props.stocksCalled) {
                if (stock['1. symbol'] === stockRequest) {
                    filteredRequests.pop();
                    break;
                }
            }
        }
        const fixFirstFiltered = (requests: string[]) => {
            if (requests.length > 0) {
                const firstSpace = requests[0].indexOf(' ');
                if (firstSpace > 0) {
                    requests[0] = requests[0].slice(firstSpace);
                }
            }
        };

        fixFirstFiltered(filteredRequests);

        return filteredRequests.join(',');
    }
}

export default StockInput;
