var express = require('express');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./config');

var app = express();
app.use(express.static(config.TEST_PATH));
app.listen(8081, 'localhost', function(err) {
    console.log(err ? err : 'Mock server listening at http://localhost:8081');
});

var compiler = (function(){
    var webpack = require('webpack');
    var webpackConfig = require('./webpack.config');
    return webpack(webpackConfig);
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
    proxy: {
        '/api/*': {
            target: 'http://localhost:8081',
            secure: false
        },
        '/*.html': {
            target: 'http://localhost:8081',
            secure: false
        },
        '/': {
            target: 'http://localhost:8081/index.html',
            secure: false
        }
    }
});
server.listen(8080, 'localhost', function(err) {
    console.log(err ? err : 'Asserts server listening at http://localhost:8080');
});
