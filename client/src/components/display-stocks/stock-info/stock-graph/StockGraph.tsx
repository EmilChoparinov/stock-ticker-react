import * as React from 'react';
import './StockGraph.css';

import { Line } from 'react-chartjs-2';

import * as dateformat from 'dateformat';

import * as axios from 'axios';
import { DatePlot } from '../../../../formats/dateplot';
import { DatePlots } from '../../../../formats/dateplots';

export interface Props {
    symbol: string;
    plotData: DatePlots | null;
    passPlotData: (plotData: DatePlots) => void;
}

export interface State {
    lineData: DatePlots;
    graphParams: {
        'function': string;
        interval: string;
    };
    isMounted: boolean;
}

export class StockGraph extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            isMounted: false,
            lineData: new DatePlots(),
            graphParams: {
                'function': 'TIME_SERIES_DAILY',
                interval: '60min'
            }
        };
    }

    componentWillMount() {

        // if the data is not provided by the parent, make the request and give the data to the parent
        if (!this.props.plotData) {
            axios.default.post('/api/findstock', {
                symbol: this.props.symbol,
                'function': this.state.graphParams.function,
                interval: this.state.graphParams.interval
            })
                .then((response) => {
                    const dataSets = this._generateDataSets(response.data.output);
                    this.props.passPlotData(dataSets);
                    this.setState({ lineData: dataSets, isMounted: true });
                }).catch((err) => console.log(err));
        } else {
            this.setState({ lineData: this.props.plotData, isMounted: true });
        }
    }

    getLoadingGraphData() {
        return (
            <p>Loading...</p>
        );
    }

    getGraph() {
        return (
            <div>
                <Line
                    data={{
                        labels: this._generateLabels(this.state.lineData),
                        datasets: [
                            {
                                data: this.state.lineData['1. open'],
                                label: 'Open',
                                borderColor: '#3e95cd',
                                fill: false
                            },
                            {
                                data: this.state.lineData['2. high'],
                                label: 'Open',
                                borderColor: '#8e5ea2',
                                fill: false
                            },
                            {
                                data: this.state.lineData['1. open'],
                                label: 'High',
                                borderColor: '#3cba9f',
                                fill: false
                            },
                            {
                                data: this.state.lineData['3. low'],
                                label: 'Low',
                                borderColor: '#e8c3b9',
                                fill: false
                            },
                            {
                                data: this.state.lineData['4. close'],
                                label: 'Close',
                                borderColor: '#c45850',
                                fill: false
                            },
                        ]
                    }}
                    options={{
                        responsive: true,
                        title: {
                            display: true,
                            text: `${this.props.symbol}'s Stock Data`
                        },
                        scales: {
                            yAxes: [
                                {
                                    display: true,
                                    ticks: {
                                        min: 70
                                    }
                                }
                            ]
                        }
                    }}
                />
            </div>
        );
    }

    render() {
        let curRender;

        // if the graph is not currently mounted, do not load
        // if it is, load
        if (!this.state.isMounted) {
            curRender = this.getLoadingGraphData();
        } else {
            curRender = this.getGraph();
        }
        return (
            <div>
                {curRender}
            </div>
        );
    }

    /**
     * generates the dataset in the format chart.js likes
     * @param stockData the extremely hard to declare object this api sends me
     */
    private _generateDataSets = (stockData: object) => {
        let dataSets: DatePlots = new DatePlots();
        for (let stockDate in stockData) {
            if (stockData[stockDate]) {
                dataSets['1. open'].push(new DatePlot(stockDate, stockData[stockDate]['1. open']));
                dataSets['2. high'].push(new DatePlot(stockDate, stockData[stockDate]['2. high']));
                dataSets['3. low'].push(new DatePlot(stockDate, stockData[stockDate]['3. low']));
                dataSets['4. close'].push(new DatePlot(stockDate, stockData[stockDate]['4. close']));
                dataSets['5. volume'].push(new DatePlot(stockDate, stockData[stockDate]['5. volume']));
            }
        }
        return dataSets;
    }

    /**
     * generates the lables for the graph, spread by time 12 units
     * @param dataSets the full dateplot object
     */
    private _generateLabels = (dataSets: DatePlots) => {
        const timeInt = Math.trunc(dataSets['1. open'].length / 12);
        const labels: Array<string> = [];
        for (let point = dataSets['1. open'].length - 1; point >= 0; point--) {
            if (point % timeInt === 0) {
                const label = dateformat(dataSets['1. open'][point].x, 'mmm d');
                labels.push(label);
            }
        }
        return labels;
    }
}

export default StockGraph;
