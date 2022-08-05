/*
 * Copyright 2018, Riccardo Mari - CNR-Ibimet - Consorzio LaMMA.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
*/

const SET_SARCHART_VISIBILITY = 'SET_SARCHART_VISIBILITY';
const FETCH_SARCHART_DATA = 'FETCH_SARCHART_DATA';
const FETCHED_SARCHART_DATA = 'FETCHED_SARCHART_DATA';


function setSarChartVisibility(status) {
    return {
        type: SET_SARCHART_VISIBILITY,
        status,
        data: [],
        maskLoading: true
    };
}

function fetchSarChartData(params) {
    return {
        type: FETCH_SARCHART_DATA,
        params
    };
}

function fetchedSarChartData(data, maskLoading) {
    return {
        type: FETCHED_SARCHART_DATA,
        data,
        maskLoading
    };
}
module.exports = {
    SET_SARCHART_VISIBILITY, setSarChartVisibility,
    FETCH_SARCHART_DATA, fetchSarChartData,
    FETCHED_SARCHART_DATA, fetchedSarChartData
};
