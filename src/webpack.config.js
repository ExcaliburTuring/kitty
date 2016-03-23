var fs = require('fs');
var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: fs.readdirSync(__dirname).reduce(function (entries, dir) {
    if (fs.statSync(path.join(__dirname, dir)).isDirectory())
      entries[dir] = path.join(__dirname, dir, 'main.jsx')

    return entries
  }, {}),

  output: {
    path: '../static',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
    publicPath: '../static/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.css']
  },
  plugins: [
  new webpack.optimize.CommonsChunkPlugin('shared.js'),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      warnings: false
    }
  })
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
  }, {
    test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
    loader: "url-loader?limit=10000&minetype=application/font-woff"
  }, {
    test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
    loader: "file-loader"
  }]
}
};
