/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
  * Please, keep them sorted alphabetically
 */
// module.exports = {
//     plugins: {
//         // product plugins
//         SarChartsPlugin: require('../js/plugins/SarCharts').default,
//         // AboutPlugin: require('../js/plugins/About'),
//         FooterPlugin: require('../js/plugins/Footer'),
//         ShowSarReportPlugin: require('../js/plugins/ShowSarReport'),
//         HelpLinkSarPlugin: require('../js/plugins/HelpLinkSar')
//     }
// };
module.exports = {
    plugins: {
        // HomeDescriptionPlugin: require('../js/plugins/HomeDescription').default,
        FooterPlugin: require('../js/plugins/Footer'),
        SarChartsPlugin: require('../js/plugins/SarCharts').default
    }
};
