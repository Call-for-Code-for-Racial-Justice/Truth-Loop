const cors = require('cors')
const logger = require('./logger')
const cookieParser = require('cookie-parser')
const swaggerInline = require('swagger-inline')
const swaggerUi = require('swagger-ui-express')

require('dotenv').config()

console.log('Auth enabled? ', !!process.env.ENABLE_AUTH)
console.log(process.env.CMS_USERNAME)
// console.log(process.env.CMS_PASSWORD);
console.log(process.env.CLIENT_ID)
// console.log(process.env.CLIENT_SECRET);
console.log(process.env.DB_HOST)
console.log(process.env.DB_USERNAME)
// console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_PORT)
console.log(process.env.DB_DATABASE_NAME)

const categories = require('./routes/categories')
const geospatialDefinitions = require('./routes/geospatial_definitions')
const officials = require('./routes/officials')
const advocacyGroups = require('./routes/advocacy_groups')
const publications = require('./routes/publications')
const videoTestimonials = require('./routes/video_testimonials')
const levels = require('./routes/levels')
const legislativeArtifacts = require('./routes/legislative_artifacts')
const adminIntersections = require('./routes/admin_intersections')
const videos = require('./routes/video')
const channels = require('./routes/channel')
const authentication = require('./routes/authentication')
const authentic = require('./middlewares/authentic').authentic
const authorize = require('./middlewares/authorize').authorize
const path = require('path')
const express = require('express')

//middleware
const app = express()
app.use(cookieParser())
app.use(logger.expressLogger)
app.use(cors())
app.use(express.json()) //req.body

swaggerInline(['./*.js', './routes/*.js'], {
  base: 'swaggerBase.json',
}).then((generatedSwagger) => {
  const swaggerDocument = JSON.parse(generatedSwagger)

  const options = {
    jsonEditor: true,
  }
  app.use(
    '/api-docs',
    function (req, res, next) {
      swaggerDocument.host = req.get('host')
      req.swaggerDoc = swaggerDocument
      next()
    },
    swaggerUi.serve,
    swaggerUi.setup(null, options)
  )
  app.use('/auth', authentication)

  // Using the auth checks is undocumented, so disabled by default
  if (process.env.ENABLE_AUTH) {
    console.log('Authentication is ENABLED')
    app.use('/api/v1/categories', authentic, authorize, categories)
    app.use(
      '/api/v1/geospatialDefinitions',
      authentic,
      authorize,
      geospatialDefinitions
    )
    app.use('/api/v1/officials', authentic, authorize, officials)
    app.use('/api/v1/channels', authentic, authorize, channels)
    app.use('/api/v1/videos', authentic, authorize, videos)
    app.use('/api/v1/advocacyGroups', authentic, authorize, advocacyGroups)
    app.use('/api/v1/publications', authentic, authorize, publications)
    app.use(
      '/api/v1/videoTestimonials',
      authentic,
      authorize,
      videoTestimonials
    )
    app.use('/api/v1/levels', authentic, authorize, levels)
    app.use(
      '/api/v1/legislativeArtifacts',
      authentic,
      authorize,
      legislativeArtifacts
    )
    app.use(
      '/api/v1/adminIntersections',
      authentic,
      authorize,
      adminIntersections
    )
  } else {
    console.log('Authentication is DISABLED')
    app.use('/api/v1/categories', categories)
    app.use('/api/v1/geospatialDefinitions', geospatialDefinitions)
    app.use('/api/v1/officials', officials)
    app.use('/api/v1/channels', channels)
    app.use('/api/v1/videos', videos)
    app.use('/api/v1/advocacyGroups', advocacyGroups)
    app.use('/api/v1/publications', publications)
    app.use('/api/v1/videoTestimonials', videoTestimonials)
    app.use('/api/v1/levels', levels)
    app.use('/api/v1/legislativeArtifacts', legislativeArtifacts)
    app.use('/api/v1/adminIntersections', adminIntersections)
  }

  app.use(
    express.static(path.join(__dirname, './admin/build'), {
      fallthrough: true,
    })
  )

  app.get('*', function (req, res) {
    res.sendFile('index.html', {
      root: path.join(__dirname, './admin/build/'),
    })
  })
})

module.exports = app
