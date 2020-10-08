const logger = require('../logger').logger
const categoryDB = require('../db/categories')
var express = require('express');
const Ustream = require("ustream-sdk");
const { request, response } = require('express');
var router = express.Router();

// Set up instance using password authentication
let ustream = new Ustream({
  username: 'e97sd7dkmx3',
  password: 'ugxbx krddk pugse',
  client_id: '3d0df02cc292e7a243e9ede2639ee3278e8a2bad',
  client_secret: '03357caf740cbb07f3e6251673d7717f203eef3f',
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



