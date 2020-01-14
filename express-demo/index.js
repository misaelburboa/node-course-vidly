const debug = require('debug')('app:startup');
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const Joi = require('joi');
const logger = require('./middleware/logger');

const courses = require('./routes/courses');
const home = require('./routes/home');
const auth = require('./authenticate');
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views'); //default

console.log(`NODE_ENV: ${process.env.NODE_ENV}`); // if not set return undefined by default
console.log(`app: ${app.get('env')}`); //returns development by default

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// Third party middlewares:
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);

debug('Application Name ' + config.get('name'));
debug('Mail Host ' + config.get('mail.host'));
debug('Mail password ' + config.get('mail.password'));

if (app.get('env') === 'development') {
    app.use(morgan('tiny')); //you can use this for logs but is recommended not to use because it impacts in performance, actually all middlewares does
    console.log('morgan enabled');
}

// custom middlewares:
app.use(logger);
app.use(auth);

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port} ...`));