const logger = require('../logger').logger
const intersectionsDB = require('../db/intersections_for_list')
const artifactDB = require('../db/legislative_artifact')

const getLegislativeArtifactsForListUnfiltered = (request, response) => {
    let pGetArtifacts = new Promise(function (resolve, reject) {
        artifactDB.getLegislativeArtifacts((error, results) => {
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
}

module.exports = {
    getLegislativeArtifactsForListUnfiltered
}
