const cp = require('child_process');
const logger = require('logger');

const handler = async (ctx) => {
  const { url, second } = ctx.query;

  let data = '';
  const proc = cp.exec(`ffmpeg -i "${url}"  -y -ss 00:00:01.000 -vframes 1 -c:v mjpeg -q:v 2 -f image2 pipe:1`, (err, stdout) => {
    if (err) {
      logger.error('ffmpeg errror:', err);
      ctx.throw(500);
      return;
    }
    data += stdout;
  });
  proc.stdout.setEncoding('base64');
  proc.on('close', async () => {
    const base64Image = data;

    console.log(data)

  });

  ctx.body = {};
};

module.exports.register = (router) => {
  router.get('/', handler);
};
