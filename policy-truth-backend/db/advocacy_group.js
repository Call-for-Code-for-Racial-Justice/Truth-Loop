const pool = require('./db_pool').pool

const getAdvocacyGroups = (callback) => {
  pool.query(
    'SELECT * FROM advocacy_group ORDER BY id ASC',
    callback
  )
}

const getAdvocacyGroupById = (id, callback) => {
  pool.query(
    'SELECT * FROM advocacy_group WHERE id=$1',
    [id],
    callback
  )
}

const createAdvocacyGroup = (data, callback) => {
  pool.query(
    'INSERT INTO advocacy_group (name, description, email_address, phone_number, website_url) VALUES ($1, $2, $3, $4, $5) returning id',
    [data.name, data.description, data.email_address, data.phone_number, data.website_url],
    callback
  )
}

const updateAdvocacyGroup = (id, data, callback) => {
  pool.query(
    'UPDATE advocacy_group SET name=$1, description=$2, email_address=$3, phone_number=$4, website_url=$5, updated = now() WHERE id=$6',
    [data.name, data.description, data.email_address, data.phone_number, data.website_url, id],
    callback
  )
}

const deleteAdvocacyGroup = (id, callback) => {
  pool.query(
    'DELETE FROM advocacy_group WHERE id=$1',
    [id],
    callback
  )
}

module.exports ={
  getAdvocacyGroups,
  getAdvocacyGroupById,
  createAdvocacyGroup,
  updateAdvocacyGroup,
  deleteAdvocacyGroup,
}
