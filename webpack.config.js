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
const STATIC_PATH = config.STATIC_PATH;

var entries = {};
var plugins = (function(){
    var array = [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common',
            filename: debug ? 'common.js' : 'common-[chunkhash].js',
            minChunks: 3
        })
    ];
    if (!debug) {
        array.push(
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
            })
        );
    } else {
        array.push(
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoErrorsPlugin()
        );
    }
    return array;
})();

(function(){
    fs.readdirSync(SRC_PATH)
    .filter(function(dir) {
        return config.ENTRY_EXCLUDE.indexOf(dir) < 0 
            && fs.statSync(path.join(SRC_PATH, dir)).isDirectory();
    }).forEach(function(dir) {
        var dirPath = path.join(SRC_PATH, dir);
        entries[dir] = [path.resolve(dirPath, 'main.jsx')];
        if (debug) {
            entries[dir].unshift("webpack-dev-server/client?http://localhost:8080/", "webpack/hot/dev-server");
        }
        var htmlFileName = dir + '.html';
        plugins.push(new HtmlWebpackPlugin({
            filename: "../" + htmlFileName,
            template: path.resolve(dirPath, htmlFileName),
            chunks:['common', dir] // also add common chunk
        }));
    });
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
        extensions: ['', '.js', '.jsx', '.json', '.css', '.less', '.jpg', '.png', '.gif']
    },
    externals: {
        'react': 'React',
        'react-dom': 'ReactDOM',
        'react-bootstrap': 'ReactBootstrap',
        'react-route': 'ReactRouter',
        'reflux': 'Reflux',
        'history': 'History',
        'antd': 'antd',
        'marked': 'marked',
        'swiper': 'Swiper',
        'id-validator': 'IDValidator'
    },
    plugins: plugins,
    module: {
        loaders: [{
            test: /\.(js|jsx)$/,
            include: SRC_PATH,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
              presets: ['es2015', 'stage-0', 'react']
            }
        }, {
            test: /\.less$/,
            loader: 'style!css!less'
        }, {
            test: /\.css$/,
            loader: 'style!css'
        }, {
            test: /\.(png|jpg|gif)$/,
            loader: 'url-loader?limit=10000'
        }, {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "url-loader?limit=10000&minetype=application/font-woff"
        }, {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: "file-loader"
        }]
    }
};
if (debug) {
    config['devtool'] = 'eval-source-map';
}

module.exports = config;
