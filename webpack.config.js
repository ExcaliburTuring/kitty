/**
 * @author zhaowei
 */
var fs = require('fs');
var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var debug = process.env.NODE_ENV !== 'production';
var config = require('./config');
const SRC_PATH = config.SRC_PATH;
const PUBLIC_PATH = config.PUBLIC_PATH;
const STATIC_PATH = config.STATIC_PATH;

var targetDir = [];
(function(){
    fs.readdirSync(SRC_PATH)
    .filter(function(dir) {
        return config.ENTRY_EXCLUDE.indexOf(dir) < 0 
            && fs.statSync(path.join(SRC_PATH, dir)).isDirectory();
    }).forEach(function(dir) {
        targetDir.push(dir);
    });
}());
var pcDir = [], wapDir = [];
for (var i = 0, n = targetDir.length; i < n; i++) {
    var dir = targetDir[i];
    if (/^w/.test(dir)) {
        wapDir.push(dir);
    } else {
        pcDir.push(dir);
    }
}
console.log(pcDir);
console.log(wapDir);

var plugins = [
    new webpack.optimize.CommonsChunkPlugin({
        name: 'common',
        filename: debug ? 'common.js' : 'common-[chunkhash].js',
        minChunks: 3,
        chunks: pcDir
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: 'wcommon',
        filename: debug ? 'wcommon.js' : 'wcommon-[chunkhash].js',
        minChunks: 3,
        chunks: wapDir
    }),
];
(function(){
    if (debug) {
        plugins.push(
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin()
        );
    } else {
        plugins.push(
            new webpack.optimize.UglifyJsPlugin({
                minimize: true,
                compress: {
                    warnings: false
                }
            }),
            new webpack.DefinePlugin({
                'process.env': {
                  'NODE_ENV': JSON.stringify('production')
                }
            }),
            new ExtractTextPlugin('stylesheets/[name]-[chunkhash].css', {allChunks: true})
        );
    }
}());

var entries = {};
(function(){
    targetDir.forEach(function(dir) {
        var dirPath = path.join(SRC_PATH, dir);
        entries[dir] = [path.resolve(dirPath, 'main.jsx')];
        if (debug) {
            entries[dir].unshift("webpack-dev-server/client?http://localhost:8080/", "webpack/hot/dev-server");
        }
        var htmlFileName = dir + '.html';
        plugins.push(new HtmlWebpackPlugin({
            filename: "../" + htmlFileName,
            template: path.resolve(dirPath, htmlFileName),
            chunks:[ /^w/.test(dir) ? 'wcommon' : 'common', dir] // also add common chunk
        }));
    });
}());

var loaders = [{
    test: /\.(js|jsx)$/,
    include: SRC_PATH,
    exclude: /node_modules/,
    loader: 'babel',
    query: {
      presets: ['es2015', 'stage-0', 'react']
    }
}, {
    test: /\.(png|jpg|gif)$/,
    loader: 'url-loader?limit=5000'
}, {
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: "url-loader?limit=10000&minetype=application/font-woff"
}, {
    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: "file-loader"
}];
(function(){
    if (debug) {
        loaders.push({
            test: /\.css$/,
            loader: 'style-loader!css-loader'
        }, {
            test: /\.less$/,
            loader: 'style-loader!css-loader!less-loader'
        });
    } else {
        loaders.push({
            test: /\.css$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
        }, {
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
        });
    }
}());

var config = {
    entry: entries,
    output: {
        path: STATIC_PATH,
        filename: debug ? '[name].js' : '[name]-[chunkhash].js',
        publicPath: PUBLIC_PATH
    },
    resolve: {
        alias: config.PATH_MAP,
        modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
        extensions: ['', '.web.js', '.js', '.jsx', '.json', '.css', '.less', '.jpg', '.png', '.gif']
    },
    externals: {
        // 'react-bootstrap': 'ReactBootstrap',
        // 'antd': 'antd',
        'swiper': 'Swiper'
    },
    plugins: plugins,
    module: {
        loaders: loaders
    }
};
if (debug) {
    config['devtool'] = 'eval-source-map';
}

module.exports = config;
