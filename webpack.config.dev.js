var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
  'webpack-hot-middleware/client',
  './src/main'
  ],
  output: {
    path: path.join(__dirname, './static/'),
    filename: 'bundle.js',
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
    include: path.resolve(__dirname, 'src/css'),
    loader: 'style-loader!css-loader!less-loader' 
  },{
    test: /\.css$/,
    include: path.resolve(__dirname, 'src/css'),
    loader: 'style-loader!css-loader'
  }, {
    test: /\.(png|jpg)$/,
    loader: 'url?limit=25000'
  }]
}
};
