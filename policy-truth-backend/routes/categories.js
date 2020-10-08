const logger = require('../logger').logger
const categoryDB = require('../db/categories')
var express = require('express');
var router = express.Router();

/**
 * @api [get] /api/v1/categories
 * summary: Get a list of category objects
 * tags:
 *   - Categories
 * responses:
 *   200:
 *     description: A list of category objects
 *     content:
 *       application/json:
 *         schema:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/Category"
 */
router.get('/', (request, response) => {
    categoryDB.getCategories((error, results) => {
        if (error) {
            logger.error("fail to retrieve categories: %s", error)
            response.status(500).json({
                error: "Internal Server Error"
            })
        } else {
            response.status(200).json(results.rows)
        }
    })
})

/**
 * @api [get] /api/v1/categories/{id}
 * summary: Get a category object
 * tags:
 *   - Categories
 * parameters:
 *   - in: path
 *     name: id
 *     schema:
 *       type: integer
 *     description: The category ID
 * responses:
 *   200:
 *     description: Category object found
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/Category"
 *   404:
 *     description: No Category object exists for that id
 */
router.get('/:id', (request, response) => {
    const id = parseInt(request.params.id)
    categoryDB.getCategoryById(id, (error, results) => {
        if (error) {
            logger.error("fail to retrieve category with id %d: %s", id, error)
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
 * @api [get] /api/v1/categories/name/{name}
 * summary: Get a category object by name
 * tags:
 *   - Categories
 * parameters:
 *   - in: path
 *     name: name
 *     schema:
 *       type: string
 *     description: The category name
 * responses:
 *   200:
 *     description: Category object found
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/Category"
 *   404:
 *     description: No Category object exists for that name
 */
router.get('/name/:name', (request, response) => {
    categoryDB.getCategoryByName(request.params.name, (error, results) => {
        if (error) {
            logger.error("fail to retrieve category with name %s: %s", request.params.name, error)
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
 * @api [post] /api/v1/categories
 * summary: Creates a category object
 * tags:
 *   - Categories
 * parameters:
 *   - in: body
 *     schema:
 *       $ref: "#/components/schemas/Category"
 * responses:
 *   201:
 *     description: ID of Category object added
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/IdOfCreatedObject"
 */
router.post('/', (request, response) => {
    categoryDB.createCategory(request.body, (error, results) => {
        if (error) {
            logger.error("fail to create category: %s", error)
            response.status(500).json({
                error: "Internal Server Error"
            })
        } else {
            response.status(201).json(results.rows[0])
        }
    })
})

/**
 * @api [put] /api/v1/categories
 * summary: Updates a category object
 * tags:
 *   - Categories
 * parameters:
 *   - in: path
 *     name: id
 *     schema:
 *       type: integer
 *     description: The category ID
 *   - in: body
 *     schema:
 *       $ref: "#/components/schemas/Category"
 * responses:
 *   200:
 *     description: confirmation of success
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/ConfirmationOfSuccess"
 *   404:
 *     description: No Category object exists for that id
 */
router.put('/:id', (request, response) => {
    const id = parseInt(request.params.id)
    categoryDB.updateCategory(id, request.body, (error, results) => {
        if (error) {
            logger.error("fail to update category with id %d: %s", id, error)
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
 * @api [delete] /api/v1/categories/{id}
 * summary: Deletes a category object
 * tags:
 *   - Categories
 * parameters:
 *   - in: path
 *     name: id
 *     schema:
 *       type: integer
 *     description: The category ID
 * responses:
 *   200:
 *     description: confirmation of success
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/ConfirmationOfSuccess"
 *   404:
 *     description: No Category object exists for that id
 */
router.delete('/:id', (request, response) => {
    const id = parseInt(request.params.id)
    categoryDB.deleteCategory(id, (error, results) => {
        if (error) {
            logger.error("fail to delete category with id %d: %s", id, error)
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
