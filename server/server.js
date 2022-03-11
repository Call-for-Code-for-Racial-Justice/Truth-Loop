require('dotenv').config({ silent: true })
const logger = require('./logger')
const app = require('./app')

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  logger.logger.info('server has started on port %d', PORT)
})
