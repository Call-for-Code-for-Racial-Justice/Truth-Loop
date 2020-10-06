const logger = require('../logger').logger;
const advocacyGroupDB = require('../db/advocacy_group');

const getAdvocacyGroups = (request, response) => {
  advocacyGroupDB.getAdvocacyGroups((error, results) => {
      if (error) {
          logger.error("failed to retrieve advocacy groups: %s", error)
          response.status(500).json({
              error: "Internal Server Error"
          })
      } else {
          response.status(200).json(results.rows)
      }
  })
}

const getAdvocacyGroupById = (request, response) => {
  const id = parseInt(request.params.id)
  advocacyGroupDB.getAdvocacyGroupById(id, (error, results) => {
      if (error) {
          logger.error("fail to retrieve advocacy group with id %d: %s", id, error)
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

const createAdvocacyGroup = (request, response) => {
    advocacyGroupDB.createAdvocacyGroup(request.body, (error, results) => {
        if (error) {
            logger.error("fail to create advocacy group: %s", error)
            response.status(500).json({
                error: "Internal Server Error"
            })
        } else {
            response.status(201).json(results.rows[0])
        }
    })
}

const updateAdvocacyGroup = (request, response) => {
  const id = parseInt(request.params.id)
  advocacyGroupDB.updateAdvocacyGroup(id, request.body, (error, results) => {
      if (error) {
          logger.error("fail to update advocacy group with id %d: %s", id, error)
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

const deleteAdvocacyGroup = (request, response) => {
  const id = parseInt(request.params.id)
  advocacyGroupDB.deleteAdvocacyGroup(id, (error, results) => {
      if (error) {
          logger.error("fail to delete advocacy group with id %d: %s", id, error)
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
  getAdvocacyGroups,
  getAdvocacyGroupById,
  createAdvocacyGroup,
  updateAdvocacyGroup,
  deleteAdvocacyGroup,
}
