const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const bodyParser = require('body-parser');
const  errorHandling =require('./lib/error-handling');
const log4js = require('log4js');
const logging = require('./lib/logger-config');


const app = express();

// Body parser
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use(bodyParser.json({ extended: true, limit: '5mb' }));

// Middleware 
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }));
app.set('trust proxy', 1);


/**Logger config*/
log4js.configure(logging.logerconfig);
const logger = log4js.getLogger('Server.js ');


const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 500, // limit each IP to 500 requests per windowMs
  message:
    'Too many request created from this IP, please try again after an 5 min',
});

//  apply to all requests
app.use(limiter);

// Importing routes
app.use('/', require('./routes/api/user'));



app.use('*', errorHandling.routeNotFound);
app.use(errorHandling.serverError);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));

