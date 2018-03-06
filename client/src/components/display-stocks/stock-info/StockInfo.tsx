import * as React from 'react';
import './StockInfo.css';
import { StockGraph } from './stock-graph/StockGraph';
import { DatePlots } from '../../../formats/dateplots';

export interface Props {
    symbol: string;
    price: number;
    volume: number;
    onRemove: (symbol: string) => void;
}

export interface State {
    isGraphOn: boolean;
    hasLoaded: boolean;
    plotData: DatePlots | null;
}

class StockInfo extends React.Component<Props, State> {

    graph: JSX.Element;
    constructor(props: Props) {
        super(props);
        this.state = {
            isGraphOn: false,
            hasLoaded: false,
            plotData: null
        };
    }

    handleGraphComponent = () => {
        let graphState = this.state.isGraphOn;
        graphState = !graphState;
        this.setState({ isGraphOn: graphState });
    }

    setPlotData = (data: DatePlots) => {
        console.log('setting plot data');
        this.setState({ plotData: data });
    }

    sendRemoveRequest = () => {
        this.props.onRemove(this.props.symbol);
    }

    render() {
        let graph;

        // for the graph toggle
        if (this.state.isGraphOn) {
            graph = (
                <div className="card-content graph">
                    <StockGraph
                        symbol={this.props.symbol}
                        plotData={this.state.plotData}
                        passPlotData={this.setPlotData}
                    />
                </div>
            );
        }
        return (
            <div className="card">
                <div className="card-content stock-data">
                    <h5>{this.props.symbol}</h5>
                    <div className="stock-counters">
                        <div>
                            <div className="type">Symbol</div>
                            <div>
                                {this.props.symbol}
                            </div>
                        </div>
                        <div>
                            <div className="type">Price</div>
                            <div>{this.props.price}</div>
                        </div>
                        <div>
                            <div className="type">Volume</div>
                            <div>{this.props.volume}</div>
                        </div>
                        <div
                            className="waves-effect waves-light btn right-align"
                            onClick={this.handleGraphComponent}
                        >Graph
                        </div>
                        <div
                            className="waves-effect red accent-2 btn right-align"
                            onClick={this.sendRemoveRequest}
                        >Delete
                        </div>
                    </div>
                </div>
                {graph}
            </div>
        );
    }
}

export default StockInfo;
