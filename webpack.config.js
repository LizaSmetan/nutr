const path = require('path');
const fs = require('fs');
const glob = require('glob');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const isDevelopment = !process.env.production;
const isProduction = process.env.production;
const distPath = path.join(__dirname, '/assets');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const extractSass = new ExtractTextPlugin({
    filename: 'styles-main-min.css',
    disable: isDevelopment,
    publicPath: './assets/'
});

const config = {
    entry: {app: './dev/js/main-index.js'},
    output: {filename: 'main.js', path: distPath},
    watch: true,
    module: {
        rules: [
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.js$/,
                exclude: [/node_modules/],
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            plugins: ['transform-decorators-legacy'],
                            presets: ['env', 'stage-0'],
                        },
                    },
                    // 'resolve-url-loader',
                ],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.scss$/,
                exclude: [/node_modules/],
                use: extractSass.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                sourceMap: true,
                                importLoaders: 2,
                                localIdentName: '[local]',
                                minimize: isProduction,
                            },
                        },
                        'sass-loader'
                    ],
                }),
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                exclude: [/fonts/],
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: './images/[name].[ext]',
                            mozjpeg: {
                                progressive: true,
                                quality: 70,
                            },
                        },
                    }
                ],
            },
            {
                test: /\.(eot|svg|ttf|woff|otf|woff2)$/,
                exclude: [/images/],
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            importLoaders: 2,
                            name: './fonts/[name].[ext]',
                        },
                    },
                ],
            }
        ]
    },
    plugins: [
        extractSass,
        // new HtmlWebpackPlugin({
        //     filename: './index.html',
        //     template: './index.html',
        // }),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './index.html',
        })

    ],
    devServer: {
        contentBase: distPath,
        compress: true,
        open: true,
        port: 9000
    }

};

module.exports = config;
