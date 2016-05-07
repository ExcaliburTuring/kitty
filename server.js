var express = require('express');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./config');
var mock = require('./mock');

var app = express();
app.use(express.static(config.TEST_PATH));
app.use(express.static(config.ASSET_PATH));
app.get('/*', mock.mockHandler);
app.post('/*', mock.mockHandler);
app.listen(8081, 'localhost', function(err) {
    console.log(err ? err : 'Mock server listening at http://localhost:8081');
});

var compiler = (function(){
    var webpack = require('webpack');
    var webpackConfig = require('./webpack.config');
    return webpack(webpackConfig);
}());
var proxyConfig =(function(){
    var tempProxyConfig 
        = mock.mockConfig
        .reduce(function(temp, config) {
            temp[config.url] = {
                target: 'http://localhost:8081',
                secure: false
            };
            return temp;
        }, {});
    return tempProxyConfig;
}());
var server = new WebpackDevServer(compiler, {
    hot: true,
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
    stats: { 
        colors: true
    },
    contentBase: config.SRC_PATH,
    publicPath: config.PUBLIC_PATH,
    proxy: proxyConfig
});
server.listen(8080, '0.0.0.0', function(err) {
    console.log(err ? err : 'Asserts server listening at http://localhost:8080');
    console.log();
});
