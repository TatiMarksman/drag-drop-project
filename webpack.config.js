const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    trello: './src/trello.js',
    uploader: './src/uploader.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      filename: 'index.html',
      chunks: ['trello'],
    }),
    new HtmlWebpackPlugin({
      template: './public/uploader.html',
      filename: 'uploader.html',
      chunks: ['uploader'],
    }),
  ],
  devServer: {
    open: false,
    port: 3000,
    historyApiFallback: false,
    static: { directory: path.join(__dirname, 'public') },
  },
  mode: 'development',
};
