const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const bodyParser = require('body-parser');
const app = express();

// Body parser
app.use(bodyParser.urlencoded({ extended: true, limit: '5mb' }));
app.use(bodyParser.json({ extended: true, limit: '5mb' }));

// Define Routes
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }));
app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  max: 500, // limit each IP to 500 requests per windowMs
  message:
    'Too many request created from this IP, please try again after an 5 min',
});

//  apply to all requests
app.use(limiter);
app.use('/api/ipfs-file', require('./routes/api/ipfs-file'));

app.use('*', (req, res) => {
  res.status(404).json({ msg: 'The route you requested has not been found' });
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send({ msg: 'Something is broke!' });
});
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
3;
