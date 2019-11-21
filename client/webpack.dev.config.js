const path = require('path');
const webpack = require('webpack');

const dev_port = 41413;
const server_port = 9900;
module.exports = {
    devtool: 'source-map',
    devServer: {
        port: dev_port,
        open: true,
        hot: true
    },
    entry: [
        'babel-polyfill',
        'react-hot-loader/patch',
        './src/entry.jsx'
    ],
    output: {
        path: path.join(__dirname, './dist/public/'),
        filename: 'bundle.js',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.dev': server_port
        }),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)/, loader: 'babel-loader',
                include: path.join(__dirname, 'src'),
            },
            { test: /\.json$/, loader: 'file-loader', options: { name: 'pages/[name].[ext]' }},
            { test: /\.css$/, loader: 'style-loader!css-loader' },
            { test: /\.scss$/, loaders: ["style-loader", "css-loader", "sass-loader"] },
            { test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: { name: '[path][name]-[hash:8].[ext]' }},
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['react']
                        }
                    }
                ],
            }
        ]
    }
};
