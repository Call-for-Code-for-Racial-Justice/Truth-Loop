const logger = require('../logger').logger;
const videoTestimonialDB = require('../db/video_testimonials');

const getVideoTestimonials = (request, response) => {
  videoTestimonialDB.getVideoTestimonials((error, results) => {
      if (error) {
          logger.error("failed to retrieve the video testimonials: %s", error)
          response.status(500).json({
              error: "Internal Server Error"
          })
      } else {
          response.status(200).json(results.rows)
      }
  })
}

const getVideoTestimonialById = (request, response) => {
  const id = parseInt(request.params.id)
  videoTestimonialDB.getVideoTestimonialById(id, (error, results) => {
      if (error) {
          logger.error("fail to retrieve video testimonial with id %d: %s", id, error)
          response.status(500).json({
              error: "Internal Server Error"
          })
      } else {
          if (results.rows && results.rows.length > 0) {
              response.status(200).json(results.rows[0])
          } else {
              response.status(404).json({
                  error: "Not Found"
              })
          }
      }
  })
}

const createVideoTestimonial = (request, response) => {
    videoTestimonialDB.createVideoTestimonial(request.body, (error, results) => {
        if (error) {
            logger.error("fail to create video testimonial: %s", error)
            response.status(500).json({
                error: "Internal Server Error"
            })
        } else {
            response.status(201).json(results.rows[0])
        }
    })
}

const updateVideoTestimonial = (request, response) => {
  const id = parseInt(request.params.id)
  videoTestimonialDB.updateVideoTestimonial(id, request.body, (error, results) => {
      if (error) {
          logger.error("fail to update video testimonial with id %d: %s", id, error)
          response.status(500).json({
              error: "Internal Server Error"
          })
      } else {
          if (results.rowCount > 0) {
              response.status(200).json({
                  ok: true
              })
          } else {
              response.status(404).json({
                  error: "Not Found"
              })
          }
      }
  })
}

const deleteVideoTestimonial = (request, response) => {
  const id = parseInt(request.params.id)
  videoTestimonialDB.deleteVideoTestimonial(id, (error, results) => {
      if (error) {
          logger.error("fail to delete video testimonial with id %d: %s", id, error)
          response.status(500).json({
              error: "Internal Server Error"
          })
      } else {
          if (results.rowCount > 0) {
              response.status(200).json({
                  ok: true
              })
          } else {
              response.status(404).json({
                  error: "Not Found"
              })
          }
      }
  })
}

module.exports = {
  getVideoTestimonials,
  getVideoTestimonialById,
  createVideoTestimonial,
  updateVideoTestimonial,
  deleteVideoTestimonial,
}
