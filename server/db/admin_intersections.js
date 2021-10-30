const pool = require('./db_pool').pool

// CATEGORY ------------------------

const removeSingleCategoryIntersection = (artifactId, categoryId, callback) => {
  pool.query(
    'DELETE FROM artifact_category where artifact_id=$1 and category_id=$2',
    [artifactId, categoryId],
    callback
  )
}

const removeAllCategoryIntersections = (id, callback) => {
  pool.query(
    'DELETE FROM artifact_category where artifact_id=$1',
    [id],
    callback
  )
}

const addCategoryIntersection = (artifactId, categoryId, callback) => {
  pool.query(
    'INSERT INTO artifact_category (artifact_id, category_id) VALUES($1, $2)',
    [artifactId, categoryId],
    callback
  )
}

// GEOSPATIAL DEFINITION ------------------------

const removeSingleGeoDefIntersection = (artifactId, geodefId, callback) => {
  pool.query(
    'DELETE FROM artifact_geospatial_definition where artifact_id=$1 and geospatial_definition_id=$2',
    [artifactId, geodefId],
    callback
  )
}

const removeAllGeoDefIntersections = (id, callback) => {
  pool.query(
    'DELETE FROM artifact_geospatial_definition where artifact_id=$1',
    [id],
    callback
  )
}

const addGeoDefIntersection = (artifactId, geodefId, callback) => {
  pool.query(
    'INSERT INTO artifact_geospatial_definition (artifact_id, geospatial_definition_id) VALUES($1, $2)',
    [artifactId, geodefId],
    callback
  )
}

// OFFICIAL ------------------------

const removeSingleOfficialIntersection = (artifactId, officialId, callback) => {
  pool.query(
    'DELETE FROM artifact_official where artifact_id=$1 and official_id=$2',
    [artifactId, officialId],
    callback
  )
}

const removeAllOfficialIntersections = (id, callback) => {
  pool.query(
    'DELETE FROM artifact_official where artifact_id=$1',
    [id],
    callback
  )
}

const addOfficialIntersection = (data, callback) => {
  pool.query(
    'INSERT INTO artifact_official (artifact_id, official_id, role_in_artifact, show_in_list) VALUES($1, $2, $3, $4)',
    [
      data.artifact_id,
      data.official_id,
      data.role_in_artifact,
      data.show_in_list,
    ],
    callback
  )
}

// PUBLICATION ------------------------

const removeSinglePublicationIntersection = (
  artifactId,
  publicationId,
  callback
) => {
  pool.query(
    'DELETE FROM artifact_publication where artifact_id=$1 and publication_id=$2',
    [artifactId, publicationId],
    callback
  )
}

const removeAllPublicationIntersections = (id, callback) => {
  pool.query(
    'DELETE FROM artifact_publication where artifact_id=$1',
    [id],
    callback
  )
}

const addPublicationIntersection = (artifactId, publicationId, callback) => {
  pool.query(
    'INSERT INTO artifact_publication (artifact_id, publication_id) VALUES($1, $2)',
    [artifactId, publicationId],
    callback
  )
}

// ADVOCACY GROUP ------------------------

const removeSingleAdvocacyGroupIntersection = (
  artifactId,
  advocacyGroupId,
  callback
) => {
  pool.query(
    'DELETE FROM artifact_advocacy_group where artifact_id=$1 and advocacy_group_id=$2',
    [artifactId, advocacyGroupId],
    callback
  )
}

const removeAllAdvocacyGroupIntersections = (id, callback) => {
  pool.query(
    'DELETE FROM artifact_advocacy_group where artifact_id=$1',
    [id],
    callback
  )
}

const addAdvocacyGroupIntersection = (
  artifactId,
  advocacyGroupId,
  callback
) => {
  pool.query(
    'INSERT INTO artifact_advocacy_group (artifact_id, advocacy_group_id) VALUES($1, $2)',
    [artifactId, advocacyGroupId],
    callback
  )
}

// VIDEO TESTIMONIAL ------------------------

const removeSingleVideoTestimonialIntersection = (
  artifactId,
  videoTestimonialId,
  callback
) => {
  pool.query(
    'DELETE FROM artifact_video_testimonial where artifact_id=$1 and video_testimonial_id=$2',
    [artifactId, videoTestimonialId],
    callback
  )
}

const removeAllVideoTestimonialIntersections = (id, callback) => {
  pool.query(
    'DELETE FROM artifact_video_testimonial where artifact_id=$1',
    [id],
    callback
  )
}

const addVideoTestimonialIntersection = (
  artifactId,
  videoTestimonialId,
  callback
) => {
  pool.query(
    'INSERT INTO artifact_video_testimonial (artifact_id, video_testimonial_id) VALUES($1, $2)',
    [artifactId, videoTestimonialId],
    callback
  )
}

// RELATED ARTIFACT ------------------------

const removeSingleRelatedArtifactIntersection = (
  artifactId,
  relatedArtifactId,
  callback
) => {
  pool.query(
    'DELETE FROM artifact_related_artifact where artifact_id_1=$1 and artifact_id_2=$2',
    [artifactId, relatedArtifactId],
    callback
  )
}

const removeAllRelatedArtifactIntersections = (id, callback) => {
  pool.query(
    'DELETE FROM artifact_related_artifact where artifact_id_1=$1 or artifact_id_2=$1',
    [id],
    callback
  )
}

const addRelatedArtifactIntersection = (
  artifactId,
  relatedArtifactId,
  callback
) => {
  pool.query(
    'INSERT INTO artifact_related_artifact (artifact_id_1, artifact_id_2) VALUES($1, $2)',
    [artifactId, relatedArtifactId],
    callback
  )
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
