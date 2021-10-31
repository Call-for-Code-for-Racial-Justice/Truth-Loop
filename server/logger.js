const pino = require('pino')
const expressPino = require('express-pino-logger')

const logger = pino({ level: process.env.LOG_LEVEL || 'info' })
const expressLogger = expressPino({ logger })

module.exports = {
  logger,
  expressLogger,
}
