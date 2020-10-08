const logger = require('../logger').logger
const geospatialDefinitionDB = require('../db/geospatial_definition')
var express = require('express');
var router = express.Router();

/**
  @api [get] /api/v1/geospatialDefinition
  summary: Get a list of geospatial definition objects
  tags:
    - Geospatial Definitions
  responses:
    200:
      description: A list of geospatial definition objects
      content:
        application/json:
          schema:
            type: array
            items:
              $ref: "#/components/schemas/GeospatialDefinition"
 */
router.get('/', (request, response) => {
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
})

/**
  @api [get] /api/v1/geospatialDefinition/{id}
  summary: Get a geospatial definition object
  tags:
    - Geospatial Definitions
  parameters:
    - in: path
      name: id
      schema:
        type: integer
      description: The geospatisl definition ID
  responses:
    200:
      description: Geospatial Definition object found
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/GeospatialDefinition"
    404:
      description: No Geospatial Definition object exists for that id
 */
router.get('/:id', (request, response) => {
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
})

/**
  @api [get] /api/v1/geospatialDefinition/name/{name}
  summary: Get a geospatial definition object by name
  tags:
    - Geospatial Definitions
  parameters:
    - in: path
      name: name
      schema:
        type: string
      description: The geospatial definition name
  responses:
    200:
      description: Geospatial Definition object found
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/GeospatialDefinition"
    404:
      description: No Geospatial Definition object exists for that name
 */
router.get('/name/:name', (request, response) => {
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
})

/**
  @api [post] /api/v1/geospatialDefinition
  summary: Creates a geospatial definition object
  tags:
    - Geospatial Definitions
  parameters:
    - in: body
      schema:
        $ref: "#/components/schemas/GeospatialDefinition"
  responses:
    201:
      description: ID of the Geospatial Definition object added
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/IdOfCreatedObject"
 */
router.post('/', (request, response) => {
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
})

/**
  @api [put] /api/v1/geospatialDefinition
  summary: Updates a geospatial definition object
  tags:
    - Geospatial Definitions
  parameters:
    - in: path
      name: id
      schema:
        type: integer
      description: The geospatial definition ID
    - in: body
      schema:
        $ref: "#/components/schemas/GeospatialDefinition"
  responses:
    200:
      description: confirmation of success
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/ConfirmationOfSuccess"
    404:
      description: No Geospatial Definition object exists for that name
 */
router.put('/:id', (request, response) => {
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
})

/**
  @api [delete] /api/v1/geospatialDefinition/{id}
  summary: Deletes a geospatial definition object
  tags:
    - Geospatial Definitions
  parameters:
    - in: path
      name: id
      schema:
        type: integer
      description: The geospatial definition ID
  responses:
    200:
      description: confirmation of success
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/ConfirmationOfSuccess"
    404:
      description: No Geospatial Definition object exists for that id
 */
router.delete('/:id', (request, response) => {
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
})

module.exports = router
