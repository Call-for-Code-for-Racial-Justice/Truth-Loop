const pool = require('./db_pool').pool

const getLegislativeArtifacts = (callback) => {
    pool.query(
        'SELECT * FROM legislative_artifact ORDER BY id ASC',
        callback
    )
}

const getLegislativeArtifactById = (id, callback) => {
    pool.query(
        'SELECT * FROM legislative_artifact WHERE id = $1',
        [id],
        callback
    )
}

const createLegislativeArtifact = (data, callback) => {
    // legislative artifacts are created with no video_cms_channel_id //
    pool.query(
        'INSERT INTO legislative_artifact (title, summary, link_to_full_text, date_introduced, status) VALUES ($1, $2, $3, $4, $5) returning id',
        [data.title, data.summary, data.link_to_full_text, data.date_introduced, data.status],
        callback
    )
}

const updateLegislativeArtifact = (id, data, callback) => {
    pool.query(
        'UPDATE legislative_artifact SET title = $1, summary = $2, link_to_full_text = $3, date_introduced = $4, status=$5 , video_cms_channel_id=$6, updated = now() WHERE id = $7',
        [data.title, data.summary, data.link_to_full_text, data.date_introduced, data.status, data.video_cms_channel_id, id],
        callback
    )
}

const deleteLegislativeArtifact = (id, callback) => {
    pool.query(
        'DELETE FROM legislative_artifact WHERE id = $1',
        [id],
        callback
    )
}

module.exports = {
    getLegislativeArtifacts,
    getLegislativeArtifactById,
    createLegislativeArtifact,
    updateLegislativeArtifact,
    deleteLegislativeArtifact,
}
