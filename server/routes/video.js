const logger = require('../logger').logger
const fs = require('fs')
const categoryDB = require('../db/categories')
var express = require('express')
const Ustream = require('ustream-sdk')
const { request, response } = require('express')
const multer = require('multer')
var router = express.Router()

// Set up instance using password authentication
let ustream = new Ustream({
  username: process.env.CMS_USERNAME,
  password: process.env.CMS_PASSWORD,
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  type: 'password',
})

/**
 * @api [get] /api/v1/videos/channel/{id}
 * summary: Get the list of videos associated with a given channel
 * description: Given a specific channels ID returns all the associated videos
 * tags:
 *   - Videos
 * parameters:
 *   - in: path
 *     name: id
 *     schema:
 *       type: integer
 *     description: The channel ID
 * responses:
 *   200:
 *     description: The Video object was found and returned
 *     content:
 *       application/json:
 *         schema:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/Video"
 *   404:
 *     description: This channel has no videos associated with it or doesn't exist
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: This channel has no videos associated with it or doesn't exist
 *               description: This channel has no videos associated with it or doesn't exist
 *   500:
 *     description: Internal Server Error
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: Internal Server Error
 *               description: Returns the server error
 */
router.get('/channel/:id', (request, response) => {
  const id = parseInt(request.params.id)
  ustream.video
    .list(id)
    .then((pageableResult) => {
      if (pageableResult.data.length === 0) {
        response.status(404).json({
          message:
            "This channel has no videos associated with it or doesn't exist",
        })
      } else {
        let videos = pageableResult.data
        response.status(200).json(videos)
        if (pageableResult.hasNextPage()) {
          pageableResult.next().then((nextPageResults) => {})
        }
      }
    })
    .catch((err) => {
      console.warn(err)
      response.status(500).json({
        error: 'Internal Server Error',
      })
    })
})

/**
 * @api [get] /api/v1/videos/{id}
 * summary: Get a video object
 * description: Returns a video object with a given ID if exists
 * tags:
 *   - Videos
 * parameters:
 *   - in: path
 *     name: id
 *     schema:
 *       type: integer
 *     description: The video ID
 * responses:
 *   200:
 *     description: The Video object was found and returned
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/Video"
 *   404:
 *     description: No videos exists with given ID
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *               example: No videos exists with given ID
 *               description: No videos exists with given ID
 *   500:
 *     description: Internal Server Error
 *     content:
 *       application/json:
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *               example: Internal Server Error
 *               description: Returns the server error
 */
router.get('/:id', (request, response) => {
  const id = parseInt(request.params.id)
  ustream.video
    .get(id)
    .then((results) => {
      response.status(200).json(results)
    })
    .catch((err) => {
      console.log(err)
      response.status(500).json({
        error: 'Internal Server Error',
      })
    })
})

const upload = multer({ dest: 'uploads/' })

router.post('/', upload.single('file'), (request, response) => {
  console.log(request.file)
  console.log(request.body.channelId)
  var tmp_path = request.file.path
  var target_path =
    'uploads/' +
    request.file.filename +
    '.' +
    request.file.originalname.split('.').slice(-1).pop()
  fs.rename(tmp_path, target_path, () => {
    console.log('success')
    // 23946193
    const file = {
      originalname: request.file.originalname,
      stream: fs.createReadStream(target_path),
    }
    const opts = {
      title: request.file.originalname,
      description: 'desc',
      protect: 'public',
    }
    ustream.video
      .upload(request.body.channelId, file, opts)
      .then((results) => {
        fs.unlinkSync(target_path, (err) => {
          if (err) {
            response.status(500).json({
              error: 'Successfully uploaded, failed to delete',
            })
          }
          console.log('deleted')
        })
        response.status(200).json(results)
      })
      .catch((err) => {
        response.status(500).json({
          error: 'Internal Server Error',
        })
      })
  })
})

router.get('/:channelId/:videoId', (request, response) => {
  const channelID = parseInt(request.params.channelId)
  const videoID = parseInt(request.params.videoId)
  ustream.video
    .getStatus(channelID, videoID)
    .then((results) => {
      response.status(200).json(results)
    })
    .catch((err) => {
      response.status(500).json({
        error: 'Internal Server Error',
      })
    })
})

router.delete('/:id', (request, response) => {
  const id = parseInt(request.params.id)
  ustream.video
    .remove(id)
    .then((results) => {
      response.status(200).json(results)
    })
    .catch((err) => {
      response.status(500).json({
        error: 'Internal Server Error',
      })
    })
})

module.exports = router
