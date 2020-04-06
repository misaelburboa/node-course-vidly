const winston = require('winston');
const express = require('express'); 

const app = express();
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')()
require('./startup/validation')();

// throw new Error('Something failed during startup!');
// const p = Promise.reject(new Error('Something went wrong!'));
// p.then(() => console.log('Done'));

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`listening on port ${port} ...`));