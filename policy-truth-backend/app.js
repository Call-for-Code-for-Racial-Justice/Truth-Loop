const bodyParser = require('body-parser');
const cors = require("cors");
const logger = require("./logger");

require('dotenv').config();

console.log(process.env.CMS_USERNAME);
// console.log(process.env.CMS_PASSWORD);
console.log(process.env.CLIENT_ID);
// console.log(process.env.CLIENT_SECRET);
console.log(process.env.DB_HOST);
console.log(process.env.DB_USERNAME);
// console.log(process.env.DB_PASSWORD);
console.log(process.env.DB_PORT);
console.log(process.env.DB_DATABASE_NAME);

const categories = require('./routes/categories');
const geospatialDefinitions = require('./routes/geospatial_definitions');
const officials = require('./routes/officials');
const advocacyGroups = require('./routes/advocacy_groups');
const publications = require('./routes/publications');
const videoTestimonials = require('./routes/video_testimonials');
const legislativeArtifacts = require('./routes/legislative_artifacts');
const adminIntersections = require('./routes/admin_intersections')
const videos = require('./routes/video');
const channels = require('./routes/channel');
const express = require("express");

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

// Static build of Admin UI
app.use(express.static('admin/dist'));

//ROUTES//

// Database Entities
app.use('/api/v1/categories', categories);
app.use('/api/v1/geospatialDefinitions', geospatialDefinitions);
app.use('/api/v1/officials', officials);
app.use('/api/v1/channels', channels);
app.use('/api/v1/videos', videos);
app.use('/api/v1/advocacyGroups', advocacyGroups);
app.use('/api/v1/publications', publications);
app.use('/api/v1/videoTestimonials', videoTestimonials);
app.use('/api/v1/legislativeArtifacts', legislativeArtifacts);
app.use('/api/v1/adminIntersections', adminIntersections);

module.exports = app;
