require('dotenv').config();

const app = require('./config/app');

const port = process.env.APP_PORT || 3000;

app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});

app.on('error', (appErr, appCtx) => {
  console.error('app error', {
    stack: appErr.stack,
    url: appCtx.req.url,
    headers: appCtx.req.headers,
    body: appCtx.req.body,
  });
});
