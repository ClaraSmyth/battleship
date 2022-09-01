const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        static: './dist',
    },
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
    optimization: {
        runtimeChunk: 'single',
    },
};