/*
 * Copyright 2018, Riccardo Mari - CNR-Ibimet - Consorzio LaMMA.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
*/

const axios = require('@mapstore/libs/ajax');
const urlUtil = require('url');
const assign = require('object-assign');
const DEFAULT_URL = 'geoportale.lamma.rete.toscana.it/cgi-bin/sar_app/sarCharts.py';

/**
 * API for fetch sar data
 */
const Api = {
    fetchSarData: function(chartParams, options) {
        const params = assign(
            {
                code: chartParams.code,
                layer: chartParams.layer
            },
            options || {}
        );
        const url = urlUtil.format({
            protocol: "https",
            host: DEFAULT_URL,
            query: params
        });
        return axios.get(url);
    }
};

module.exports = Api;
