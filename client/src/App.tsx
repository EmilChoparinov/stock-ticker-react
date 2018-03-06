import * as React from 'react';
import './App.css';
import StockInput from './components/new-stock/StockInput';
import StockDisplay from './components/display-stocks/StockDisplay';

import * as axios from 'axios';
import { BatchStock } from './formats/batchstock';
import { ServerMessage } from './formats/servermessage';

export interface Props {
}

export interface State {
  batchStockData: BatchStock[];
}

class App extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      batchStockData: []
    };
  }

  /**
   * handles new data sent from the Stock Input component
   * @param inputData possible request data to send to the server
   */
  handelNewStockData = (inputData: string): Promise<ServerMessage<Array<BatchStock>>> => {
    return new Promise<ServerMessage<Array<BatchStock>>>((resolve, reject) => {
      axios.default.post('http://localhost:8000/api/findstocks', { symbols: inputData })
        .then(
          (res) => {
            const resData: ServerMessage<Array<BatchStock>> = res.data;
            if (resData.apistatus === 'failing') {
              alert('The stock api is currently failing, try again later');
            } else {
              this._addBatchStockData(resData.output);
              resolve(resData);
            }
          }
        ).catch((err) => {
          reject(err);
        });
    });
  }

  handleStockRemove = (symbol: string) => {
    let newData: BatchStock[] = [];
    for (let stock of this.state.batchStockData) {
      if (stock['1. symbol'] !== symbol) {
        newData.push(stock);
      }
    }
    this.setState({ batchStockData: newData });
  }

  render() {
    return (
      <div className="App container">
        <div className="app-title">
          <h1>Welcome To Stock Ticker</h1>
        </div>
        <div className="center-stock">
          <StockInput handleNewStockRequest={this.handelNewStockData} stocksCalled={this.state.batchStockData} />
        </div>
        <StockDisplay stocks={this.state.batchStockData} removeHandler={this.handleStockRemove} />
      </div>
    );
  }

  /**
   * adds new batches of stock data to the current state batch
   * @param batchStocks the stocks to batch
   */
  private _addBatchStockData = (batchStocks: Array<BatchStock>) => {
    const newStockData = this.state.batchStockData;
    for (let batchStock of batchStocks) {
      newStockData.push(batchStock);
    }
    this.setState({ batchStockData: newStockData });
  }
}

export default App;
