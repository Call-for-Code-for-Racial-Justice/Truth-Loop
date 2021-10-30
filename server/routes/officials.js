const logger = require('../logger').logger
const officialDB = require('../db/officials')
var express = require('express')
var router = express.Router()

/**
 * @api [get] /api/v1/officials
 * summary: Get a list of official objects
 * tags:
 *   - Officials
 * responses:
 *   200:
 *     description: A list of official objects
 *     content:
 *       application/json:
 *         schema:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/Official"
 */
router.get('/', (request, response) => {
  officialDB.getOfficials((error, results) => {
    if (error) {
      logger.error('failed to retrieve officials: %s', error)
      response.status(500).json({
        error: 'Internal Server Error',
      })
    } else {
      response.status(200).json(results.rows)
    }
  })
})

/**
 * @api [get] /api/v1/officials/{id}
 * summary: Get an official object
 * tags:
 *   - Officials
 * parameters:
 *   - in: path
 *     name: id
 *     schema:
 *       type: integer
 *     description: The official ID
 * responses:
 *   200:
 *     description: Official object found
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/Official"
 *   404:
 *     description: No Official object exists for that id
 */
router.get('/:id', (request, response) => {
  const id = parseInt(request.params.id)
  officialDB.getOfficialById(id, (error, results) => {
    if (error) {
      logger.error('fail to retrieve official with id %d: %s', id, error)
      response.status(500).json({
        error: 'Internal Server Error',
      })
    } else {
      if (results.rows && results.rows.length > 0) {
        response.status(200).json(results.rows[0])
      } else {
        response.status(404).json({
          error: 'Not Found',
        })
      }
    }
  })
})

/**
 * @api [post] /api/v1/officials
 * summary: Create an official object
 * tags:
 *   - Officials
 * parameters:
 *   - in: body
 *     schema:
 *       $ref: "#/components/schemas/Official"
 * responses:
 *   201:
 *     description: ID of Official object added
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/IdOfCreatedObject"
 */
router.post('/', (request, response) => {
  officialDB.createOfficial(request.body, (error, results) => {
    if (error) {
      logger.error('fail to create official: %s', error)
      response.status(500).json({
        error: 'Internal Server Error',
      })
    } else {
      response.status(201).json(results.rows[0])
    }
  })
})

/**
 * @api [put] /api/v1/officials
 * summary: Update an official object
 * tags:
 *   - Officials
 * parameters:
 *   - in: path
 *     name: id
 *     schema:
 *       type: integer
 *     description: The official ID
 *   - in: body
 *     schema:
 *       $ref: "#/components/schemas/Official"
 * responses:
 *   200:
 *     description: confirmation of success
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/ConfirmationOfSuccess"
 *   404:
 *     description: No Official object exists for that id
 */
router.put('/:id', (request, response) => {
  const id = parseInt(request.params.id)
  officialDB.updateOfficial(id, request.body, (error, results) => {
    if (error) {
      logger.error('fail to update official with id %d: %s', id, error)
      response.status(500).json({
        error: 'Internal Server Error',
      })
    } else {
      if (results.rowCount > 0) {
        response.status(200).json({
          ok: true,
        })
      } else {
        response.status(404).json({
          error: 'Not Found',
        })
      }
    }
  })
})

/**
 * @api [delete] /api/v1/officials/{id}
 * summary: Delete an official object
 * tags:
 *   - Officials
 * parameters:
 *   - in: path
 *     name: id
 *     schema:
 *       type: integer
 *     description: The official ID
 * responses:
 *   200:
 *     description: confirmation of success
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/ConfirmationOfSuccess"
 *   404:
 *     description: No Official object exists for that id
 */
router.delete('/:id', (request, response) => {
  const id = parseInt(request.params.id)
  officialDB.deleteOfficial(id, (error, results) => {
    if (error) {
      logger.error('fail to delete official with id %d: %s', id, error)
      response.status(500).json({
        error: 'Internal Server Error',
      })
    } else {
      if (results.rowCount > 0) {
        response.status(200).json({
          ok: true,
        })
      } else {
        response.status(404).json({
          error: 'Not Found',
        })
      }
    }
  })
})

module.exports = router
