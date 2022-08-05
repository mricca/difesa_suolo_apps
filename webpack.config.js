const path = require("path");
const { GitRevisionPlugin } = require('git-revision-webpack-plugin');
const DefinePlugin = require("webpack/lib/DefinePlugin");

// const themeEntries = require('./MapStore2/build/themes.js').themeEntries;
const extractThemesPlugin = require('./MapStore2/build/themes.js').extractThemesPlugin;
const ModuleFederationPlugin = require('./MapStore2/build/moduleFederation').plugin;

const gitRevPlugin = new GitRevisionPlugin({
    branchCommand: 'log -n1 --format=format:"Message: %s%nCommit: %H%nDate: %aD%nAuthor: %an"'
});

module.exports = require('./MapStore2/build/buildConfig')({
    bundles: {
        'difesa_suolo': path.join(__dirname, "js", "app"),
        'difesa_suolo-embedded': path.join(__dirname, "js", "embedded"),
        'difesa_suolo-api': path.join(__dirname, "MapStore2", "web", "client", "product", "api"),
        'geostory-embedded': path.join(__dirname, "js", "geostoryEmbedded"),
        "dashboard-embedded": path.join(__dirname, "js", "dashboardEmbedded")
    },
    // themeEntries,
    themeEntries: {
        "themes/ds_theme": path.join(__dirname, "themes", "ds_theme", "theme.less")
    },
    paths: {
        base: __dirname,
        dist: path.join(__dirname, "dist"),
        framework: path.join(__dirname, "MapStore2", "web", "client"),
        code: [path.join(__dirname, "js"), path.join(__dirname, "MapStore2", "web", "client")]
    },
    plugins: [extractThemesPlugin, ModuleFederationPlugin, new DefinePlugin({
        __COMMITHASH__: JSON.stringify(gitRevPlugin.commithash()),
        __COMMIT_DATA__: JSON.stringify(gitRevPlugin.branch())
    })],
    prod: false,
    publicPath: undefined,
    cssPrefix: '.difesa_suolo',
    prodPlugins: [],
    alias: {
        "@mapstore/patcher": path.resolve(__dirname, "node_modules", "@mapstore", "patcher"),
        "@mapstore": path.resolve(__dirname, "MapStore2", "web", "client"),
        "@js": path.resolve(__dirname, "js")
    }
});
