/*
 * Copyright 2018, Riccardo Mari - CNR-Ibimet - Consorzio LaMMA.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
*/

const {connect} = require('react-redux');
const {setSarChartVisibility, fetchSarChartData, fetchedSarChartData} = require('../actions/sarchart');
const sarChartComponent = require('../components/sarcharts/SarChart').default;
import { createPlugin } from '@mapstore/utils/PluginsUtils';

const mapStateToProps = (state) => ({
    show: state.sarchart && state.sarchart.showSarChartPanel || false,
    sarChartData: state.sarchart && state.sarchart.sarChartData || '',
    data: state.sarchart && state.sarchart.data || '',
    maskLoading: state.sarchart && state.sarchart.maskLoading
});

const mapDispatchToProps = {
    onSetSarChartVisibility: setSarChartVisibility,
    onFetchSarChartData: fetchSarChartData,
    onFetchedSarChartData: fetchedSarChartData
};

const SarCharts = connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    {
        forwardRef: true
    }
)(sarChartComponent);

export default createPlugin(
    'SarCharts',
    {
        component: SarCharts,
        reducers: {
            sarchart: require('../reducers/sarchart')
        },
        epics: require('../epics/sarchart')
    }
);
