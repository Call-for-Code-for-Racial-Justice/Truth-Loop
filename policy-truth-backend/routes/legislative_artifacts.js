const logger = require('../logger').logger
const legislativeArtifactDB = require('../db/legislative_artifacts')
const intersectionsDB = require('../db/intersections_for_list')
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

/**
 * @api [get] /api/v1/legislativeArtifacts/list/minDetail
 * summary: Get an unfiltered list of legislative artifacts with minimal detail (for browsing list)
 * tags:
 *   - LegislativeArtifacts
 * responses:
 *   200:
 *     description: A list of legislative artifact objects, with some additional composite detail
 *     content:
 *       application/json:
 *         schema:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/LegislativeArtifactMinDetail"
 */
router.get('/list/minDetail', (request, response) => {
    let pGetArtifacts = new Promise(function (resolve, reject) {
        legislativeArtifactDB.getLegislativeArtifacts((error, results) => {
            if (error) {
                reject(error)
            } else {
                resolve(results.rows)
            }
        })
    })
    let pGetArtifactCategoryIntersections = new Promise(function (resolve, reject) {
        intersectionsDB.getArtifactCategoryIntersections((error, results) => {
            if (error) {
                reject(error)
            } else {
                resolve(results.rows)
            }
        })
    })
    let pGetArtifactGeoDefinitionIntersections = new Promise(function (resolve, reject) {
        intersectionsDB.getArtifactGeoDefIntersections((error, results) => {
            if (error) {
                reject(error)
            } else {
                resolve(results.rows)
            }
        })
    })
    let pGetArtifactVideoIntersections = new Promise(function (resolve, reject) {
        intersectionsDB.getArtifactVideoIntersections((error, results) => {
            if (error) {
                reject(error)
            } else {
                resolve(results.rows)
            }
        })
    })
    Promise.all([
        pGetArtifacts,
        pGetArtifactCategoryIntersections,
        pGetArtifactGeoDefinitionIntersections,
        pGetArtifactVideoIntersections
    ]).then(function (results) {
        // first query gets LAs and video counts
        var artifacts = results[0]
        var categories = results[1]
        var geoDefs = results[2]
        var videoIntersections = results[3]

        // second one gets an array with the categories each artifact has, like:
        // [
        //     { artifact_id: 1, category_id: 1, name: 'Category 1' },
        //     { artifact_id: 1, category_id: 2, name: 'Category 2' },
        //     . . .
        // ]
        // so the goal is to insert the categories into arrays in the corresponding LA
        if (artifacts.length > 0) {
            artifacts.forEach(function (artifact) {
                artifact.categories = []
                // go through each artifact
                categories.forEach(function (artifactCategory) {
                    // check through the artifact/category intersections
                    if (artifactCategory.artifact_id == artifact.id) {
                        // if there's a match, make a copy of the artifact/category object
                        let copyOfArtifactCategory = Object.assign({}, artifactCategory)
                        // remove the artifact_id from it
                        delete copyOfArtifactCategory.artifact_id
                        // add it to the categories array of the artifact object
                        artifact.categories.push(copyOfArtifactCategory);
                    }
                })

                // now do the same for geospatial definitions
                artifact.geospatial_pertinence = []
                geoDefs.forEach(function (artifactGeoDef) {
                    if (artifactGeoDef.artifact_id == artifact.id) {
                        let copyOfArtifactGeoDef = Object.assign({}, artifactGeoDef)
                        delete copyOfArtifactGeoDef.artifact_id;
                        artifact.geospatial_pertinence.push(copyOfArtifactGeoDef)
                    }
                })

                // and add an attribute video_count that simply says how many video metadata intersections each has
                // so get the count of the videoIntersections that have the same ID as the artifact
                artifact.video_count = videoIntersections.filter(function(intersection) {
                    return intersection.artifact_id == artifact.id;
                }).length

            })
            response.status(200).json(artifacts)
        } else {
            response.status(200).json([])
        }

    }).catch(error => {
        logger.error("failed to get legislative artifacts for list: %s", error)
        response.status(500).json({
            error: "Internal Server Error"
        })
    })
})

/**
 * @api [get] /api/v1/legislativeArtifacts/fullDetail/{id}
 * summary: Get a legislative artifact object with full details
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
 *           $ref: "#/components/schemas/LegislativeArtifactFullDetail"
 *   404:
 *     description: No Legislative Artifact object exists for that id
 */
router.get('/fullDetail/:id', (request, response) => {
    const id = parseInt(request.params.id)

    let pGetArtifact = new Promise(function (resolve, reject) {
        legislativeArtifactDB.getLegislativeArtifactById(id, (error, results) => {
            if (error) {
                reject(error)
            } else {
                if (results.rows && results.rows.length > 0) {
                    resolve(results.rows[0])
                } else {
                    reject("Legislative Artifact Not Found")
                }
            }
        })
    })
    let pGetCategories = new Promise(function (resolve, reject) {
        intersectionsDB.getCategoryIntersectionsForArtifact(id, (error, results) => {
            if (error) {
                reject(error)
            } else {
                resolve(results.rows)
            }
        })
    })
    let pGetGeoDefinitions = new Promise(function (resolve, reject) {
        intersectionsDB.getGeoDefinitionsForArtifact(id, (error, results) => {
            if (error) {
                reject(error)
            } else {
                resolve(results.rows)
            }
        })
    })
    let pGetOfficials = new Promise(function (resolve, reject) {
        intersectionsDB.getOfficialsForArtifact(id, (error, results) => {
            if (error) {
                reject(error)
            } else {
                resolve(results.rows)
            }
        })
    })
    let pGetPublications = new Promise(function (resolve, reject) {
        intersectionsDB.getPublicationsForArrtifact(id, (error, results) => {
            if (error) {
                reject(error)
            } else {
                resolve(results.rows)
            }
        })
    })
    let pGetAdvocacyGroups = new Promise(function (resolve, reject) {
        intersectionsDB.getAdvocacyGroupsForArtifact(id, (error, results) => {
            if (error) {
                reject(error)
            } else {
                resolve(results.rows)
            }
        })
    })
    let pGetVideoTestimonials = new Promise(function (resolve, reject) {
        intersectionsDB.getVideoTestimonialsForArtifact(id, (error, results) => {
            if (error) {
                reject(error)
            } else {
                resolve(results.rows)
            }
        })
    })
    let pGetRelatedArtifacts = new Promise(function (resolve, reject) {
        intersectionsDB.getRelatedArtifactsForArtifact(id, (error, results) => {
            if (error) {
                reject(error)
            } else {
                resolve(results.rows)
            }
        })
    })
    Promise.all([
        pGetArtifact,
        pGetCategories,
        pGetGeoDefinitions,
        pGetOfficials,
        pGetPublications,
        pGetAdvocacyGroups,
        pGetVideoTestimonials,
        pGetRelatedArtifacts
    ]).then(function (results) {
        var overview = results[0]
        overview.categories = results[1]
        overview.geospatial_pertinence = results[2]
        overview.officials = results[3]
        overview.publications = results[4]
        overview.advocacy_groups = results[5]
        overview.video_testimonials = results[6]
        overview.related = results[7]
        response.status(200).json(overview)
    }).catch(error => {
        logger.error("failed to get overview for policy %d: %s", id, error)
        response.status(500).json({
            error: "Internal Server Error"
        })
    })
})

module.exports = router
