const logger = require('../logger').logger
const categoryDB = require('../db/category')

const getCategories = (request, response) => {
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
}

const getCategoryById = (request, response) => {
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
}

const getCategoryByName = (request, response) => {
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
}

const createCategory = (request, response) => {
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
}

const updateCategory = (request, response) => {
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
}

const deleteCategory = (request, response) => {
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
}

module.exports = {
    getCategories,
    getCategoryById,
    getCategoryByName,
    createCategory,
    updateCategory,
    deleteCategory,
}
