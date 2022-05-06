const paths = require('./paths');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: [paths.src + '/index.js'],
    output: {
        path: paths.build,
        filename: '[name].bundle.js',
        publicPath: '/',
    },
    plugins: [
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: paths.static,
                    to: paths.build,
                    globOptions: {
                        ignore: ['**/index.html']
                    }
                }
            ]
        }),
        new HtmlWebpackPlugin({
            template: paths.static + '/index.html', // template file
            filename: 'index.html', // output file
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "ie 6" }]
                        ]
                    }
                },
            },
        ]
    }
};