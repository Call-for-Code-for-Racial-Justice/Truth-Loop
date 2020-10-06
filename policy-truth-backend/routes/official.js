const logger = require('../logger').logger;
const officialDB = require('../db/official');

const getOfficials = (request, response) => {
  officialDB.getOfficials((error, results) => {
      if (error) {
          logger.error("failed to retrieve officials: %s", error)
          response.status(500).json({
              error: "Internal Server Error"
          })
      } else {
          response.status(200).json(results.rows)
      }
  })
}

const getOfficialById = (request, response) => {
  const id = parseInt(request.params.id)
  officialDB.getOfficialById(id, (error, results) => {
      if (error) {
          logger.error("fail to retrieve official with id %d: %s", id, error)
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

const createOfficial = (request, response) => {
    officialDB.createOfficial(request.body, (error, results) => {
        if (error) {
            logger.error("fail to create official: %s", error)
            response.status(500).json({
                error: "Internal Server Error"
            })
        } else {
            response.status(201).json(results.rows[0])
        }
    })
}

const updateOfficial = (request, response) => {
  const id = parseInt(request.params.id)
  officialDB.updateOfficial(id, request.body, (error, results) => {
      if (error) {
          logger.error("fail to update official with id %d: %s", id, error)
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

const deleteOfficial = (request, response) => {
  const id = parseInt(request.params.id)
  officialDB.deleteOfficial(id, (error, results) => {
      if (error) {
          logger.error("fail to delete official with id %d: %s", id, error)
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
  getOfficials,
  getOfficialById,
  createOfficial,
  updateOfficial,
  deleteOfficial,
}
