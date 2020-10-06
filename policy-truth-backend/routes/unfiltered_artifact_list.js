const logger = require('../logger').logger
const intersectionsDB = require('../db/intersections_for_list')

const getLegislativeArtifactsForListUnfiltered = (request, response) => {
    let pGetArtifactsWithVideoCount = new Promise(function (resolve, reject) {
        intersectionsDB.getArtifactsWithVideoCount((error, results) => {
            if (error) {
                reject(error)
            } else {
                if (results.rows && results.rows.length > 0) {
                    resolve(results.rows)
                } else {
                    reject("Legislative Artifacts Not Found")
                }
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
    Promise.all([
        pGetArtifactsWithVideoCount,
        pGetArtifactCategoryIntersections,
        pGetArtifactGeoDefinitionIntersections
    ]).then(function (results) {
        // first query gets LAs and video counts
        var overview = results[0]
        var categories = results[1]
        var geoDefs = results[2]
        // second one gets an array with the categories each LA has, like:
        // [
        //     { artifact_id: 1, category_id: 1, name: 'Category 1' },
        //     { artifact_id: 1, category_id: 2, name: 'Category 2' },
        //     { artifact_id: 1, category_id: 3, name: 'Category 3' },
        //     { artifact_id: 1, category_id: 4, name: 'Category 4' },
        //     { artifact_id: 2, category_id: 1, name: 'Category 1' },
        //     { artifact_id: 2, category_id: 2, name: 'Category 2' }
        // ]
        // so the goal is to insert the categories into arrays in the corresponding LA
        overview.forEach(function(artifact) {
            artifact.categories = []
            // go through each artifact
            categories.forEach(function(artifactCategory) {
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
            geoDefs.forEach(function(artifactGeoDef) {
                if (artifactGeoDef.artifact_id == artifact.id) {
                    let copyOfArtifactGeoDef = Object.assign({}, artifactGeoDef)
                    delete copyOfArtifactGeoDef.artifact_id;
                    artifact.geospatial_pertinence.push(copyOfArtifactGeoDef)
                }
            })
        })
        response.status(200).json(overview)
    }).catch(error => {
        logger.error("failed to get overview for policies: %s", error)
        response.status(500).json({
            error: "Internal Server Error"
        })
    })
}

module.exports = {
    getLegislativeArtifactsForListUnfiltered
}
