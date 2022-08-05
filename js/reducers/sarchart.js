/*
 * Copyright 2018, Riccardo Mari - CNR-Ibimet - Consorzio LaMMA.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
*/

const {SET_SARCHART_VISIBILITY, FETCH_SARCHART_DATA, FETCHED_SARCHART_DATA} = require('../actions/sarchart');
const assign = require('object-assign');

function sarchart(state = {showSarChartPanel: false, sarChartData: {}, data: [], maskLoading: true}, action) {
    switch (action.type) {
    case SET_SARCHART_VISIBILITY: {
        return assign({}, state, {showSarChartPanel: action.status, data: action.data, maskLoading: action.maskLoading});
    }
    case FETCH_SARCHART_DATA: {
        return assign({}, state, {sarChartData: action.params});
    }
    case FETCHED_SARCHART_DATA: {
        return assign({}, state, {data: action.data, maskLoading: action.maskLoading});
    }
    default:
        return state;
    }
}

module.exports = sarchart;
