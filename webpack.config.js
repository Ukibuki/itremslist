const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [
            'style-loader',
            {
                loader: 'css-loader',
                options: {
                    modules: true,
                    importLoaders: 1,
                    camelCase: true,
                    localIdentName:'[path][name]--[local]--[hash:base64:5]'
                }
            },
            {
                loader: 'postcss-loader',
                options: {
                    plugins: [
                        require('postcss-import'),
                        require('postcss-simple-vars'),
                        require('postcss-nested'),
                        require('postcss-color-function'),
                        require('autoprefixer')({
                            browsers: ['last 2 versions', 'not dead'],
                            grid: true
                        })
                    ]
                }
            }
        ]
    },
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './dist',
    hot: true,
    port: 3000,
    proxy: {
      "/api": "http://localhost:3030/"
    }
  },
};