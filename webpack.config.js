const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = {
    src: path.resolve(__dirname, './src'), // source files
    build: path.resolve(__dirname, './build'), // production build files
    static: path.resolve(__dirname, './public'), // static files to copy to build folder
};

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: [paths.src + '/ToDoJS.js'],
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
                        ignore: ['**/ToDo.html']
                    }
                }
            ],
        }),
        new HtmlWebpackPlugin({
            template: paths.static + '/ToDo.html', // template file
            filename: 'ToDo.html', // output file
        }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ]
    }
};