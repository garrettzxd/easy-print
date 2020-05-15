const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const testWebpackConfig = {
  entry: {
    app: './test/index.js',
  },

  output: {
    path: '/test/dist',
    publicPath: '/',
    filename: '[name].bundle.js',
  },

  resolve: {
    extensions: ['.js'],
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: ['/test'],
      },
    ],
  },

  devtool: 'cheap-module-source-map',

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new HTMLWebpackPlugin({
      title: 'Assembly',
      filename: 'index.html',
      template: './test/index.html',
    }),
  ],

  devServer: {
    hot: true,
    host: '0.0.0.0',
    port: '9099',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: '/test/index.html' },
      ],
    },
    open: true,
    watchOptions: {
      poll: true,
    },
  },
};

module.exports = testWebpackConfig;
