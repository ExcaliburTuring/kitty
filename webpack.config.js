/**
 * @author zhaowei
 */

var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var debug = process.env.NODE_ENV !== 'production';
var config = require('./config');
const SRC_PATH = config.SRC_PATH;
const PUBLIC_PATH = config.PUBLIC_PATH;
const ASSETS_PATH = config.ASSETS_PATH;
var entries = {};
var plugins = [
    new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        filename: debug ? 'common.js' : 'common-[chunkhash].js',
        minChunks: 3
    })
];

(function(){
    if (!debug) {
        plugins.push(new webpack.optimize.UglifyJsPlugin({
            minimize: true
        }));
    } else {
        plugins.push(
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin()
        );
    }
    fs.readdirSync(SRC_PATH)
    .filter(function(dir) {
        return config.ENTRY_EXCLUDE.indexOf(dir) < 0;
    }).forEach(function(dir) {
        var dirPath = path.join(SRC_PATH, dir);
        var htmlFileName = dir + '.html';
        if (fs.statSync(dirPath).isDirectory()) {
            entries[dir] = [path.resolve(dirPath, 'main.jsx')];
            if (debug) {
                entries[dir].unshift("webpack-dev-server/client?http://localhost:8080/", "webpack/hot/dev-server");
            }
        }
        plugins.push(new HtmlWebpackPlugin({
            filename: "../" + htmlFileName,
            template: path.resolve(dirPath, htmlFileName),
            chunks:['common', dir] // also add common chunk
        }));
    });
}());

module.exports = {
    entry: entries,
    output: {
        path: ASSETS_PATH,
        filename: debug ? '[name].js' : '[name]-[chunkhash].js',
        publicPath: PUBLIC_PATH
    },
    resolve: {
        alias: config.PATH_MAP,
        extensions: ['', '.js', '.jsx', '.json', '.css', '.less', '.jpg', '.png']
    },
    plugins: plugins,
    module: {
        loaders: [{
            test: /\.js$/,
            include: SRC_PATH,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
              presets: ['es2015', 'stage-0', 'react']
            }
        }, {
            test: /\.jsx$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'react']
            }
        }, {
            test: /\.less$/,
            loader: 'style!css!less'
        }, {
            test: /\.css$/,
            loader: 'style!css'
        }, {
            test: /\.(png|jpg)$/,
            loader: 'url?limit=25000'
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url?limit=10000&minetype=application/font-woff"
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file"
        }]
    },
    devtool: 'eval-source-map'
};
