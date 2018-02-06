import webpack from 'webpack';
import path from 'path';

export default {
  entry: [
    path.join(__dirname, 'app/src/app')
  ],
  output: {
    path: path.join(__dirname, 'app/dist')
  },
  module: {
    rules: [
      {test: /\.js$/, include: path.join(__dirname, "app/src"), use:['babel']},
      {test: /\.css$/, loaders: ['style', 'css']}
    ]
  },
};
