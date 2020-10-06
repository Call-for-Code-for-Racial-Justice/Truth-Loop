const logger = require('../logger').logger
const adminIntersectionsDB = require('../db/admin_intersections');

// CATEGORY ------------------------

const removeSingleCategoryIntersection = (request, response) => {
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
}

const removeAllCategoryIntersections = (request, response) => {
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
}

const addCategoryIntersection = (request, response) => {
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
}

// GEOSPATIAL DEFINITION ------------------------

const removeSingleGeoDefIntersection = (request, response) => {
    const artifactId = parseInt(request.params.artifactId)
    const geoDefId = parseInt(request.params.geoDefId)
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
}

const removeAllGeoDefIntersections = (request, response) => {
    const artifactId = parseInt(request.params.artifactId)
    adminIntersectionsDB.removeAllCategoryIntersections(artifactId, (error, results) => {
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
}

const addGeoDefIntersection = (request, response) => {
    const artifactId = parseInt(request.params.artifactId)
    const geoDefId = parseInt(request.params.geoDefId)
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
}

// OFFICIAL ------------------------

const removeSingleOfficialIntersection = (request, response) => {
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
}

const removeAllOfficialIntersections = (request, response) => {
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
}

const addOfficialIntersection = (request, response) => {
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
}

// PUBLICATION ------------------------

const removeSinglePublicationIntersection = (request, response) => {
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
}

const removeAllPublicationIntersections = (request, response) => {
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
}

const addPublicationIntersection = (request, response) => {
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
}

// ADVOCACY GROUP ------------------------

const removeSingleAdvocacyGroupIntersection = (request, response) => {
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
}

const removeAllAdvocacyGroupIntersections = (request, response) => {
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
}

const addAdvocacyGroupIntersection = (request, response) => {
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
}

// VIDEO TESTIMONIAL ------------------------

const removeSingleVideoTestimonialIntersection = (request, response) => {
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
}

const removeAllVideoTestimonialIntersections = (request, response) => {
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
}

const addVideoTestimonialIntersection = (request, response) => {
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
}

// RELATED ARTIFACT ------------------------

const removeSingleRelatedArtifactIntersection = (request, response) => {
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
}

const removeAllRelatedArtifactIntersections = (request, response) => {
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
}

const addRelatedArtifactIntersection = (request, response) => {
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
}

module.exports = {
    removeSingleCategoryIntersection,
    removeAllCategoryIntersections,
    addCategoryIntersection,
    removeSingleGeoDefIntersection,
    removeAllGeoDefIntersections,
    addGeoDefIntersection,
    removeSingleOfficialIntersection,
    removeAllOfficialIntersections,
    addOfficialIntersection,
    removeSinglePublicationIntersection,
    removeAllPublicationIntersections,
    addPublicationIntersection,
    removeSingleAdvocacyGroupIntersection,
    removeAllAdvocacyGroupIntersections,
    addAdvocacyGroupIntersection,
    removeSingleVideoTestimonialIntersection,
    removeAllVideoTestimonialIntersections,
    addVideoTestimonialIntersection,
    removeSingleRelatedArtifactIntersection,
    removeAllRelatedArtifactIntersections,
    addRelatedArtifactIntersection,
}
