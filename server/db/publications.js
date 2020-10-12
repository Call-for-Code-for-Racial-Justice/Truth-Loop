const pool = require('./db_pool').pool

const getPublications = (callback) => {
    pool.query(
        'SELECT * FROM publication ORDER BY id ASC',
        callback
    )
}

const getPublicationById = (id, callback) => {
    pool.query(
        'SELECT * FROM publication WHERE id = $1',
        [id],
        callback
    )
}

const createPublication = (data, callback) => {
    pool.query(
        'INSERT INTO publication (title, description, link) VALUES ($1, $2, $3) returning id',
        [data.title, data.description, data.link],
        callback
    )
}

const updatePublication = (id, data, callback) => {
    pool.query(
        'UPDATE publication SET title = $1, description = $2, link = $3, updated = now() WHERE id = $4',
        [data.title, data.description, data.link, id],
        callback
    )
}

const deletePublication = (id, callback) => {
    pool.query(
        'DELETE FROM publication WHERE id = $1',
        [id],
        callback
    )
}

module.exports = {
    getPublications,
    getPublicationById,
    createPublication,
    updatePublication,
    deletePublication,
}
