const logger = require('../logger').logger
const legislativeArtifactDB = require('../db/legislative_artifact')

const getLegislativeArtifacts = (request, response) => {
    legislativeArtifactDB.getLegislativeArtifacts((error, results) => {
        if (error) {
            logger.error("fail to retrieve legislative artifacts: %s", error)
            response.status(500).json({
                error: "Internal Server Error"
            })
        } else {
            response.status(200).json(results.rows)
        }
    })
}

const getLegislativeArtifactById = (request, response) => {
    const id = parseInt(request.params.id)
    legislativeArtifactDB.getLegislativeArtifactById(id, (error, results) => {
        if (error) {
            logger.error("fail to retrieve legislative artifact with id %d: %s", id, error)
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

const createLegislativeArtifact = (request, response) => {
    legislativeArtifactDB.createLegislativeArtifact(request.body, (error, results) => {
        if (error) {
            logger.error("fail to create legislative artifact: %s", error)
            response.status(500).json({
                error: "Internal Server Error"
            })
        } else {
            response.status(201).json(results.rows[0])
        }
    })
}

const updateLegislativeArtifact = (request, response) => {
    const id = parseInt(request.params.id)
    legislativeArtifactDB.updateLegislativeArtifact(id, request.body, (error, results) => {
        if (error) {
            logger.error("fail to update legislative artifact with id %d: %s", id, error)
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

const deleteLegislativeArtifact = (request, response) => {
    const id = parseInt(request.params.id)
    legislativeArtifactDB.deleteLegislativeArtifact(id, (error, results) => {
        if (error) {
            logger.error("fail to delete legislative artifact with id %d: %s", id, error)
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
    getLegislativeArtifacts,
    getLegislativeArtifactById,
    createLegislativeArtifact,
    updateLegislativeArtifact,
    deleteLegislativeArtifact,
}
