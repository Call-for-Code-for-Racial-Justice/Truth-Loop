const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var express = require('express');
var router = express.Router();
const User = require('../db/users');
const Token = require('../db/tokens');
const { logger } = require('../logger');


const ACCESS_TOKEN_SECRET = fs.readFileSync(path.join(__dirname,'..','secrets','ACCESS_TOKEN_SECRET.txt'), 'utf8')
const REFRESH_TOKEN_SECRET = fs.readFileSync(path.join(__dirname,'..','secrets','REFRESH_TOKEN_SECRET.txt'), 'utf8')

const generateAccessToken = (id, username, cb) => {
  try{
    let accessToken = jwt.sign(
      { user: {id, username} },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "10m", }
    );
    cb(null, accessToken);
  } catch (error) {
    cb(error, null);
  }
};

const generateRefreshToken = (id, username, cb) => {
  try{
    let refreshToken = jwt.sign(
      { user: {id, username} },
      REFRESH_TOKEN_SECRET,
      { expiresIn: "1d", }
    );
    cb(null, refreshToken);
  } catch (error) {
    cb(error, null);
  }
};

router.post('/signup', (req, res) => {
  User.getUserByUsername(req.body.username, (error, results) => {
    if(error){
      logger.error("failed to retrive users: %s", error);
      res.status(500).json({
        error: "Internal Server Error"
      })
    } else {
      if(results.rows.length==0){
        User.createUser(req.body, (error, results) => {
          if(error){
            logger.error("failed to retrive users: %s", error);
            res.status(500).json({
              error: "Internal Server Error"
            })
          } else {
            User.getUserByUsername(req.body.username, (error, results) => {
              if(error){
                logger.error("failed to retrive users: %s", error);
                res.status(500).json({
                  error: "Internal Server Error"
                })
              } else {
                var accessToken;
                var refreshToken;
                let promise = new Promise(function(resolve, reject){
                  generateAccessToken(results.rows[0].id, results.rows[0].username, function(error, result){
                    if(error){
                      reject(error);
                    } else {
                      resolve(result);
                    }
                  })
                })
                promise.then(function(value){
                  accessToken = value;
                  return new Promise((resolve, reject) => {generateRefreshToken(results.rows[0].id, results.rows[0].username, function(error, result){
                    if(error){
                      reject(error);
                    } else {
                      resolve(result);
                    }
                  })})
                }).then(function(value){
                  refreshToken = value;
                  return new Promise((resolve, reject) => {
                    Token.addRefreshToken(value, (error, results) => {
                      if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                    })
                  })
                }).then(function(value){
                  res.status(200).json({
                    accessToken: accessToken,
                    refreshToken: refreshToken
                  })
                }).catch(function(error){
                  res.status(500).json({
                    error: "Internal server error"
                  })
                })
              }
            })
          }
        })
      } else {
        res.status(401).send('Username is already taken!');
      }
    }
  })
});


// exports.signup = async (req, res) => {
//   try {
//     //check if username is already taken:
//     let user = await User.findOne({ username: req.body.username });
//     if (user) {
//       return res.status(400).json({ error: "Username taken." });
//     } else {
//       //create new user and generate a pair of tokens and send
//       user = await new User(req.body).save();
//       let accessToken = await user.createAccessToken();
//       let refreshToken = await user.createRefreshToken();

//       return res.status(201).json({ accessToken, refreshToken });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal Server Error!" });
//   }
// };
// exports.login = async (req, res) => {
//   try {
//     //check if user exists in database:
//     let user = await User.findOne({ username: req.body.username });
//     //send error if no user found:
//     if (!user) {
//       return res.status(404).json({ error: "No user found!" });
//     } else {
//       //check if password is valid:
//       let valid = await bcrypt.compare(req.body.password, user.password);
//       if (valid) {
//         //generate a pair of tokens if valid and send
//         let accessToken = await user.createAccessToken();
//         let refreshToken = await user.createRefreshToken();

//         return res.status(201).json({ accessToken, refreshToken });
//       } else {
//         //send error if password is invalid
//         return res.status(401).json({ error: "Invalid password!" });
//       }
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal Server Error!" });
//   }
// };
// exports.generateRefreshToken = async (req, res) => {
//   try {
//     //get refreshToken
//     const { refreshToken } = req.body;
//     //send error if no refreshToken is sent
//     if (!refreshToken) {
//       return res.status(403).json({ error: "Access denied,token missing!" });
//     } else {
//       //query for the token to check if it is valid:
//       const tokenDoc = await Token.findOne({ token: refreshToken });
//       //send error if no token found:
//       if (!tokenDoc) {
//         return res.status(401).json({ error: "Token expired!" });
//       } else {
//         //extract payload from refresh token and generate a new access token and send it
//         const payload = jwt.verify(tokenDoc.token, REFRESH_TOKEN_SECRET);
//         const accessToken = jwt.sign({ user: payload }, ACCESS_TOKEN_SECRET, {
//           expiresIn: "10m",
//         });
//         return res.status(200).json({ accessToken });
//       }
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal Server Error!" });
//   }
// };
// exports.logout = async (req, res) => {
//   try {
//     //delete the refresh token saved in database:
//     const { refreshToken } = req.body;
//     await Token.findOneAndDelete({ token: refreshToken });
//     return res.status(200).json({ success: "User logged out!" });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: "Internal Server Error!" });
//   }
// };

module.exports = router