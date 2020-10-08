const logger = require('../logger').logger
const publicationDB = require('../db/publications')

const getPublications = (request, response) => {
    publicationDB.getPublications((error, results) => {
        if (error) {
            logger.error("fail to retrieve categories: %s", error)
            response.status(500).json({
                error: "Internal Server Error"
            })
        } else {
            response.status(200).json(results.rows)
        }
    })
}

const getPublicationById = (request, response) => {
    const id = parseInt(request.params.id)
    publicationDB.getPublicationById(id, (error, results) => {
        if (error) {
            logger.error("fail to retrieve publication with id %d: %s", id, error)
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

const createPublication = (request, response) => {
    publicationDB.createPublication(request.body, (error, results) => {
        if (error) {
            logger.error("fail to create publication: %s", error)
            response.status(500).json({
                error: "Internal Server Error"
            })
        } else {
            response.status(201).json(results.rows[0])
        }
    })
}

const updatePublication = (request, response) => {
    const id = parseInt(request.params.id)
    publicationDB.updatePublication(id, request.body, (error, results) => {
        if (error) {
            logger.error("fail to update publication with id %d: %s", id, error)
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

const deletePublication = (request, response) => {
    const id = parseInt(request.params.id)
    publicationDB.deletePublication(id, (error, results) => {
        if (error) {
            logger.error("fail to delete publication with id %d: %s", id, error)
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
    getPublications,
    getPublicationById,
    createPublication,
    updatePublication,
    deletePublication,
}
