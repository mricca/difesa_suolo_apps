const path = require("path");

// const themeEntries = require('./MapStore2/build/themes.js').themeEntries;
const extractThemesPlugin = require('./MapStore2/build/themes.js').extractThemesPlugin;
const ModuleFederationPlugin = require('./MapStore2/build/moduleFederation').plugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { GitRevisionPlugin } = require('git-revision-webpack-plugin');
const DefinePlugin = require("webpack/lib/DefinePlugin");

const paths = {
    base: __dirname,
    dist: path.join(__dirname, "dist"),
    framework: path.join(__dirname, "MapStore2", "web", "client"),
    code: [path.join(__dirname, "js"), path.join(__dirname, "MapStore2", "web", "client")]
};
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
    paths,
    plugins: [extractThemesPlugin, ModuleFederationPlugin, new DefinePlugin({
        __COMMITHASH__: JSON.stringify(gitRevPlugin.commithash()),
        __COMMIT_DATA__: JSON.stringify(gitRevPlugin.branch())
    })],
    prod: true,
    publicPath: undefined,
    cssPrefix: '.difesa_suolo',
    prodPlugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'indexTemplate.html'),
            chunks: ['difesa_suolo'],
            publicPath: 'dist/',
            inject: "body",
            hash: true
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'embeddedTemplate.html'),
            chunks: ['difesa_suolo-embedded'],
            publicPath: 'dist/',
            inject: "body",
            hash: true,
            filename: 'embedded.html'
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'apiTemplate.html'),
            chunks: ['difesa_suolo-api'],
            publicPath: 'dist/',
            inject: 'body',
            hash: true,
            filename: 'api.html'
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'geostory-embedded-template.html'),
            chunks: ['geostory-embedded'],
            publicPath: 'dist/',
            inject: "body",
            hash: true,
            filename: 'geostory-embedded.html'
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'dashboard-embedded-template.html'),
            chunks: ['dashboard-embedded'],
            publicPath: 'dist/',
            inject: 'body',
            hash: true,
            filename: 'dashboard-embedded.html'
        })
    ],
    alias: {
        "@mapstore/patcher": path.resolve(__dirname, "node_modules", "@mapstore", "patcher"),
        "@mapstore": path.resolve(__dirname, "MapStore2", "web", "client"),
        "@js": path.resolve(__dirname, "js")
    }
});
