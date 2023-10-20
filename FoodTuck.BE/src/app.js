const express = require('express');
const path = require('path');
const helmet = require('helmet');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const compression = require('compression');
const cors = require('cors');
const passport = require('passport');
const httpStatus = require('http-status');
const config = require('./config/config');
const morgan = require('./config/morgan');
const { jwtStrategy } = require('./config/passport');
const { authLimiter } = require('./middlewares/rateLimiter');
const routes = require('./routes');
const { errorConverter, errorHandler } = require('./middlewares/error');
const ApiError = require('./utils/ApiError');
const sharp = require('sharp');
const fs = require('fs');

const app = express();

if (config.env !== 'test') {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}

// set security HTTP headers
// app.use(helmet());

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// sanitize request data
// app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

//serve static files
app.use('/media', async (req, res, next) => {
  if (!Object.entries(req.query).length) return next();

  const filePath = decodeURIComponent(req.url.split('?')[0]);
  const absoluteFilePath = path.join(__dirname, '../media', decodeURIComponent(filePath));
  const file = fs.readFileSync(absoluteFilePath);
  const fileMetaData = await sharp(file).metadata();
  const destfileName = filePath.replace(/\..+/, `${req.url.split('?')[1]}.${fileMetaData.format}`);
  // if (fs.existsSync(absoluteFilePath)) return res.redirect(destfileName.replace(/^\//, ''));
  if (!fs.existsSync(absoluteFilePath)) return next();
  const cropWidth = +req.query.cw || fileMetaData.width;
  const cropHeight = +req.query.ch || fileMetaData.height;
  sharp(file)
    .extract({ left: +req.query.l || 0, top: +req.query.t || 0, width: cropWidth, height: cropHeight })
    .resize(+req.query.rw || cropWidth, +req.query.rh || cropHeight)
    .toFile(path.join(__dirname, '../media', destfileName), () => {
      res.redirect(destfileName.replace(/^\//, ''))
    })
})
app.use('/media', express.static(path.join(__dirname, '../media')))
app.use('/src/api-ui', express.static(path.join(__dirname, './api-ui')))

// enable cors
app.use(cors());
app.options('*', cors());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// limit repeated failed requests to auth endpoints
if (config.env === 'production') {
  app.use('/api/auth', authLimiter);
}

// api api routes
app.use('/api', routes);

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

module.exports = app;
