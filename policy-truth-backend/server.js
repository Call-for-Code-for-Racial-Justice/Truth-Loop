require('dotenv').config({ silent: true });
const logger = require("./logger");
const app = require('./app');

const swaggerInline = require('swagger-inline');

swaggerInline(['./*.js', './routes/*.js'], {
  base: 'swaggerBase.json',
}).then((generatedSwagger) => {
  swaggerDocument = JSON.parse(generatedSwagger);
  var swaggerUi = require('swagger-ui-express');
  var options = {
    jsonEditor: true
  }
  app.use('/api-docs', function(req, res, next){
    swaggerDocument.host = req.get('host');
    req.swaggerDoc = swaggerDocument;
    next();
  }, swaggerUi.serve, swaggerUi.setup(null, options));

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    logger.logger.info('server has started on port %d', PORT);
  });
});
