var path = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'bundle.js',
        publicPath: '/assets/',
        path: path.resolve(__dirname, '/dist')
    },
    module: {
        rules: [{
            test: /\.js$/,
            use: {
                loader: 'babel-loader',
                query: {
                    presets: ['babel-preset-es2015', 'babel-preset-react', 'babel-preset-stage-0']
                }
            },
            include: [path.resolve(__dirname, 'src')]
        }]
    }
}