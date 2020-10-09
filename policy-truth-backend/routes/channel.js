const logger = require('../logger').logger
const { request, response } = require('express');
var express = require('express');
const Ustream = require("ustream-sdk")
var router = express.Router();

// Set up instance using password authentication
let ustream = new Ustream({
  username: 'e97sd7dkmx3',
  password: 'ugxbx krddk pugse',
  client_id: '3d0df02cc292e7a243e9ede2639ee3278e8a2bad',
  client_secret: '03357caf740cbb07f3e6251673d7717f203eef3f',
  type: "password"
})

router.get('/', (request, response) => {
  ustream.channel.list().then((pageableResult) => {
    let channels = pageableResult.data
    response.status(200).json(channels);
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
  console.log(id);
  ustream.channel.get(id).then((results) => {
    response.status(200).json(results);
  }).catch((err) => {
    console.log(err);
    response.status(500).json({
      error: "Internal Server Error"
    })
  })
})

router.post('/', (request, response) => {
  console.log(request.body);
  const title = request.body.title;
  const opt = request.body.opt;
  ustream.channel.create(title, opt).then((results) => {
    response.status(200).json(results);
  }).catch((err) => {
    response.status(500).json({
      error: "Internal Server Error"
    })
  })
})

router.put('/', (request, response) => {
  console.log(request.body);
  const id = parseInt(request.body.id);
  const title = request.body.title;
  const opts = request.body.opts;
  ustream.channel.edit(id, title, opts).then((results) => {
    response.status(200).json(results);
  }).catch((err) => {
    response.status(500).json({
      error: "Internal Server Error"
    })
  })
})

router.delete('/:id', (request,response) => {
  const id = parseInt(request.params.id);
  ustream.channel.remove(id).then((results) => {
    response.status(200).json(results);
  }).catch((err) => {
    response.status(500).json({
      error: "Internal Server Error"
    })
  })
})

module.exports = router