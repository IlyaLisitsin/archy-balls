const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, arg) => {
    const { mode } = arg;

    const isProd = mode === 'production';

    return{
        entry: {
            'main': __dirname + '/src/js/main',
        },
        output: {
            path: __dirname +  '/public',
            publicPath: isProd ? './' : '/',
            chunkFilename: '[name].js',
            filename: '[name].js'
        },
        optimization: {
            minimize: isProd
        },
        watch: true,
        module: {
            rules: [
                {
                    test: /\.js$/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['es2015', 'es2017']
                        }
                    }
                },
            ]
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin,
            new HtmlWebpackPlugin({
                inject: true,
                template: __dirname + '/src/index.html',
                filename: 'index.html'
            }),
        ],
        devServer: {
            contentBase: './public',
            port: 3000,
        },
        resolve: {
            extensions: ['.js']
        }
    }
}