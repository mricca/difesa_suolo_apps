/*
 * Copyright 2018, Riccardo Mari - CNR-Ibimet - Consorzio LaMMA.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
*/

const Rx = require('rxjs');
const {FETCH_SARCHART_DATA, fetchedSarChartData} = require('../actions/sarchart');
const API = require('../api/SAR');

/**
 * Show the sarchart
 * @param  {external:Observable} action$ triggers on "FETCH_SARCHART_DATA"
 * @param  {object} store   the store, to get current notifications
 * @memberof epics.sarchart
 * @return {external:Observable} the steam of actions to trigger to fetch SarChartData.
 */

const loadSarChartData = (action$, store) =>
    action$.ofType(FETCH_SARCHART_DATA)
        .switchMap(() => Rx.Observable.fromPromise(
            API.fetchSarData(store.getState().sarchart.sarChartData)
                .then(res => res.data)
        ))
        .switchMap(data => Rx.Observable.of(fetchedSarChartData(data, false)));

module.exports = {
    loadSarChartData
};
