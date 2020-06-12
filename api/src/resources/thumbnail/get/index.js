const cp = require('child_process');
const logger = require('logger');

const handler = async (ctx) => {
  const { url, second } = ctx.query;
  const data64 = await new Promise((res, rej) => {
    let data = '';
    const proc = cp.exec(`ffmpeg -i "${url}"  -y -ss "${second}" -vframes 1 -c:v mjpeg -q:v 2 -f image2 pipe:1`, (err, stdout) => {
      if (err) {
        logger.error('ffmpeg errror:', err);
        ctx.throw(500);
        return;
      }
      data += stdout;
    });
    proc.stdout.setEncoding('base64');
    proc.on('close', async () => {
      res(data);
    });
  })

  ctx.body = { data64 }
};

module.exports.register = (router) => {
  router.get('/', handler);
};