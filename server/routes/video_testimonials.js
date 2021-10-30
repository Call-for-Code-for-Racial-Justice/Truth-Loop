const logger = require('../logger').logger
const videoTestimonialDB = require('../db/video_testimonials')
var express = require('express')
var router = express.Router()

/**
 * @api [get] /api/v1/videoTestimonials
 * summary: Get a list of video testimonial objects
 * tags:
 *   - VideoTestimonials
 * responses:
 *   200:
 *     description: A list of video testimonial objects
 *     content:
 *       application/json:
 *         schema:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/VideoTestimonial"
 */
router.get('/', (request, response) => {
  videoTestimonialDB.getVideoTestimonials((error, results) => {
    if (error) {
      logger.error('failed to retrieve the video testimonials: %s', error)
      response.status(500).json({
        error: 'Internal Server Error',
      })
    } else {
      response.status(200).json(results.rows)
    }
  })
})

/**
 * @api [get] /api/v1/videoTestimonials/{id}
 * summary: Get a video testimonial object
 * tags:
 *   - VideoTestimonials
 * parameters:
 *   - in: path
 *     name: id
 *     schema:
 *       type: integer
 *     description: The video testimonial ID
 * responses:
 *   200:
 *     description: Video Testimonial object found
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/VideoTestimonial"
 *   404:
 *     description: No Video Testimonial object exists for that id
 */
router.get('/:id', (request, response) => {
  const id = parseInt(request.params.id)
  videoTestimonialDB.getVideoTestimonialById(id, (error, results) => {
    if (error) {
      logger.error(
        'fail to retrieve video testimonial with id %d: %s',
        id,
        error
      )
      response.status(500).json({
        error: 'Internal Server Error',
      })
    } else {
      if (results.rows && results.rows.length > 0) {
        response.status(200).json(results.rows[0])
      } else {
        response.status(404).json({
          error: 'Not Found',
        })
      }
    }
  })
})

/**
 * @api [post] /api/v1/videoTestimonials
 * summary: Create a video testimonial object
 * tags:
 *   - VideoTestimonials
 * parameters:
 *   - in: body
 *     schema:
 *       $ref: "#/components/schemas/VideoTestimonial"
 * responses:
 *   201:
 *     description: ID of Video Testimonial object added
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/IdOfCreatedObject"
 */
router.post('/', (request, response) => {
  videoTestimonialDB.createVideoTestimonial(request.body, (error, results) => {
    if (error) {
      logger.error('fail to create video testimonial: %s', error)
      response.status(500).json({
        error: 'Internal Server Error',
      })
    } else {
      response.status(201).json(results.rows[0])
    }
  })
})

/**
 * @api [put] /api/v1/videoTestimonials
 * summary: Update a video testimonial object
 * tags:
 *   - VideoTestimonials
 * parameters:
 *   - in: path
 *     name: id
 *     schema:
 *       type: integer
 *     description: The video testimonial ID
 *   - in: body
 *     schema:
 *       $ref: "#/components/schemas/VideoTestimonial"
 * responses:
 *   200:
 *     description: confirmation of success
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/ConfirmationOfSuccess"
 *   404:
 *     description: No Video Testimonial object exists for that id
 */
router.put('/:id', (request, response) => {
  const id = parseInt(request.params.id)
  videoTestimonialDB.updateVideoTestimonial(
    id,
    request.body,
    (error, results) => {
      if (error) {
        logger.error(
          'fail to update video testimonial with id %d: %s',
          id,
          error
        )
        response.status(500).json({
          error: 'Internal Server Error',
        })
      } else {
        if (results.rowCount > 0) {
          response.status(200).json({
            ok: true,
          })
        } else {
          response.status(404).json({
            error: 'Not Found',
          })
        }
      }
    }
  )
})

/**
 * @api [delete] /api/v1/videoTestimonials/{id}
 * summary: Delete a video testimonial object
 * tags:
 *   - VideoTestimonials
 * parameters:
 *   - in: path
 *     name: id
 *     schema:
 *       type: integer
 *     description: The video testimonial ID
 * responses:
 *   200:
 *     description: confirmation of success
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/ConfirmationOfSuccess"
 *   404:
 *     description: No Video Testimonial object exists for that id
 */
router.delete('/:id', (request, response) => {
  const id = parseInt(request.params.id)
  videoTestimonialDB.deleteVideoTestimonial(id, (error, results) => {
    if (error) {
      logger.error('fail to delete video testimonial with id %d: %s', id, error)
      response.status(500).json({
        error: 'Internal Server Error',
      })
    } else {
      if (results.rowCount > 0) {
        response.status(200).json({
          ok: true,
        })
      } else {
        response.status(404).json({
          error: 'Not Found',
        })
      }
    }
  })
})

module.exports = router
