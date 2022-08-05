/*
 * Copyright 2018, Riccardo Mari - CNR-Ibimet - Consorzio LaMMA.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
*/
const PropTypes = require('prop-types');
const React = require('react');
const Portal = require('@mapstore/components/misc/Portal').default;
const ResizableModal = require('@mapstore/components/misc/ResizableModal').default;
const Message = require('@mapstore/components/I18N/Message').default;
const Spinner = require('react-spinkit');
// const {
//     ResponsiveContainer,
//     LineChart,
//     Line,
//     Brush,
//     XAxis,
//     YAxis,
//     CartesianGrid,
//     Tooltip,
//     Legend
// } = require('recharts');

const Plot = require('@mapstore/components/charts/PlotlyChart').default;

/**
  * Component used to show a panel with the charts data sar
  * @class SarChart
  * @memberof components
  * @prop {function} onSetSarChartVisibility
  * @prop {function} onFetchSarChartData
  * @prop {object} sarChartData
  * @prop {array} data
  * @prop {bool} show
  *
  */

class SarChart extends React.Component {
    static propTypes = {
        id: PropTypes.string,
        closeGlyph: PropTypes.string,
        onSetSarChartVisibility: PropTypes.func,
        onFetchSarChartData: PropTypes.func,
        show: PropTypes.bool,
        sarChartData: PropTypes.object,
        maskLoading: PropTypes.bool,
        data: PropTypes.array
    };
    static defaultProps = {
        id: "mapstore-sarchart-panel",
        closeGlyph: "1-close",
        onSetSarChartVisibility: () => {},
        onFetchSarChartData: () => {},
        show: false,
        sarChartData: {},
        maskLoading: true,
        data: []
    };

    renderLoading = () => {
        if (this.props.maskLoading) {
            return (<div style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                overflow: "visible",
                margin: "auto",
                verticalAlign: "center",
                left: "0",
                background: "rgba(255, 255, 255, 0.5)",
                zIndex: 2
            }}><div style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -40%)"
                }}><Message msgId="loading" /><Spinner spinnerName="circle" noFadeIn overrideSpinnerClassName="spinner"/></div></div>);
        }
        return null;
    };

    showChart = () => {
        if (!this.props.maskLoading) {
            // return (<ResponsiveContainer width="99%" height="99%"><LineChart data={this.formatData(this.props.data)} syncId="anyId" margin={{
            //     top: 10,
            //     right: 30,
            //     left: 0,
            //     bottom: 10
            // }}>
            //     <CartesianGrid strokeDasharray="3 3"/>
            //     <XAxis dataKey="name" hide={false} angle={-10}/>
            //     <YAxis/>
            //     <Tooltip/>
            //     <Legend/>
            //     <Line type="monotone" dataKey="value" stroke="#004DA8" fill="#004DA8" name="Displacement [mm]"/>
            //     <Brush/>
            // </LineChart></ResponsiveContainer>);
            const value = this.formatDataPlotly(this.props.data);
            const layout = {
                title: this.props.sarChartData.code,
                xaxis: {
                    autorange: true,
                    range: [value.data[0], value.data[-1]],
                    rangeselector: {buttons: [
                        {
                            count: 1,
                            label: '1m',
                            step: 'month',
                            stepmode: 'backward'
                        },
                        {
                            count: 6,
                            label: '6m',
                            step: 'month',
                            stepmode: 'backward'
                        },
                        {step: 'all'}
                    ]},
                    rangeslider: {range: [value.data[0], value.data[-1]]},
                    type: 'date'
                },
                yaxis: {
                    autorange: true,
                    // range: [86.8700008333, 138.870004167],
                    type: 'linear'
                },
                autosize: true
            };
            return (
                <Plot
                    data={[
                        {
                            // x: [1, 2, 3],
                            // y: [2, 6, 3],
                            x: value.data,
                            y: value.value,
                            name: 'Displacement [mm]:',
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: {color: 'red'}
                        }
                    ]}
                    layout={ layout }
                    useResizeHandler
                    style={{width: "100%", height: "100%"}}
                />);
        }
        return this.renderLoading();
    };
    render() {
        // const panelHeader = (
        //     <span role="header">
        //         <span className="layer-settings-metadata-panel-title">Grafico dei valori di spostamento cumulato</span>
        //         <button onClick={() => this.closePanel(false)} className="layer-settings-metadata-panel-close close">{
        //             this.props.closeGlyph
        //                 ? <Glyphicon glyph={this.props.closeGlyph}/>
        //                 : <span>×</span>
        //         }</button>
        //     </span>);
        return this.props.show ?
            (<Portal id={this.props.id}>
                <ResizableModal size="lg"
                    draggable
                    fade
                    onClose={() => {
                        this.closePanel(false);
                    }}
                    title={'Grafico dei valori di spostamento cumulato'}
                    show>
                    <div style={{ width: '100%', height: '100%' }}>
                        {this.showChart()}
                    </div>
                </ResizableModal>
            </Portal>)
            : null;
    }

    accept = (check, value) => {
        if (value) {
            this.props.onSetSarChartVisibility(check, value.code);
            this.props.onFetchSarChartData(value);
        }
        // this.props.onSetSarChartVisibility(check);
    }
    closePanel = () => {
        this.props.onSetSarChartVisibility(false);
    }

    // formatData(values) {
    //     let data = [];
    //     values.forEach(function(o) {
    //         data.push({
    //             "name": o.date.substring(0, 10),
    //             "value": parseFloat(o.value.toFixed(1))
    //         });
    //     }, this);
    //     return data;
    // }
    formatDataPlotly(values) {
        let data = [];
        let value = [];
        values.forEach(function(o) {
            data.push(o.date.substring(0, 10));
            value.push(parseFloat(o.value.toFixed(1)));
        }, this);
        return {data, value};
    }
}
// module.exports = SarChart;
export default SarChart;
