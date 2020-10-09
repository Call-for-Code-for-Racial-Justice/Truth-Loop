const logger = require('../logger').logger
const adminIntersectionsDB = require('../db/admin_intersections');
var express = require('express');
var router = express.Router();

/**
 * @api [delete] /api/v1/adminIntersections/category/{artifactId}/{categoryId}
 * summary: Delete a single intersection between an artifact and a category
 * tags:
 *   - Intersections
 * parameters:
 *   - in: path
 *     name: artifactId
 *     schema:
 *       type: integer
 *     description: The artifact ID
 *   - in: path
 *     name: categoryId
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
 */
router.delete('/category/:artifactId/:categoryId', (request, response) => {
    const artifactId = parseInt(request.params.artifactId)
    const categoryId = parseInt(request.params.categoryId)
    adminIntersectionsDB.removeSingleCategoryIntersection(artifactId, categoryId, (error, results) => {
        if (error) {
            logger.error("failed to remove category intersection between artifact %d and category %d: %s", artifactId, categoryId, error)
            response.status(500).json({
                error: "Internal Server Error"
            })
        } else {
            response.status(200).json({
                ok: true
            })
        }
    })
})

/**
 * @api [delete] /api/v1/adminIntersections/category/{artifactId}
 * summary: Delete all category intersections for an artifact
 * tags:
 *   - Intersections
 * parameters:
 *   - in: path
 *     name: artifactId
 *     schema:
 *       type: integer
 *     description: The artifact ID
 * responses:
 *   200:
 *     description: confirmation of success
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/ConfirmationOfSuccess"
 */
router.delete('/category/:artifactId', (request, response) => {
    const artifactId = parseInt(request.params.artifactId)
    adminIntersectionsDB.removeAllCategoryIntersections(artifactId, (error, results) => {
        if (error) {
            logger.error("failed to remove all category intersections for artifact %d: %s", artifactId, error)
            response.status(500).json({
                error: "Internal Server Error"
            })
        } else {
            response.status(200).json({
                ok: true
            })
        }
    })
})

/**
 * @api [post] /api/v1/adminIntersections/category/{artifactId}/{categoryId}
 * summary: Create an association between an artifact and a category
 * tags:
 *   - Intersections
 * parameters:
 *   - in: path
 *     name: artifactId
 *     schema:
 *       type: integer
 *     description: The artifact ID
 *   - in: path
 *     name: categoryId
 *     schema:
 *       type: integer
 *     description: The category ID
 * responses:
 *   201:
 *     description: confirmation of success
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/ConfirmationOfSuccess"
 */
router.post('/category/:artifactId/:categoryId', (request, response) => {
    const artifactId = parseInt(request.params.artifactId)
    const categoryId = parseInt(request.params.categoryId)
    adminIntersectionsDB.addCategoryIntersection(artifactId, categoryId, (error, results) => {
        if (error) {
            logger.error("failed to add category intersection between artifact %d and category %d: %s", artifactId, categoryId, error)
            response.status(500).json({
                error: "Internal Server Error"
            })
        } else {
            response.status(201).json({
                ok: true
            })
        }
    })
})

// GEOSPATIAL DEFINITION ------------------------

/**
 * @api [delete] /api/v1/adminIntersections/geospatialDefinition/{artifactId}/{geospatialDefinitionId}
 * summary: Delete a single intersection between an artifact and a geospatial definition
 * tags:
 *   - Intersections
 * parameters:
 *   - in: path
 *     name: artifactId
 *     schema:
 *       type: integer
 *     description: The artifact ID
 *   - in: path
 *     name: geospatialDefinitionId
 *     schema:
 *       type: integer
 *     description: The geospatial definition ID
 * responses:
 *   200:
 *     description: confirmation of success
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/ConfirmationOfSuccess"
 */
router.delete('/geospatialDefinition/:artifactId/:geospatialDefinitionId', (request, response) => {
    const artifactId = parseInt(request.params.artifactId)
    const geoDefId = parseInt(request.params.geospatialDefinitionId)
    adminIntersectionsDB.removeSingleGeoDefIntersection(artifactId, geoDefId, (error, results) => {
        if (error) {
            logger.error("failed to remove geospatial definition intersection between artifact %d and geoDef %d: %s", artifactId, geoDefId, error)
            response.status(500).json({
                error: "Internal Server Error"
            })
        } else {
            response.status(200).json({
                ok: true
            })
        }
    })
})

/**
 * @api [delete] /api/v1/adminIntersections/geospatialDefinition/{artifactId}
 * summary: Delete all geospatial definition intersections for an artifact
 * tags:
 *   - Intersections
 * parameters:
 *   - in: path
 *     name: artifactId
 *     schema:
 *       type: integer
 *     description: The artifact ID
 * responses:
 *   200:
 *     description: confirmation of success
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/ConfirmationOfSuccess"
 */
router.delete('/geospatialDefinition/:artifactId', (request, response) => {
    const artifactId = parseInt(request.params.artifactId)
    adminIntersectionsDB.removeAllGeoDefIntersections(artifactId, (error, results) => {
        if (error) {
            logger.error("failed to remove all geospatial definition intersections for artifact %d: %s", artifactId, error)
            response.status(500).json({
                error: "Internal Server Error"
            })
        } else {
            response.status(200).json({
                ok: true
            })
        }
    })
})

/**
 * @api [post] /api/v1/adminIntersections/geospatialDefinition/{artifactId}/{geospatialDefinitionId}
 * summary: Create an association between an artifact and a geospatial definition
 * tags:
 *   - Intersections
 * parameters:
 *   - in: path
 *     name: artifactId
 *     schema:
 *       type: integer
 *     description: The artifact ID
 *   - in: path
 *     name: geospatialDefinitionId
 *     schema:
 *       type: integer
 *     description: The geospatial definition ID
 * responses:
 *   201:
 *     description: confirmation of success
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/ConfirmationOfSuccess"
 */
router.post('/geospatialDefinition/:artifactId/:geospatialDefinitionId', (request, response) => {
    const artifactId = parseInt(request.params.artifactId)
    const geoDefId = parseInt(request.params.geospatialDefinitionId)
    adminIntersectionsDB.addGeoDefIntersection(artifactId, geoDefId, (error, results) => {
        if (error) {
            logger.error("failed to add geospatial definition intersection between artifact %d and geoDef %d: %s", artifactId, geoDefId, error)
            response.status(500).json({
                error: "Internal Server Error"
            })
        } else {
            response.status(201).json({
                ok: true
            })
        }
    })
})

// OFFICIAL ------------------------

/**
 * @api [delete] /api/v1/adminIntersections/official/{artifactId}/{officialId}
 * summary: Delete a single intersection between an artifact and an official
 * tags:
 *   - Intersections
 * parameters:
 *   - in: path
 *     name: artifactId
 *     schema:
 *       type: integer
 *     description: The artifact ID
 *   - in: path
 *     name: officialId
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
 */
router.delete('/official/:artifactId/:officialId', (request, response) => {
    const artifactId = parseInt(request.params.artifactId)
    const officialId = parseInt(request.params.officialId)
    adminIntersectionsDB.removeSingleOfficialIntersection(artifactId, officialId, (error, results) => {
        if (error) {
            logger.error("failed to remove official intersection between artifact %d and official %d: %s", artifactId, officialId, error)
            response.status(500).json({
                error: "Internal Server Error"
            })
        } else {
            response.status(200).json({
                ok: true
            })
        }
    })
})

/**
 * @api [delete] /api/v1/adminIntersections/official/{artifactId}
 * summary: Delete all official intersections for an artifact
 * tags:
 *   - Intersections
 * parameters:
 *   - in: path
 *     name: artifactId
 *     schema:
 *       type: integer
 *     description: The artifact ID
 * responses:
 *   200:
 *     description: confirmation of success
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/ConfirmationOfSuccess"
 */
router.delete('/official/:artifactId', (request, response) => {
    const artifactId = parseInt(request.params.artifactId)
    adminIntersectionsDB.removeAllOfficialIntersections(artifactId, (error, results) => {
        if (error) {
            logger.error("failed to remove all official intersections for artifact %d: %s", artifactId, error)
            response.status(500).json({
                error: "Internal Server Error"
            })
        } else {
            response.status(200).json({
                ok: true
            })
        }
    })
})

/**
 * @api [post] /api/v1/adminIntersections/official/{artifactId}/{officialId}
 * summary: Create an association between an artifact and an official
 * tags:
 *   - Intersections
 * parameters:
 *   - in: path
 *     name: artifactId
 *     schema:
 *       type: integer
 *     description: The artifact ID
 *   - in: path
 *     name: officialId
 *     schema:
 *       type: integer
 *     description: The official ID
 * responses:
 *   201:
 *     description: confirmation of success
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/ConfirmationOfSuccess"
 */
router.post('/official/:artifactId/:officialId', (request, response) => {
    const artifactId = parseInt(request.params.artifactId)
    const officialId = parseInt(request.params.officialId)
    adminIntersectionsDB.addOfficialIntersection(artifactId, officialId, (error, results) => {
        if (error) {
            logger.error("failed to add official intersection between artifact %d and official %d: %s", artifactId, officialId, error)
            response.status(500).json({
                error: "Internal Server Error"
            })
        } else {
            response.status(201).json({
                ok: true
            })
        }
    })
})

// PUBLICATION ------------------------

/**
 * @api [delete] /api/v1/adminIntersections/publication/{artifactId}/{publicationId}
 * summary: Delete a single intersection between an artifact and a publication
 * tags:
 *   - Intersections
 * parameters:
 *   - in: path
 *     name: artifactId
 *     schema:
 *       type: integer
 *     description: The artifact ID
 *   - in: path
 *     name: publicationId
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
 */
router.delete('/publication/:artifactId/:publicationId', (request, response) => {
    const artifactId = parseInt(request.params.artifactId)
    const publicationId = parseInt(request.params.publicationId)
    adminIntersectionsDB.removeSinglePublicationIntersection(artifactId, publicationId, (error, results) => {
        if (error) {
            logger.error("failed to remove publication intersection between artifact %d and publication %d: %s", artifactId, publicationId, error)
            response.status(500).json({
                error: "Internal Server Error"
            })
        } else {
            response.status(200).json({
                ok: true
            })
        }
    })
})

/**
 * @api [delete] /api/v1/adminIntersections/publication/{artifactId}
 * summary: Delete all publication intersections for an artifact
 * tags:
 *   - Intersections
 * parameters:
 *   - in: path
 *     name: artifactId
 *     schema:
 *       type: integer
 *     description: The artifact ID
 * responses:
 *   200:
 *     description: confirmation of success
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/ConfirmationOfSuccess"
 */
router.delete('/publication/:artifactId', (request, response) => {
    const artifactId = parseInt(request.params.artifactId)
    adminIntersectionsDB.removeAllPublicationIntersections(artifactId, (error, results) => {
        if (error) {
            logger.error("failed to remove all publication intersections for artifact %d: %s", artifactId, error)
            response.status(500).json({
                error: "Internal Server Error"
            })
        } else {
            response.status(200).json({
                ok: true
            })
        }
    })
})

/**
 * @api [post] /api/v1/adminIntersections/publication/{artifactId}/{publicationId}
 * summary: Create an association between an artifact and a publication
 * tags:
 *   - Intersections
 * parameters:
 *   - in: path
 *     name: artifactId
 *     schema:
 *       type: integer
 *     description: The artifact ID
 *   - in: path
 *     name: publicationId
 *     schema:
 *       type: integer
 *     description: The publication ID
 * responses:
 *   201:
 *     description: confirmation of success
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/ConfirmationOfSuccess"
 */
router.post('/publication/:artifactId/:publicationId', (request, response) => {
    const artifactId = parseInt(request.params.artifactId)
    const publicationId = parseInt(request.params.publicationId)
    adminIntersectionsDB.addPublicationIntersection(artifactId, publicationId, (error, results) => {
        if (error) {
            logger.error("failed to add publication intersection between artifact %d and publication %d: %s", artifactId, publicationId, error)
            response.status(500).json({
                error: "Internal Server Error"
            })
        } else {
            response.status(201).json({
                ok: true
            })
        }
    })
})

// ADVOCACY GROUP ------------------------

/**
 * @api [delete] /api/v1/adminIntersections/advocacyGroup/{artifactId}/{advocacyGroupId}
 * summary: Delete a single intersection between an artifact and an advocacy group
 * tags:
 *   - Intersections
 * parameters:
 *   - in: path
 *     name: artifactId
 *     schema:
 *       type: integer
 *     description: The artifact ID
 *   - in: path
 *     name: advocacyGroupId
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
 */
router.delete('/advocacyGroup/:artifactId/:advocacyGroupId', (request, response) => {
    const artifactId = parseInt(request.params.artifactId)
    const advocacyGroupId = parseInt(request.params.advocacyGroupId)
    adminIntersectionsDB.removeSingleAdvocacyGroupIntersection(artifactId, advocacyGroupId, (error, results) => {
        if (error) {
            logger.error("failed to remove advocacy group intersection between artifact %d and advocacy group %d: %s", artifactId, advocacyGroupId, error)
            response.status(500).json({
                error: "Internal Server Error"
            })
        } else {
            response.status(200).json({
                ok: true
            })
        }
    })
})

/**
 * @api [delete] /api/v1/adminIntersections/advocacyGroup/{artifactId}
 * summary: Delete all advocacy group intersections for an artifact
 * tags:
 *   - Intersections
 * parameters:
 *   - in: path
 *     name: artifactId
 *     schema:
 *       type: integer
 *     description: The artifact ID
 * responses:
 *   200:
 *     description: confirmation of success
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/ConfirmationOfSuccess"
 */
router.delete('/advocacyGroup/:artifactId', (request, response) => {
    const artifactId = parseInt(request.params.artifactId)
    adminIntersectionsDB.removeAllAdvocacyGroupIntersections(artifactId, (error, results) => {
        if (error) {
            logger.error("failed to remove all advocacy group intersections for artifact %d: %s", artifactId, error)
            response.status(500).json({
                error: "Internal Server Error"
            })
        } else {
            response.status(200).json({
                ok: true
            })
        }
    })
})

/**
 * @api [post] /api/v1/adminIntersections/advocacyGroup/{artifactId}/{advocacyGroupId}
 * summary: Create an association between an artifact and an advocacy group
 * tags:
 *   - Intersections
 * parameters:
 *   - in: path
 *     name: artifactId
 *     schema:
 *       type: integer
 *     description: The artifact ID
 *   - in: path
 *     name: advocacyGroupId
 *     schema:
 *       type: integer
 *     description: The advocacy group ID
 * responses:
 *   201:
 *     description: confirmation of success
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/ConfirmationOfSuccess"
 */
router.post('/advocacyGroup/:artifactId/:advocacyGroupId', (request, response) => {
    const artifactId = parseInt(request.params.artifactId)
    const advocacyGroupId = parseInt(request.params.advocacyGroupId)
    adminIntersectionsDB.addAdvocacyGroupIntersection(artifactId, advocacyGroupId, (error, results) => {
        if (error) {
            logger.error("failed to add advocacy group intersection between artifact %d and advocacy group %d: %s", artifactId, advocacyGroupId, error)
            response.status(500).json({
                error: "Internal Server Error"
            })
        } else {
            response.status(201).json({
                ok: true
            })
        }
    })
})

// VIDEO TESTIMONIAL ------------------------

/**
 * @api [delete] /api/v1/adminIntersections/videoTestimonial/{artifactId}/{videoTestimonialId}
 * summary: Delete a single intersection between an artifact and a video testimonial
 * tags:
 *   - Intersections
 * parameters:
 *   - in: path
 *     name: artifactId
 *     schema:
 *       type: integer
 *     description: The artifact ID
 *   - in: path
 *     name: videoTestimonialId
 *     schema:
 *       type: integer
 *     description: The video testimonial ID
 * responses:
 *   200:
 *     description: confirmation of success
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/ConfirmationOfSuccess"
 */
router.delete('/videoTestimonial/:artifactId/:videoTestimonialId', (request, response) => {
    const artifactId = parseInt(request.params.artifactId)
    const videoTestimonialId = parseInt(request.params.videoTestimonialId)
    adminIntersectionsDB.removeSingleVideoTestimonialIntersection(artifactId, videoTestimonialId, (error, results) => {
        if (error) {
            logger.error("failed to remove video testimonial intersection between artifact %d and video testimonial %d: %s", artifactId, videoTestimonialId, error)
            response.status(500).json({
                error: "Internal Server Error"
            })
        } else {
            response.status(200).json({
                ok: true
            })
        }
    })
})

/**
 * @api [delete] /api/v1/adminIntersections/videoTestimonial/{artifactId}
 * summary: Delete all video testimonial intersections for an artifact
 * tags:
 *   - Intersections
 * parameters:
 *   - in: path
 *     name: artifactId
 *     schema:
 *       type: integer
 *     description: The artifact ID
 * responses:
 *   200:
 *     description: confirmation of success
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/ConfirmationOfSuccess"
 */
router.delete('/category/:artifactId', (request, response) => {
    const artifactId = parseInt(request.params.artifactId)
    adminIntersectionsDB.removeAllVideoTestimonialIntersections(artifactId, (error, results) => {
        if (error) {
            logger.error("failed to remove all video testimonial intersections for artifact %d: %s", artifactId, error)
            response.status(500).json({
                error: "Internal Server Error"
            })
        } else {
            response.status(200).json({
                ok: true
            })
        }
    })
})

/**
 * @api [post] /api/v1/adminIntersections/videoTestimonial/{artifactId}/{videoTestimonialId}
 * summary: Create an association between an artifact and a video testimonial
 * tags:
 *   - Intersections
 * parameters:
 *   - in: path
 *     name: artifactId
 *     schema:
 *       type: integer
 *     description: The artifact ID
 *   - in: path
 *     name: videoTestimonialId
 *     schema:
 *       type: integer
 *     description: The video testimonial ID
 * responses:
 *   201:
 *     description: confirmation of success
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/ConfirmationOfSuccess"
 */
router.post('/videoTestimonial/:artifactId/:videoTestimonialId', (request, response) => {
    const artifactId = parseInt(request.params.artifactId)
    const videoTestimonialId = parseInt(request.params.videoTestimonialId)
    adminIntersectionsDB.addVideoTestimonialIntersection(artifactId, videoTestimonialId, (error, results) => {
        if (error) {
            logger.error("failed to add video testimonial intersection between artifact %d and video testimonial %d: %s", artifactId, videoTestimonialId, error)
            response.status(500).json({
                error: "Internal Server Error"
            })
        } else {
            response.status(201).json({
                ok: true
            })
        }
    })
})

// RELATED ARTIFACT ------------------------

/**
 * @api [delete] /api/v1/adminIntersections/relatedArtifact/{artifactId}/{relatedArtifactId}
 * summary: Delete a single intersection between an artifact its related artifact
 * tags:
 *   - Intersections
 * parameters:
 *   - in: path
 *     name: artifactId
 *     schema:
 *       type: integer
 *     description: The artifact ID
 *   - in: path
 *     name: relatedArtifactId
 *     schema:
 *       type: integer
 *     description: The ID of the artifact to which the first artifact is related
 * responses:
 *   200:
 *     description: confirmation of success
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/ConfirmationOfSuccess"
 */
router.delete('/relatedArtifact/:artifactId/:relatedArtifactId', (request, response) => {
    const artifactId = parseInt(request.params.artifactId)
    const relatedArtifactId = parseInt(request.params.relatedArtifactId)
    adminIntersectionsDB.removeSingleRelatedArtifactIntersection(artifactId, relatedArtifactId, (error, results) => {
        if (error) {
            logger.error("failed to remove related artifact intersection between artifact %d and related artifact %d: %s", artifactId, relatedArtifactId, error)
            response.status(500).json({
                error: "Internal Server Error"
            })
        } else {
            response.status(200).json({
                ok: true
            })
        }
    })
})

/**
 * @api [delete] /api/v1/adminIntersections/relatedArtifact/{artifactId}
 * summary: Delete all related artifact intersections for an artifact
 * tags:
 *   - Intersections
 * parameters:
 *   - in: path
 *     name: artifactId
 *     schema:
 *       type: integer
 *     description: The artifact ID
 * responses:
 *   200:
 *     description: confirmation of success
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/ConfirmationOfSuccess"
 */
router.delete('/relatedArtifact/:artifactId', (request, response) => {
    const artifactId = parseInt(request.params.artifactId)
    adminIntersectionsDB.removeAllRelatedArtifactIntersections(artifactId, (error, results) => {
        if (error) {
            logger.error("failed to remove all related artifact intersections for artifact %d: %s", artifactId, error)
            response.status(500).json({
                error: "Internal Server Error"
            })
        } else {
            response.status(200).json({
                ok: true
            })
        }
    })
})

/**
 * @api [post] /api/v1/adminIntersections/relatedArtifact/{artifactId}/{relatedArtifact}
 * summary: Create an association between an artifact and another (related) artifact
 * tags:
 *   - Intersections
 * parameters:
 *   - in: path
 *     name: artifactId
 *     schema:
 *       type: integer
 *     description: The artifact ID
 *   - in: path
 *     name: relatedArtifactId
 *     schema:
 *       type: integer
 *     description: The ID of the artifact being designated as related to the first artifact
 * responses:
 *   201:
 *     description: confirmation of success
 *     content:
 *       application/json:
 *         schema:
 *           $ref: "#/components/schemas/ConfirmationOfSuccess"
 */
router.post('/relatedArtifact/:artifactId/:relatedArtifactId', (request, response) => {
    const artifactId = parseInt(request.params.artifactId)
    const relatedArtifactId = parseInt(request.params.relatedArtifactId)
    adminIntersectionsDB.addRelatedArtifactIntersection(artifactId, relatedArtifactId, (error, results) => {
        if (error) {
            logger.error("failed to add related artifact intersection between artifact %d and related artifact %d: %s", artifactId, relatedArtifactId, error)
            response.status(500).json({
                error: "Internal Server Error"
            })
        } else {
            response.status(201).json({
                ok: true
            })
        }
    })
})

module.exports = router
