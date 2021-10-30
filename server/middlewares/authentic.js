const fs = require('fs')
const jwt = require('jsonwebtoken')
const path = require('path')

const ACCESS_TOKEN_SECRET = fs.readFileSync(
  path.join(__dirname, '..', 'secrets', 'ACCESS_TOKEN_SECRET.txt'),
  'utf8'
)

const authentic = function (req, res, next) {
  if (req.cookies.accessToken == undefined) {
    // TODO:figure out how to properly implement express redirect
    // res.redirect('/auth/generateAccessToken')
    res.status(401).send('No valid access token provided.')
  } else {
    jwt.verify(
      req.cookies.accessToken,
      ACCESS_TOKEN_SECRET,
      function (error, decode) {
        if (error) {
          console.log(error)
          res.status(401).send('Invalid access token.')
        } else {
          req.user = decode.user
          next()
        }
      }
    )
  }
}

module.exports = {
  authentic,
}
