const pool = require('./db_pool').pool

const getLevels = (callback) => {
  pool.query('SELECT * FROM level ORDER BY id ASC', callback)
}

const getLevelById = (id, callback) => {
  pool.query('SELECT * FROM level WHERE id = $1', [id], callback)
}

const getLevelByName = (name, callback) => {
  pool.query('SELECT * FROM level WHERE name = $1', [name], callback)
}

const createLevel = (data, callback) => {
  pool.query(
    'INSERT INTO level (name, description) VALUES ($1, $2) returning id',
    [data.name, data.description],
    callback
  )
}

const updateLevel = (id, data, callback) => {
  pool.query(
    'UPDATE level SET name = $1, description = $2, updated = now() WHERE id = $3',
    [data.name, data.description, id],
    callback
  )
}

const deleteLevel = (id, callback) => {
  pool.query('DELETE FROM level WHERE id = $1', [id], callback)
}

module.exports = {
  getLevels,
  getLevelById,
  getLevelByName,
  createLevel,
  updateLevel,
  deleteLevel,
}
