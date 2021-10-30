const pool = require('./db_pool').pool

const getCategories = (callback) => {
  pool.query('SELECT * FROM category ORDER BY id ASC', callback)
}

const getCategoryById = (id, callback) => {
  pool.query('SELECT * FROM category WHERE id = $1', [id], callback)
}

const getCategoryByName = (name, callback) => {
  pool.query('SELECT * FROM category WHERE name = $1', [name], callback)
}

const createCategory = (data, callback) => {
  pool.query(
    'INSERT INTO category (name, description) VALUES ($1, $2) returning id',
    [data.name, data.description],
    callback
  )
}

const updateCategory = (id, data, callback) => {
  pool.query(
    'UPDATE category SET name = $1, description = $2, updated = now() WHERE id = $3',
    [data.name, data.description, id],
    callback
  )
}

const deleteCategory = (id, callback) => {
  pool.query('DELETE FROM category WHERE id = $1', [id], callback)
}

module.exports = {
  getCategories,
  getCategoryById,
  getCategoryByName,
  createCategory,
  updateCategory,
  deleteCategory,
}
