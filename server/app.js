const bodyParser = require('body-parser');
const cors = require("cors");
const logger = require("./logger");
const cookieParser = require('cookie-parser')

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
const levels = require('./routes/levels');
const legislativeArtifacts = require('./routes/legislative_artifacts');
const adminIntersections = require('./routes/admin_intersections')
const videos = require('./routes/video');
const channels = require('./routes/channel');
const authentication = require('./routes/authentication')
const authentic = require('./middlewares/authentic').authentic;
const authorize = require('./middlewares/authorize').authorize;
const path = require('path');
const express = require("express");

//middleware
const app = express();
app.use(cookieParser());
app.use(logger.expressLogger);
app.use(cors());
app.use(express.json()); //req.body

// Serve a static version of the Vue.js client at /
app.use(express.static('../client/dist', {fallthrough: true}));

// Serve a static version of the React.js client at /react
// app.use(express.static('../react/client/build', {fallthrough: true}));
app.use(express.static(path.join(__dirname, '../react/client/build')));
app.get('/react', function (req, res) {
    res.sendFile(path.join(__dirname, '../react/client/build', 'index.html'));

});

// Server a static version of the admin UI under /admin
app.use('/admin', express.static('./admin/dist', {fallthrough: true}));

//ROUTES//

app.use('/auth', authentication);

// Database Entities
app.use('/api/v1/categories', authentic, authorize, categories);
app.use('/api/v1/geospatialDefinitions', authentic, authorize, geospatialDefinitions);
app.use('/api/v1/officials', authentic, authorize, officials);
app.use('/api/v1/channels', authentic, authorize, channels);
app.use('/api/v1/videos', authentic, authorize, videos);
app.use('/api/v1/advocacyGroups', authentic, authorize, advocacyGroups);
app.use('/api/v1/publications', authentic, authorize, publications);
app.use('/api/v1/videoTestimonials', authentic, authorize, videoTestimonials);
app.use('/api/v1/levels', authentic, authorize, levels);
app.use('/api/v1/legislativeArtifacts', authentic, authorize, legislativeArtifacts);
app.use('/api/v1/adminIntersections', authentic, authorize, adminIntersections);

module.exports = app;
