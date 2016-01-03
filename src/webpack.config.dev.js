var fs = require('fs')
var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',  
  entry: fs.readdirSync(__dirname).reduce(function (entries, dir) {
    if (fs.statSync(path.join(__dirname, dir)).isDirectory())
      entries[dir] = path.join(__dirname, dir, 'main.jsx')

    return entries
  }, {}),

  output: {
    path: __dirname + '/static',
    filename: '[name].js',
    publicPath: '/static/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.css', '.less', '.jpg', '.png']
  },
  plugins: [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin()
  ],
  module: {
    loaders: [{
     test: /\.js$/,
     include: path.join(__dirname, 'src')
  }, {
    test: /\.jsx$/,
    loader: 'babel-loader',
     query: {
      presets: [
      'es2015',
      'react'
      ]
    }
  },{
    test: /\.less$/,
    loader: 'style-loader!css-loader!less-loader' 
  },{
    test: /\.css$/,
    loader: 'style-loader!css-loader'
  }, {
    test: /\.(png|jpg)$/,
    loader: 'url?limit=25000'
  }]
}
};
