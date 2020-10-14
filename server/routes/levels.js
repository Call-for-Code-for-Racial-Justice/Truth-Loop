const logger = require('../logger').logger
const LevelDB = require('../db/levels')
var express = require('express');
var router = express.Router();

/**
 * @api [get] /api/v1/levels
 * summary: Get a list of level objects
 * tags:
 *   - Levels
 * responses:
 *   200:
 *     description: A list of level objects
 *     content:
 *       application/json:
 *         schema:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/Level"
 */
router.get('/', (request, response) => {
    LevelDB.getLevels((error, results) => {
        if (error) {
            logger.error("fail to retrieve levels: %s", error)
            response.status(500).json({
                error: "Internal Server Error"
            })
        } else {
            response.status(200).json(results.rows)
        }
    })
})

/**
 * @api [get] /api/v1/levels/{id}
 * summary: Get a level object
 * tags:
 *   - Levels
 * parameters:
 *   - in: path
 *     name: id
 *     schema:
 *       type: integer
 *     description: The level ID
 * responses:
 *   200:
 *     description: Level object found
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/Level"
 *   404:
 *     description: No Level object exists for that id
 */
router.get('/:id', (request, response) => {
    const id = parseInt(request.params.id)
    LevelDB.getLevelById(id, (error, results) => {
        if (error) {
            logger.error("fail to retrieve level with id %d: %s", id, error)
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
 * @api [get] /api/v1/levels/name/{name}
 * summary: Get a level object by name
 * tags:
 *   - Levels
 * parameters:
 *   - in: path
 *     name: name
 *     schema:
 *       type: string
 *     description: The level name
 * responses:
 *   200:
 *     description: Level object found
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/Level"
 *   404:
 *     description: No Level object exists for that name
 */
router.get('/name/:name', (request, response) => {
    LevelDB.getLevelByName(request.params.name, (error, results) => {
        if (error) {
            logger.error("fail to retrieve level with name %s: %s", request.params.name, error)
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
 * @api [post] /api/v1/levels
 * summary: Create a level object
 * tags:
 *   - Levels
 * parameters:
 *   - in: body
 *     schema:
 *       $ref: "#/components/schemas/Level"
 * responses:
 *   201:
 *     description: ID of Level object added
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/IdOfCreatedObject"
 */
router.post('/', (request, response) => {
    LevelDB.createLevel(request.body, (error, results) => {
        if (error) {
            logger.error("fail to create level: %s", error)
            response.status(500).json({
                error: "Internal Server Error"
            })
        } else {
            response.status(201).json(results.rows[0])
        }
    })
})

/**
 * @api [put] /api/v1/levels
 * summary: Update a level object
 * tags:
 *   - Levels
 * parameters:
 *   - in: path
 *     name: id
 *     schema:
 *       type: integer
 *     description: The level ID
 *   - in: body
 *     schema:
 *       $ref: "#/components/schemas/Level"
 * responses:
 *   200:
 *     description: confirmation of success
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/ConfirmationOfSuccess"
 *   404:
 *     description: No Level object exists for that id
 */
router.put('/:id', (request, response) => {
    const id = parseInt(request.params.id)
    LevelDB.updateLevel(id, request.body, (error, results) => {
        if (error) {
            logger.error("fail to update level with id %d: %s", id, error)
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
 * @api [delete] /api/v1/levels/{id}
 * summary: Delete a level object
 * tags:
 *   - Levels
 * parameters:
 *   - in: path
 *     name: id
 *     schema:
 *       type: integer
 *     description: The level ID
 * responses:
 *   200:
 *     description: confirmation of success
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/ConfirmationOfSuccess"
 *   404:
 *     description: No Level object exists for that id
 */
router.delete('/:id', (request, response) => {
    const id = parseInt(request.params.id)
    LevelDB.deleteLevel(id, (error, results) => {
        if (error) {
            logger.error("fail to delete level with id %d: %s", id, error)
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
