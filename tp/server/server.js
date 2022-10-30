require('dotenv').config();

const app = require('./config/app');

const port = process.env.APP_PORT || 3000;

app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
