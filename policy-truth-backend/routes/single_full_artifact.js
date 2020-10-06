const logger = require('../logger').logger
const artifactDB = require('../db/legislative_artifact')
const intersectionsDB = require('../db/intersections_for_list')

const getSingleFullLegislativeArtifact = (request, response) => {
    const id = parseInt(request.params.id)

    let pGetArtifact = new Promise(function (resolve, reject) {
        artifactDB.getLegislativeArtifactById(id, (error, results) => {
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
        overview.geospatial_definitions = results[2]
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
}

module.exports = {
    getSingleFullLegislativeArtifact
}
