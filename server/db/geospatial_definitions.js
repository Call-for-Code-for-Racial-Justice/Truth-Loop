const pool = require('./db_pool').pool

const getGeospatialDefinitions = (callback) => {
  pool.query('SELECT * FROM geospatial_definition ORDER BY id ASC', callback)
}

const getGeospatialDefinitionById = (id, callback) => {
  pool.query(
    'SELECT * FROM geospatial_definition WHERE id = $1',
    [id],
    callback
  )
}

const getGeospatialDefinitionByName = (name, callback) => {
  pool.query(
    'SELECT * FROM geospatial_definition WHERE name = $1',
    [name],
    callback
  )
}

const createGeospatialDefinition = (data, callback) => {
  pool.query(
    'INSERT INTO geospatial_definition (name, short_name_ui, description) VALUES ($1, $2, $3) returning id',
    [data.name, data.short_name_ui, data.description],
    callback
  )
}

const updateGeospatialDefinition = (id, data, callback) => {
  pool.query(
    'UPDATE geospatial_definition SET name = $1, short_name_ui = $2, description = $3, updated = now() WHERE id = $4',
    [data.name, data.short_name_ui, data.description, id],
    callback
  )
}

const deleteGeospatialDefinition = (id, callback) => {
  pool.query('DELETE FROM geospatial_definition WHERE id = $1', [id], callback)
}

module.exports = {
  getGeospatialDefinitions,
  getGeospatialDefinitionById,
  getGeospatialDefinitionByName,
  createGeospatialDefinition,
  updateGeospatialDefinition,
  deleteGeospatialDefinition,
}
