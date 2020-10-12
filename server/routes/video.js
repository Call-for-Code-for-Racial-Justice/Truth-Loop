const logger = require('../logger').logger
const fs = require('fs');
const categoryDB = require('../db/categories')
var express = require('express');
const Ustream = require("ustream-sdk");
const { request, response } = require('express');
const multer = require("multer");
var router = express.Router();

// Set up instance using password authentication
let ustream = new Ustream({
  username: process.env.CMS_USERNAME,
  password: process.env.CMS_PASSWORD,
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  type: "password"
})


router.get('/channel/:id', (request, response) => {
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
});

router.get('/:id', (request, response) => {
  const id = parseInt(request.params.id);
  ustream.video.get(id).then((results) => {
    response.status(200).json(results);
  }).catch((err) => {
    response.status(500).json({
      error: "Internal Server Error"
    })
  })
})

const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('file'), (request, response) => {
  console.log(request.file);
  console.log(request.body.channelId);
  var tmp_path = request.file.path;
  var target_path = 'uploads/' + request.file.filename + '.' + request.file.originalname.split('.').slice(-1).pop();
  fs.rename(tmp_path, target_path, () => {
    console.log('success')
    // 23946193
    const file = {originalname: request.file.originalname, stream: fs.createReadStream(target_path)};
    const opts = {title: request.file.originalname, description: "desc", protect: "public"};
    ustream.video.upload(request.body.channelId, file, opts).then((results) => {
      fs.unlinkSync(target_path, (err) => {
        if(err){
          response.status(500).json({
            error: "Successfully uploaded, failed to delete"
          })
        }
        console.log('deleted');
      })
      response.status(200).json(results);
    }).catch((err) => {
      response.status(500).json({
        error: "Internal Server Error"
      })
    })
  });
})

router.get('/:channelId/:videoId', (request, response) => {
  const channelID = parseInt(request.params.channelId);
  const videoID = parseInt(request.params.videoId);
  ustream.video.getStatus(channelID, videoID).then((results) => {
    response.status(200).json(results);
  }).catch((err) => {
    response.status(500).json({
      error: "Internal Server Error"
    })
  })
})

router.delete('/:id', (request, response) => {
  const id = parseInt(request.params.id);
  ustream.video.remove(id).then((results) => {
    response.status(200).json(results);
  }).catch((err) => {
    response.status(500).json({
      error: "Internal Server Error"
    })
  })
})

module.exports = router



