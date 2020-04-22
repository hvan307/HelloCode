const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './frontend/src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve('./frontend/dist')
  },
  devtool: 'source-maps',
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.css$/, loader: ['style-loader', 'css-loader'] },
      { test: /\.s(a|c)ss$/, loader: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.woff2?$/, loader: 'file-loader' },
      { test: /\.(jpg|png|gif)$/, loader: 'file-loader' }
    ]
  },
  devServer: {
    contentBase: './frontend/src',
    hot: true,
    open: true,
    port: 8001,
    watchContentBase: true,
    proxy: {
      '/api': 'http://0.0.0.0:4000',
      '/media': 'http://0.0.0.0:4000'
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'dist/index.html',
      filename: 'index.html',
      inject: 'body'
    })
  ]
}
