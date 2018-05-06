const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

const NODE_ENV = process.env.NODE_ENV || 'production';
const isDevelopment = NODE_ENV === 'development';
const distPath = path.join(__dirname, '/dist');

const extractSass = new ExtractTextPlugin({
    filename: '[name].css', allChunks: true
});

const config = {
    watch: NODE_ENV === 'development',
    resolve: {
        extensions: ['.ts', '.tsx', '.json', '.js'],
        modules: ['node_modules', 'src'],
        alias: {
            'materialStyle': path.join(__dirname, '../node_modules/materialize-css/dist/css/materialize.min.css')
        }
    },
    devtool: NODE_ENV === 'development' ? 'cheap-inline-module-source-map' : 'none',
    mode: NODE_ENV === 'development' ? 'development' : 'production',
    entry: {
        main: './src/index.tsx'
    },
    output: {
        filename: 'bundle.js',
        path: distPath
    },
    module: {
        rules: [{
            test: /\.html$/,
            use: 'html-loader'
        }, {
            test: [/\.tsx$/, /\.ts$/],
            exclude: /node_modules/,
            loader: [
                'babel-loader',
                'ts-loader'
            ]
        }, {
            test: /\.(scss|css)$/,
            use: extractSass.extract({
                fallback: 'style-loader',
                use: [
                    'css-loader?modules&importLoaders=1&localIdentName=[local]!postcss-loader',
                    'sass-loader',
                    'resolve-url-loader'
                ]
            })
        }, {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [{
                loader: 'file-loader',
                options: {
                    name: 'images/[name][hash].[ext]'
                }
            }, {
                loader: 'image-webpack-loader',
                options: {
                    mozjpeg: {
                        progressive: true,
                        quality: 70
                    }
                }
            },
            ],
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)$/,
            use: {
                loader: 'file-loader',
                options: {
                    name: 'fonts/[name][hash].[ext]'
                }
            },
        }]
    },
    plugins: [
        autoprefixer,
        extractSass,
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
    ],
    optimization: isDevelopment ? {} : {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    ecma: 8,
                    warnings: false,
                    compress: {
                        sequences     : true,
                        booleans      : true,
                        loops         : true,
                        unused      : true,
                        warnings    : false,
                        drop_console: true,
                        unsafe      : true
                    },
                    output: {
                        comments: false,
                        beautify: false,
                    },
                    toplevel: false,
                    nameCache: null,
                    ie8: false,
                    keep_classnames: undefined,
                    keep_fnames: false,
                    safari10: false,
                }
            }),
        ],
    },
    devServer: {
        contentBase: distPath,
        port: 9000,
        compress: true
    }
};

module.exports = config;