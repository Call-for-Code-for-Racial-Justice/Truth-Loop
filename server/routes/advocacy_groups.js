const logger = require('../logger').logger
const advocacyGroupDB = require('../db/advocacy_groups')
var express = require('express')
var router = express.Router()

/**
 * @api [get] /api/v1/advocacyGroups
 * summary: Get a list of advocacy group objects
 * tags:
 *   - AdvocacyGroups
 * responses:
 *   200:
 *     description: A list of advocacy group objects
 *     content:
 *       application/json:
 *         schema:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/AdvocacyGroup"
 */
router.get('/', (request, response) => {
  advocacyGroupDB.getAdvocacyGroups((error, results) => {
    if (error) {
      logger.error('failed to retrieve advocacy groups: %s', error)
      response.status(500).json({
        error: 'Internal Server Error',
      })
    } else {
      response.status(200).json(results.rows)
    }
  })
})

/**
 * @api [get] /api/v1/advocacyGroups/{id}
 * summary: Get an advocacy group object
 * tags:
 *   - AdvocacyGroups
 * parameters:
 *   - in: path
 *     name: id
 *     schema:
 *       type: integer
 *     description: The advocacy group ID
 * responses:
 *   200:
 *     description: AdvocacyGroup object found
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/AdvocacyGroup"
 *   404:
 *     description: No Advocacy Group object exists for that id
 */
router.get('/:id', (request, response) => {
  const id = parseInt(request.params.id)
  advocacyGroupDB.getAdvocacyGroupById(id, (error, results) => {
    if (error) {
      logger.error('fail to retrieve advocacy group with id %d: %s', id, error)
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
 * @api [post] /api/v1/advocacyGroups
 * summary: Create an advocacy group object
 * tags:
 *   - AdvocacyGroups
 * parameters:
 *   - in: body
 *     schema:
 *       $ref: "#/components/schemas/AdvocacyGroup"
 * responses:
 *   201:
 *     description: ID of Advocacy Group object added
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/IdOfCreatedObject"
 */
router.post('/', (request, response) => {
  advocacyGroupDB.createAdvocacyGroup(request.body, (error, results) => {
    if (error) {
      logger.error('fail to create advocacy group: %s', error)
      response.status(500).json({
        error: 'Internal Server Error',
      })
    } else {
      response.status(201).json(results.rows[0])
    }
  })
})

/**
 * @api [put] /api/v1/advocacyGroups
 * summary: Update an advocacy group object
 * tags:
 *   - AdvocacyGroups
 * parameters:
 *   - in: path
 *     name: id
 *     schema:
 *       type: integer
 *     description: The advocacy group ID
 *   - in: body
 *     schema:
 *       $ref: "#/components/schemas/AdvocacyGroup"
 * responses:
 *   200:
 *     description: confirmation of success
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/ConfirmationOfSuccess"
 *   404:
 *     description: No Advocacy Group object exists for that id
 */
router.put('/:id', (request, response) => {
  const id = parseInt(request.params.id)
  advocacyGroupDB.updateAdvocacyGroup(id, request.body, (error, results) => {
    if (error) {
      logger.error('fail to update advocacy group with id %d: %s', id, error)
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
 * @api [delete] /api/v1/advocacyGroups/{id}
 * summary: Delete an advocacy group object
 * tags:
 *   - AdvocacyGroups
 * parameters:
 *   - in: path
 *     name: id
 *     schema:
 *       type: integer
 *     description: The advocacy group ID
 * responses:
 *   200:
 *     description: confirmation of success
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/ConfirmationOfSuccess"
 *   404:
 *     description: No Advocacy Group object exists for that id
 */
router.delete('/:id', (request, response) => {
  const id = parseInt(request.params.id)
  advocacyGroupDB.deleteAdvocacyGroup(id, (error, results) => {
    if (error) {
      logger.error('fail to delete advocacy group with id %d: %s', id, error)
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
