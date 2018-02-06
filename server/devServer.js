import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import config from "../webpack.config.dev.js";

const app = express();
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));

app.use(webpackHotMiddleware(compiler));

// Generic endpoint index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "../app/index.html"));
});

app.listen(3000);

