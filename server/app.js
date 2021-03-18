const bodyParser = require('body-parser');
const cors = require("cors");
const logger = require("./logger");
const fs = require('fs');
const jwt = require('jsonwebtoken');
const path = require('path');
const cookieParser = require('cookie-parser')

// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;

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

const ACCESS_TOKEN_SECRET = fs.readFileSync(path.join(__dirname,'secrets','ACCESS_TOKEN_SECRET.txt'), 'utf8')
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
// const users = require('./db/users');
const authentication = require('./routes/authentication')
const express = require("express");
// const expressSession = require('express-session');

//middleware
const app = express();
app.use(cookieParser());
app.use(logger.expressLogger);
app.use(cors());
app.use(express.json()); //req.body
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// Serve a static version of the client at /
app.use(express.static('../client/dist', {fallthrough: true}));

// Server a static version of the admin UI under /admin
app.use('/admin', express.static('./admin/dist', {fallthrough: true}));

const authentic = function(req, res, next){
  if(req.cookies.accessToken==undefined){
    res.redirect('/auth/generateAccessToken')
  } else {
    jwt.verify(req.cookies.accessToken, ACCESS_TOKEN_SECRET, function(error, decode){
      if(error){
        console.log(error)
        res.status(401).send("Invalid access token.");
      } else {
        next();
      }
    })
  }
}

//ROUTES//

app.use('/auth', authentication);

// Database Entities
app.use('/api/v1/categories', authentic, categories);
app.use('/api/v1/geospatialDefinitions', authentic, geospatialDefinitions);
app.use('/api/v1/officials', authentic, officials);
app.use('/api/v1/channels', authentic, channels);
app.use('/api/v1/videos', authentic, videos);
app.use('/api/v1/advocacyGroups', authentic, advocacyGroups);
app.use('/api/v1/publications', authentic, publications);
app.use('/api/v1/videoTestimonials', authentic, videoTestimonials);
app.use('/api/v1/levels', levels);
app.use('/api/v1/legislativeArtifacts', authentic, legislativeArtifacts);
app.use('/api/v1/adminIntersections', authentic, adminIntersections);

module.exports = app;
