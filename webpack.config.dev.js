import webpack from 'webpack';
import path from 'path';

export default {
  entry: [
    'webpack-hot-middleware/client',
    path.join(__dirname, 'app/src/index')
  ],
  output: {
    path: path.join(__dirname, 'app/dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {test: /\.js$/, include: path.join(__dirname, "app/src"), use:['babel-loader']},
      {test: /\.css$/, loaders: ['style', 'css']}
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ]
};
