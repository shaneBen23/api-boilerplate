const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const config = require('./config');
const swaggerDocument = require('./swagger.json');
const cors = require('cors');
const getLogger = require('./utils/logger');
const logger = getLogger('index');
const { notFoundRequest } = require('./helpers/responseHelper');
const usersRoutes = require('./routes/users');

const app = express();

app.options('*', cors());
app.use(cors());
// support parsing of application/json type post data
app.use(bodyParser.json());
// support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('/users', usersRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('*', function(req, res) {
  logger.error('Route not found');
  notFoundRequest(res, {});
});

app.post('*', function(req, res) {
  logger.error('Route not found');
  notFoundRequest(res, {});
});

const port = config.env.PORT;

app.set('port', port);
const server = app.listen(app.get('port'), () => {
  logger.info('Express running at PORT:', server.address().port);
  server.timeout = config.env.SERVER_TIMEOUT;
});
