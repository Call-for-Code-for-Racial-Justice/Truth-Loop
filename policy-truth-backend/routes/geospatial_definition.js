const logger = require('../logger').logger
const geospatialDefinitionDB = require('../db/geospatial_definition')

const getGeospatialDefinitions = (request, response) => {
    geospatialDefinitionDB.getGeospatialDefinitions((error, results) => {
        if (error) {
            logger.error("fail to retrieve geospatial definitions: %s", error)
            response.status(500).json({
                error: "Internal Server Error"
            })
        } else {
            response.status(200).json(results.rows)
        }
    })
}

const getGeospatialDefinitionById = (request, response) => {
    const id = parseInt(request.params.id)
    geospatialDefinitionDB.getGeospatialDefinitionById(id, (error, results) => {
        if (error) {
            logger.error("fail to retrieve geospatial definition with id %d: %s", id, error)
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

const getGeospatialDefinitionByName = (request, response) => {
    geospatialDefinitionDB.getGeospatialDefinitionByName(request.params.name, (error, results) => {
        if (error) {
            logger.error("fail to retrieve geospatial definition with name %s: %s", request.params.name, error)
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

const createGeospatialDefinition = (request, response) => {
    geospatialDefinitionDB.createGeospatialDefinition(request.body, (error, results) => {
        if (error) {
            logger.error("fail to create geospatial definition: %s", error)
            response.status(500).json({
                error: "Internal Server Error"
            })
        } else {
            response.status(201).json(results.rows[0])
        }
    })
}

const updateGeospatialDefinition = (request, response) => {
    const id = parseInt(request.params.id)
    geospatialDefinitionDB.updateGeospatialDefinition(id, request.body, (error, results) => {
        if (error) {
            logger.error("fail to update geospatial definition with id %d: %s", id, error)
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

const deleteGeospatialDefinition = (request, response) => {
    const id = parseInt(request.params.id)
    geospatialDefinitionDB.deleteGeospatialDefinition(id, (error, results) => {
        if (error) {
            logger.error("fail to delete geospatial definition with id %d: %s", id, error)
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
    getGeospatialDefinitions,
    getGeospatialDefinitionById,
    getGeospatialDefinitionByName,
    createGeospatialDefinition,
    updateGeospatialDefinition,
    deleteGeospatialDefinition,
}
