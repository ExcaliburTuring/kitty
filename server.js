var express = require('express');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./config');
const TEST_PATH = config.TEST_PATH;
var mockPages = ['/', '/test', '/index', '/product', '/register', '/login'];
var mockRequest = ['/account/*'];

var app = express();
app.use(express.static(TEST_PATH));
app.get('/*', function(req, res) {
    var path = req.path;
    if (mockPages.indexOf(path) > 0) {
        res.sendFile(path === '/' ? '/index.html' : path + '.html', {root: TEST_PATH});
    } else {
        for (var i = 0; i < mockRequest.length; i++) {
            if(path.match(new RegExp(mockRequest[i]))) {
                var mockFile = TEST_PATH + path.replace(/\//g, '_').substring(1) + '.js';
                res.json(require(mockFile));
                return;
            }
        }
        res.json({status: 404, errMsg: "Can't find " + path});
    }
});
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
        = mockPages.concat(mockRequest)
        .reduce(function(temp, url) {
            temp[url] = {
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
server.listen(8080, 'localhost', function(err) {
    console.log(err ? err : 'Asserts server listening at http://localhost:8080');
});
