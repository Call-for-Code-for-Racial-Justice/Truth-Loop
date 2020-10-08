const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const logger = require("./logger");
const Ustream = require("ustream-sdk")

require('dotenv').config();

// Set up instance using password authentication
let ustream = new Ustream({
  username: 'e97sd7dkmx3',
  password: 'ugxbx krddk pugse',
  client_id: '3d0df02cc292e7a243e9ede2639ee3278e8a2bad',
  client_secret: '03357caf740cbb07f3e6251673d7717f203eef3f',
  type: "password"
})

// ustream.video.get('sample-mp4-file').then((video) => {
//   // Use video
//   console.log('got a video');
// }).catch((err) => {
//   // Handle error
//   console.log('failed');
// })
const getChannels = (request, response) => {
  // Get list of channels
  ustream.channel.list().then((pageableResult) => {
    // Access the list of channels
    let channels = pageableResult.data

    response.status(200).json(channels);
    // Check if result set has a next page
    if (pageableResult.hasNextPage()) {
      // Retrieve the next page of channels
      pageableResult.next().then((nextPageResults) => {
          // Use next page's results
      })
    }
  }).catch((err) => {
    console.warn(err)
    response.status(500).json({
      error: "Internal Server Error"
  })
  }) 
}

const getChannelVideos = (request, response) => {
  const id = parseInt(request.params.id);
  console.log(id);
  ustream.video.list(id).then((pageableResult) => {
    let videos = pageableResult.data
    console.log('success');
    response.status(200).json(videos);
    if (pageableResult.hasNextPage()) {
      pageableResult.next().then((nextPageResults) => {
      })
    }
  }).catch((err) => {
    console.warn(err)
    response.status(500).json({
      error: "Internal Server Error"
  })
  }) 
}

const getVideo = (request, response) => {
  const id = parseInt(request.params.id);
  console.log(id);
  ustream.video.get(id).then((results) => {
    console.log('it was successful');
    response.status(200).json(results);
  }).catch((err) => {
    console.warn(err)
    response.status(500).json({
      error: "Internal Server Error"
  })
  }) 
}


console.log(process.env.CLIENT_ID);
console.log(process.env.CLIENT_SECRET);
console.log(process.env.DB_HOST);
console.log(process.env.DB_USERNAME);
console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_PORT);
console.log(process.env.DB_DATABASE_NAME);

const categories = require('./routes/categories');
const geospatialDefinitions = require('./routes/geospatial_definitions');
const officials = require('./routes/officials');
const advocacyGroups = require('./routes/advocacy_groups');
const publications = require('./routes/publications');
const videoTestimonials = require('./routes/video_testimonials');
const legislativeArtifact = require('./routes/legislative_artifact');
const unfilteredArtifactList = require('./routes/unfiltered_artifact_list');
const singleFullArtifact = require('./routes/single_full_artifact');
const adminIntersections = require('./routes/admin_intersections')
const { response, request } = require("express");

//middleware
const app = express();
app.use(logger.expressLogger);
app.use(cors());
app.use(express.json()); //req.body
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

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

  //ROUTES//
  // Ustream testing //
  app.get('/api/v1/channels',getChannels);
  app.get('/api/v1/channels/:id',getChannelVideos);
  app.get('/api/v1/video/:id',getVideo);

  // Database Entities
  app.use('/api/v1/categories', categories);
  app.use('/api/v1/geospatialDefinitions', geospatialDefinitions);
  app.use('/api/v1/officials', officials);
  app.use('/api/v1/advocacyGroups', advocacyGroups);
  app.use('/api/v1/publications', publications);
  app.use('/api/v1/videoTestimonials', videoTestimonials);

  // Legislative Artifacts (atomic) //
  app.get('/api/v1/legislativeArtifact', legislativeArtifact.getLegislativeArtifacts);
  app.get('/api/v1/legislativeArtifact/:id', legislativeArtifact.getLegislativeArtifactById);
  app.post('/api/v1/legislativeArtifact', legislativeArtifact.createLegislativeArtifact);
  app.put('/api/v1/legislativeArtifact/:id', legislativeArtifact.updateLegislativeArtifact);
  app.delete('/api/v1/legislativeArtifact/:id', legislativeArtifact.deleteLegislativeArtifact);
  // Unfiltered ArtifactList //
  app.get('/api/v1/getLegislativeArtifactsForListUnfiltered', unfilteredArtifactList.getLegislativeArtifactsForListUnfiltered);
  // Single Full Artifact //
  app.get('/api/v1/getSingleFullLegislativeArtifact/:id', singleFullArtifact.getSingleFullLegislativeArtifact);

  // Intersections
  // category
  app.delete('/api/v1/categoryIntersection/:artifactId/:categoryId', adminIntersections.removeSingleCategoryIntersection);
  app.delete('/api/v1/categoryIntersections/:artifactId', adminIntersections.removeAllCategoryIntersections);
  app.post('/api/v1/categoryIntersection/:artifactId/:categoryId', adminIntersections.addCategoryIntersection);
  // geo defs
  app.delete('/api/v1/geoDefIntersection/:artifactId/:geoDefId', adminIntersections.removeSingleGeoDefIntersection);
  app.delete('/api/v1/geoDefIntersections/:artifactId', adminIntersections.removeAllGeoDefIntersections);
  app.post('/api/v1/geoDefIntersection/:artifactId/:geoDefId', adminIntersections.addGeoDefIntersection);
  // officials
  app.delete('/api/v1/officialIntersection/:artifactId/:officialId', adminIntersections.removeSingleOfficialIntersection);
  app.delete('/api/v1/officialIntersections/:artifactId', adminIntersections.removeAllOfficialIntersections);
  app.post('/api/v1/officialIntersection/:artifactId/:officialId', adminIntersections.addOfficialIntersection);
  // publications
  app.delete('/api/v1/publicationIntersection/:artifactId/:publicationId', adminIntersections.removeSinglePublicationIntersection);
  app.delete('/api/v1/publicationIntersections/:artifactId', adminIntersections.removeAllPublicationIntersections);
  app.post('/api/v1/publicationIntersection/:artifactId/:publicationId', adminIntersections.addPublicationIntersection);
  // advocacy groups
  app.delete('/api/v1/advocacyGroupIntersection/:artifactId/:advocacyGroupId', adminIntersections.removeSingleAdvocacyGroupIntersection);
  app.delete('/api/v1/advocacyGroupIntersections/:artifactId', adminIntersections.removeAllAdvocacyGroupIntersections);
  app.post('/api/v1/advocacyGroupIntersection/:artifactId/:advocacyGroupId', adminIntersections.addAdvocacyGroupIntersection);
  // video testimonials
  app.delete('/api/v1/videoTestimonialIntersection/:artifactId/:videoTestimonialId', adminIntersections.removeSingleVideoTestimonialIntersection);
  app.delete('/api/v1/videoTestimonialIntersections/:artifactId', adminIntersections.removeAllVideoTestimonialIntersections);
  app.post('/api/v1/videoTestimonialIntersection/:artifactId/:videoTestimonialId', adminIntersections.addVideoTestimonialIntersection);
  // related artifacts
  app.delete('/api/v1/relatedArtifactIntersection/:artifactId/:relatedArtifactId', adminIntersections.removeSingleRelatedArtifactIntersection);
  app.delete('/api/v1/relatedArtifactIntersections/:artifactId', adminIntersections.removeAllRelatedArtifactIntersections);
  app.post('/api/v1/relatedArtifactIntersection/:artifactId/:relatedArtifactId', adminIntersections.addRelatedArtifactIntersection);

  const PORT = process.env.PORT || 5000;
  app.listen(5000, () => {
    logger.logger.info('server has started on port %d', PORT);
  });
});