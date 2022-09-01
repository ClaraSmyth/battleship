const path = require('path');

module.exports = {
    mode: 'production',
    entry: {
        main: path.resolve(__dirname, './src/index.js'),
    },
    output: {
        filename: './[name].[contenthash].js',
        path: path.resolve(__dirname, './dist'),
        clean: true,
    },
    module: {
      rules: [{
          test: /\.js?$/,
          exclude: /node_modules/,
          use: {
              loader: 'babel-loader',
          },
      }],
    },
};