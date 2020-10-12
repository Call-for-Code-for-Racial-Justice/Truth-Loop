const pool = require('./db_pool').pool;

const getVideoTestimonials = (callback) => {
  pool.query(
    'SELECT  * FROM video_testimonial ORDER BY id ASC',
    callback
  )
}

const getVideoTestimonialById = (id, callback) => {
  pool.query(
    'SELECT * FROM video_testimonial WHERE id = $1',
    [id],
    callback
  )
}

const createVideoTestimonial = (data, callback) => {
    pool.query(
        'INSERT INTO video_testimonial (subject, "comment", video_cms_id, privacy_stmt_ack) VALUES ($1, $2, $3, $4) returning id',
        [data.subject, data.comment, data.video_cms_id, data.privacy_stmt_ack],
        callback
    )
}

const updateVideoTestimonial = (id, data, callback) => {
  console.log('entered the right function');
  pool.query(
    'UPDATE video_testimonial SET subject=$1, "comment"=$2, video_cms_id=$3, privacy_stmt_ack=$4, updated = now() WHERE id=$5',
    [data.subject, data.comment, data.video_cms_id, data.privacy_stmt_ack, id],
    callback
  )
}

const deleteVideoTestimonial = (id, callback) => {
  pool.query(
    'DELETE FROM video_testimonial WHERE id=$1',
    [id],
    callback
  )
}

module.exports = {
  getVideoTestimonials,
  getVideoTestimonialById,
  createVideoTestimonial,
  updateVideoTestimonial,
  deleteVideoTestimonial,
}
