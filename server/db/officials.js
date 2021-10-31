const pool = require('./db_pool').pool

const getOfficials = (callback) => {
  pool.query('SELECT * FROM official ORDER BY id ASC', callback)
}

const getOfficialById = (id, callback) => {
  pool.query('SELECT * FROM official WHERE id=$1', [id], callback)
}

const createOfficial = (data, callback) => {
  pool.query(
    'INSERT INTO official (name, title, email_address, phone_number, website_url) VALUES ($1, $2, $3, $4, $5) returning id',
    [
      data.name,
      data.title,
      data.email_address,
      data.phone_number,
      data.website_url,
    ],
    callback
  )
}

const updateOfficial = (id, data, callback) => {
  pool.query(
    'UPDATE official SET name=$1, title=$2, email_address=$3, phone_number=$4, website_url=$5, updated = now() WHERE id=$6',
    [
      data.name,
      data.title,
      data.email_address,
      data.phone_number,
      data.website_url,
      id,
    ],
    callback
  )
}

const deleteOfficial = (id, callback) => {
  pool.query('DELETE FROM official WHERE id=$1', [id], callback)
}

module.exports = {
  getOfficials,
  getOfficialById,
  createOfficial,
  updateOfficial,
  deleteOfficial,
}
