var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import { Router } from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import loadConfig from './config';
import getIndexHtml from './index.html';
import getIframeHtml from './iframe.html';
import { getHeadHtml } from './utils';

const defaultDevMiddlewareConfig = {
  noInfo: false,
  compress: true,
  clientLogLevel: 'none',
  watchOptions: {
    ignored: /node_modules/
  },
  stats: 'minimal'
};
const defaultHotMiddlewareConfig = {
  log: false
};

export default function ({
  configDir,
  webpackDevMiddlewareConfig = {},
  webpackHotMiddlewareConfig = {}
}) {
  // Build the webpack configuration using the development mode 
  const config = loadConfig(configDir);
  const publicPath = config.output.publicPath;
  const configDevMiddleware = _extends({}, defaultDevMiddlewareConfig, webpackDevMiddlewareConfig, {
    publicPath
  });
  const configHotMiddleware = _extends({}, defaultHotMiddlewareConfig, webpackHotMiddlewareConfig);

  const compiler = webpack(config);
  const router = new Router();
  router.use(webpackDevMiddleware(compiler, configDevMiddleware));
  router.use(webpackHotMiddleware(compiler, configHotMiddleware));

  router.get('/', function (req, res) {
    res.send(getIndexHtml({ publicPath }));
  });

  router.get('/iframe.html', function (req, res) {
    const headHtml = getHeadHtml(configDir);
    res.send(getIframeHtml({ headHtml, publicPath }));
  });

  return router;
}