const pool = require('./db_pool').pool

const getArtifactsWithVideoCount = (callback) => {
    pool.query(
        'SELECT la.id, la.title, la.summary, la.date_introduced, coalesce(vid_counts.vid_count::int, 0) vid_count from legislative_artifact la left join (select artifact_id, count(*) as vid_count from artifact_video_testimonial avt group by artifact_id) as vid_counts on la.id = vid_counts.vid_count order by la.id',
        callback
    )
}

// -----------------------------------------------------------------------------------------------
// full intersection listings for decorating lists of artifacts ----------------------------------
// -----------------------------------------------------------------------------------------------

const getArtifactCategoryIntersections = (callback) => {
    pool.query(
        'SELECT ac.artifact_id, c.id, c."name" from artifact_category ac left join category c on c.id = ac.category_id order by ac.artifact_id, c.id',
        callback
    )
}

const getArtifactGeoDefIntersections = (callback) => {
    pool.query(
        'SELECT agd.artifact_id, gd.id, gd."name", gd.short_name_ui, gd.description from artifact_geospatial_definition agd left join geospatial_definition gd on gd.id = agd.geospatial_definition_id order by agd.artifact_id, gd.id',
        callback
    )
}

// -----------------------------------------------------------------------------------------------
// parameterized intersection listings for particular artifact -----------------------------------
// -----------------------------------------------------------------------------------------------

const getCategoryIntersectionsForArtifact = (id, callback) => {
    pool.query(
        'SELECT c.id, c."name" from category c left join artifact_category ac on ac.category_id = c.id where ac.artifact_id = $1',
        [id],
        callback
    )
}

const getGeoDefinitionsForArtifact = (id, callback) => {
    pool.query(
        'SELECT gd.id, gd."name", gd.short_name_ui, gd.description from geospatial_definition gd left join artifact_geospatial_definition agd on agd.geospatial_definition_id = gd.id where agd.artifact_id = $1',
        [id],
        callback
    )
}

const getOfficialsForArtifact = (id, callback) => {
    pool.query(
        'SELECT o.id, o."name", o.title, o.email_address, ao.role_in_artifact, o.phone_number, o.website_url from official o left join artifact_official ao on ao.official_id = o.id where ao.artifact_id = $1',
        [id],
        callback
    )
}

const getPublicationsForArrtifact = (id, callback) => {
    pool.query(
        'SELECT p.id, p.title, p.description, p.link from "publication" p left join artifact_publication ap on ap.publication_id = p.id where ap.artifact_id = $1',
        [id],
        callback
    )
}

const getAdvocacyGroupsForArtifact = (id, callback) => {
    pool.query(
        'SELECT ag.id, ag."name", ag.description, ag.email_address, ag.phone_number, ag.website_url from advocacy_group ag left join artifact_advocacy_group aag on aag.advocacy_group_id = ag.id where aag.artifact_id = $1',
        [id],
        callback
    )
}

const getVideoTestimonialsForArtifact = (id, callback) => {
    pool.query(
        'SELECT vt.id, vt.subject, vt."comment", vt.video_cms_id , vt.privacy_stmt_ack from video_testimonial vt left join artifact_video_testimonial avt on avt.video_testimonial_id = vt.id where avt.artifact_id = $1',
        [id],
        callback
    )
}

const getRelatedArtifactsForArtifact = (id, callback) => {
    pool.query(
        'SELECT la.id, la.title from legislative_artifact la left join artifact_related_artifact ara on ara.artifact_id_2 = la.id where ara.artifact_id_1 = $1',
        [id],
        callback
    )
}

module.exports = {
    getArtifactsWithVideoCount,
    getArtifactCategoryIntersections,
    getArtifactGeoDefIntersections,
    getCategoryIntersectionsForArtifact,
    getGeoDefinitionsForArtifact,
    getOfficialsForArtifact,
    getPublicationsForArrtifact,
    getAdvocacyGroupsForArtifact,
    getVideoTestimonialsForArtifact,
    getRelatedArtifactsForArtifact
}
