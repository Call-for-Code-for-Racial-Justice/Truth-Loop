const bodyParser = require('body-parser');
const cors = require("cors");
const logger = require("./logger");
const fs = require('fs');
const jwt = require('jsonwebtoken');
const path = require('path');

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
app.use(logger.expressLogger);
app.use(cors());
app.use(express.json()); //req.body
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// passport.use(new LocalStrategy(
//   function(username, password, cb){
//     users.getUserByUsername(username,
//       function(err, user){
//         if(err){
//           return cb(err);
//         }
//         if(!user){
//           return cb(null, false);
//         }
//         if(user.rows[0].password != password){
//           return cb(null, false);
//         }
//         return cb(null, user.rows[0]);
//       }
//     );
//   }
// ));

// passport.serializeUser(function(user, cb) {
//   cb(null, user.id);
// });

// passport.deserializeUser(function(id, cb) {
//   users.getUserById(id, function (err, user) {
//     if (err) { return cb(err); }
//     cb(null, user);
//   });
// });

// app.use(expressSession({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

// app.use(passport.initialize());
// app.use(passport.session());

// Serve a static version of the client at /
app.use(express.static('../client/dist', {fallthrough: true}));

// Server a static version of the admin UI under /admin
app.use('/admin', express.static('./admin/dist', {fallthrough: true}));

const authentic = function(req, res, next){
  console.log(req.headers);
  jwt.verify(req.headers.bearertoken, ACCESS_TOKEN_SECRET, function(error, decode){
    if(error){
      console.log(error)
      res.status(401).send("Invalid access token.");
    } else {
      next();
    }
  })
}

//ROUTES//

// app.get('/test', authentic, (req, res) => {
//   res.status(200).send(req.user.rows[0]);
// });

// app.post('/login', passport.authenticate('local'), (req, res) => {
//   res.status(200).send("Successfully logged in!");
// });

// app.get('/logout', (req, res) => {
//   req.logOut();
//   res.status(200).send("Successfully logged out!");
// });

app.use('/', authentication);

// Database Entities
app.use('/api/v1/categories', authentic, categories);
app.use('/api/v1/geospatialDefinitions', geospatialDefinitions);
app.use('/api/v1/officials', officials);
app.use('/api/v1/channels', channels);
app.use('/api/v1/videos', videos);
app.use('/api/v1/advocacyGroups', advocacyGroups);
app.use('/api/v1/publications', publications);
app.use('/api/v1/videoTestimonials', videoTestimonials);
app.use('/api/v1/levels', levels);
app.use('/api/v1/legislativeArtifacts', legislativeArtifacts);
app.use('/api/v1/adminIntersections', adminIntersections);

module.exports = app;
