const mount = require('koa-mount');

const thumbnailResource = require('resources/thumbnail/public');

module.exports = (app) => {
  app.use(mount('/thumbnail', thumbnailResource));
};
