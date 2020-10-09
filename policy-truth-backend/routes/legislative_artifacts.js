const logger = require('../logger').logger
const legislativeArtifactDB = require('../db/legislative_artifacts')
var express = require('express');
var router = express.Router();

/**
 * @api [get] /api/v1/legislativeArtifacts
 * summary: Get a list of legislative artifact objects
 * tags:
 *   - LegislativeArtifacts
 * responses:
 *   200:
 *     description: A list of legislative artifact objects
 *     content:
 *       application/json:
 *         schema:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/LegislativeArtifact"
 */
router.get('/', (request, response) => {
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
})

/**
 * @api [get] /api/v1/legislativeArtifacts/{id}
 * summary: Get a legislative artifact object
 * tags:
 *   - LegislativeArtifacts
 * parameters:
 *   - in: path
 *     name: id
 *     schema:
 *       type: integer
 *     description: The legislative artifact ID
 * responses:
 *   200:
 *     description: Legislative Artifact object found
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/LegislativeArtifact"
 *   404:
 *     description: No Legislative Artifact object exists for that id
 */
router.get('/:id', (request, response) => {
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
})

/**
 * @api [post] /api/v1/legislativeArtifacts
 * summary: Create a legislative artifact object
 * tags:
 *   - LegislativeArtifacts
 * parameters:
 *   - in: body
 *     schema:
 *       $ref: "#/components/schemas/LegislativeArtifact"
 * responses:
 *   201:
 *     description: ID of Legislative Artifact object added
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/IdOfCreatedObject"
 */
router.post('/', (request, response) => {
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
})

/**
 * @api [put] /api/v1/legislativeArtifacts
 * summary: Update a legislative artifact object
 * tags:
 *   - LegislativeArtifacts
 * parameters:
 *   - in: path
 *     name: id
 *     schema:
 *       type: integer
 *     description: The legislative artifact ID
 *   - in: body
 *     schema:
 *       $ref: "#/components/schemas/LegislativeArtifact"
 * responses:
 *   200:
 *     description: confirmation of success
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/ConfirmationOfSuccess"
 *   404:
 *     description: No Legislative Artifact object exists for that id
 */
router.put('/:id', (request, response) => {
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
})

/**
 * @api [delete] /api/v1/legislativeArtifacts/{id}
 * summary: Delete a legislative artifact object
 * tags:
 *   - LegislativeArtifacts
 * parameters:
 *   - in: path
 *     name: id
 *     schema:
 *       type: integer
 *     description: The legislative artifact ID
 * responses:
 *   200:
 *     description: confirmation of success
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/ConfirmationOfSuccess"
 *   404:
 *     description: No Legislative Artifact object exists for that id
 */
router.delete('/:id', (request, response) => {
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
})

module.exports = router
