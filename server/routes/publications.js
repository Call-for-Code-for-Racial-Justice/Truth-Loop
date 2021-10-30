const logger = require('../logger').logger
const publicationDB = require('../db/publications')
var express = require('express')
var router = express.Router()

/**
 * @api [get] /api/v1/publications
 * summary: Get a list of publication objects
 * tags:
 *   - Publications
 * responses:
 *   200:
 *     description: A list of publication objects
 *     content:
 *       application/json:
 *         schema:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/Publication"
 */
router.get('/', (request, response) => {
  publicationDB.getPublications((error, results) => {
    if (error) {
      logger.error('fail to retrieve categories: %s', error)
      response.status(500).json({
        error: 'Internal Server Error',
      })
    } else {
      response.status(200).json(results.rows)
    }
  })
})

/**
 * @api [get] /api/v1/publications/{id}
 * summary: Get a publication object
 * tags:
 *   - Publications
 * parameters:
 *   - in: path
 *     name: id
 *     schema:
 *       type: integer
 *     description: The publication ID
 * responses:
 *   200:
 *     description: Publication object found
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/Publication"
 *   404:
 *     description: No Publication object exists for that id
 */
router.get('/:id', (request, response) => {
  const id = parseInt(request.params.id)
  publicationDB.getPublicationById(id, (error, results) => {
    if (error) {
      logger.error('fail to retrieve publication with id %d: %s', id, error)
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
 * @api [post] /api/v1/publications
 * summary: Create a publication object
 * tags:
 *   - Publications
 * parameters:
 *   - in: body
 *     schema:
 *       $ref: "#/components/schemas/Publication"
 * responses:
 *   201:
 *     description: ID of Publication object added
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/IdOfCreatedObject"
 */
router.post('/', (request, response) => {
  publicationDB.createPublication(request.body, (error, results) => {
    if (error) {
      logger.error('fail to create publication: %s', error)
      response.status(500).json({
        error: 'Internal Server Error',
      })
    } else {
      response.status(201).json(results.rows[0])
    }
  })
})

/**
 * @api [put] /api/v1/publications
 * summary: Update a publication object
 * tags:
 *   - Publications
 * parameters:
 *   - in: path
 *     name: id
 *     schema:
 *       type: integer
 *     description: The publication ID
 *   - in: body
 *     schema:
 *       $ref: "#/components/schemas/Publication"
 * responses:
 *   200:
 *     description: confirmation of success
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/ConfirmationOfSuccess"
 *   404:
 *     description: No Publication object exists for that id
 */
router.put('/:id', (request, response) => {
  const id = parseInt(request.params.id)
  publicationDB.updatePublication(id, request.body, (error, results) => {
    if (error) {
      logger.error('fail to update publication with id %d: %s', id, error)
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
 * @api [delete] /api/v1/publications/{id}
 * summary: Delete a publication object
 * tags:
 *   - Publications
 * parameters:
 *   - in: path
 *     name: id
 *     schema:
 *       type: integer
 *     description: The publication ID
 * responses:
 *   200:
 *     description: confirmation of success
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/ConfirmationOfSuccess"
 *   404:
 *     description: No Publication object exists for that id
 */
router.delete('/:id', (request, response) => {
  const id = parseInt(request.params.id)
  publicationDB.deletePublication(id, (error, results) => {
    if (error) {
      logger.error('fail to delete publication with id %d: %s', id, error)
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
