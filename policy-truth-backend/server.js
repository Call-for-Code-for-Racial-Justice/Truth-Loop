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

const category = require('./routes/category');
const geospatialDefinition = require('./routes/geospatial_definition');
const official = require('./routes/official');
const advocacyGroup = require('./routes/advocacy_group');
const publication = require('./routes/publication');
const videoTestimonial = require('./routes/video_testimonial');
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

//ROUTES//
// Ustream testing //
app.get('/channels',getChannels);
app.get('/channels/:id',getChannelVideos);
app.get('/video/:id',getVideo);
// Category //
app.get('/category', category.getCategories);
app.get('/category/:id', category.getCategoryById);
app.get('/category/name/:name', category.getCategoryByName);
app.post('/category', category.createCategory);
app.put('/category/:id', category.updateCategory);
app.delete('/category/:id', category.deleteCategory);
// Geospatial Definition //
app.get('/geospatialDefinition', geospatialDefinition.getGeospatialDefinitions);
app.get('/geospatialDefinition/:id', geospatialDefinition.getGeospatialDefinitionById);
app.get('/geospatialDefinition/name/:name', geospatialDefinition.getGeospatialDefinitionByName);
app.post('/geospatialDefinition', geospatialDefinition.createGeospatialDefinition);
app.put('/geospatialDefinition/:id', geospatialDefinition.updateGeospatialDefinition);
app.delete('/geospatialDefinition/:id', geospatialDefinition.deleteGeospatialDefinition);
// Official //
app.get('/official',official.getOfficials);
app.get('/official/:id',official.getOfficialById);
app.post('/official',official.createOfficial);
app.put('/official/:id',official.updateOfficial);
app.delete('/official/:id',official.deleteOfficial);
// Advocacy Group //
app.get('/advocacyGroup',advocacyGroup.getAdvocacyGroups);
app.get('/advocacyGroup/:id',advocacyGroup.getAdvocacyGroupById);
app.post('/advocacyGroup',advocacyGroup.createAdvocacyGroup);
app.put('/advocacyGroup/:id',advocacyGroup.updateAdvocacyGroup);
app.delete('/advocacyGroup/:id',advocacyGroup.deleteAdvocacyGroup);
// Publication //
app.get('/publication',publication.getPublications);
app.get('/publication/:id',publication.getPublicationById);
app.post('/publication',publication.createPublication);
app.put('/publication/:id',publication.updatePublication);
app.delete('/publication/:id',publication.deletePublication);
// Video Testimonials //
app.get('/videoTestimonial', videoTestimonial.getVideoTestimonials);
app.get('/videoTestimonial/:id', videoTestimonial.getVideoTestimonialById);
app.post('/videoTestimonial', videoTestimonial.createVideoTestimonial);
app.put('/videoTestimonial/:id', videoTestimonial.updateVideoTestimonial);
app.delete('/videoTestimonial/:id', videoTestimonial.deleteVideoTestimonial);
// Legislative Artifacts (atomic) //
app.get('/legislativeArtifact', legislativeArtifact.getLegislativeArtifacts);
app.get('/legislativeArtifact/:id', legislativeArtifact.getLegislativeArtifactById);
app.post('/legislativeArtifact', legislativeArtifact.createLegislativeArtifact);
app.put('/legislativeArtifact/:id', legislativeArtifact.updateLegislativeArtifact);
app.delete('/legislativeArtifact/:id', legislativeArtifact.deleteLegislativeArtifact);
// Unfiltered ArtifactList //
app.get('/getLegislativeArtifactsForListUnfiltered', unfilteredArtifactList.getLegislativeArtifactsForListUnfiltered);
// Single Full Artifact //
app.get('/getSingleFullLegislativeArtifact/:id', singleFullArtifact.getSingleFullLegislativeArtifact);

// Intersections
// category
app.delete('/categoryIntersection/:artifactId/:categoryId', adminIntersections.removeSingleCategoryIntersection);
app.delete('/categoryIntersections/:artifactId', adminIntersections.removeAllCategoryIntersections);
app.post('/categoryIntersection/:artifactId/:categoryId', adminIntersections.addCategoryIntersection);
// geo defs
app.delete('/geoDefIntersection/:artifactId/:geoDefId', adminIntersections.removeSingleGeoDefIntersection);
app.delete('/geoDefIntersections/:artifactId', adminIntersections.removeAllGeoDefIntersections);
app.post('/geoDefIntersection/:artifactId/:geoDefId', adminIntersections.addGeoDefIntersection);
// officials
app.delete('/officialIntersection/:artifactId/:officialId', adminIntersections.removeSingleOfficialIntersection);
app.delete('/officialIntersections/:artifactId', adminIntersections.removeAllOfficialIntersections);
app.post('/officialIntersection/:artifactId/:officialId', adminIntersections.addOfficialIntersection);
// publications
app.delete('/publicationIntersection/:artifactId/:publicationId', adminIntersections.removeSinglePublicationIntersection);
app.delete('/publicationIntersections/:artifactId', adminIntersections.removeAllPublicationIntersections);
app.post('/publicationIntersection/:artifactId/:publicationId', adminIntersections.addPublicationIntersection);
// advocacy groups
app.delete('/advocacyGroupIntersection/:artifactId/:advocacyGroupId', adminIntersections.removeSingleAdvocacyGroupIntersection);
app.delete('/advocacyGroupIntersections/:artifactId', adminIntersections.removeAllAdvocacyGroupIntersections);
app.post('/advocacyGroupIntersection/:artifactId/:advocacyGroupId', adminIntersections.addAdvocacyGroupIntersection);
// video testimonials
app.delete('/videoTestimonialIntersection/:artifactId/:videoTestimonialId', adminIntersections.removeSingleVideoTestimonialIntersection);
app.delete('/videoTestimonialIntersections/:artifactId', adminIntersections.removeAllVideoTestimonialIntersections);
app.post('/videoTestimonialIntersection/:artifactId/:videoTestimonialId', adminIntersections.addVideoTestimonialIntersection);
// related artifacts
app.delete('/relatedArtifactIntersection/:artifactId/:relatedArtifactId', adminIntersections.removeSingleRelatedArtifactIntersection);
app.delete('/relatedArtifactIntersections/:artifactId', adminIntersections.removeAllRelatedArtifactIntersections);
app.post('/relatedArtifactIntersection/:artifactId/:relatedArtifactId', adminIntersections.addRelatedArtifactIntersection);

const PORT = process.env.PORT || 5000;
app.listen(5000, () => {
  logger.logger.info('server has started on port %d', PORT);
});
