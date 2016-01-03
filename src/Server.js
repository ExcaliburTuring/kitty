var path = require('path');
var express = require('express');
var rewrite = require('express-urlrewrite')
var webpack = require('webpack');
var config = require('./webpack.config.dev');

var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: '/static/'
}));

app.use(require('webpack-hot-middleware')(compiler));

var fs = require('fs')

fs.readdirSync(__dirname).forEach(function (file) {
  if (fs.statSync(path.join(__dirname, file)).isDirectory())
    app.use(rewrite('/' + file + '/*', '/' + file + '/index.html'))
})

app.use(express.static(__dirname))

app.listen(3000, 'localhost', function(err) {
  console.log('Listening at http://localhost:3000');
});
