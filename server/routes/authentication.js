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
            logger.error("failed to create users: %s", error);
            res.status(500).json({
              error: "Internal Server Error"
            })
          } else {
            User.getUserByUsername(req.body.username, (error, results) => {
              if(error){
                logger.error("failed to retrive user id: %s", error);
                res.status(500).json({
                  error: "Internal Server Error"
                })
              } else {
                var accessToken;
                var refreshToken;
                generateAccessToken(results.rows[0].id, results.rows[0].username, function(error, result){
                  if(error){
                    logger.error("failed to generate access token: %s", error);
                    res.status(500).json({
                      error: "Internal Server Error"
                    })
                  } else {
                    accessToken = result;
                    generateRefreshToken(results.rows[0].id, results.rows[0].username, function(error, result){
                      if(error){
                        logger.error("failed to generate refresh token: %s", error);
                        res.status(500).json({
                          error: "Internal Server Error"
                        })
                      } else {
                        refreshToken = result;
                        Token.addRefreshToken(refreshToken, function(error, results){
                          if(error){
                            logger.error("failed to save refresh token: %s", error);
                            res.status(500).json({
                              error: "Internal Server Error"
                            })
                          } else {
                            res.cookie('accessToken', accessToken, { maxAge: 600000, httpOnly: true });
                            res.status(200).json({
                              accessToken: accessToken,
                              refreshToken: refreshToken
                            })
                          }
                        })
                      }
                    })
                  }
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

router.post('/login', (req, res) => {
  User.getUserByUsername(req.body.username, (error, results) => {
    if(error){
      logger.error("failed to retrive users: %s", error);
      res.status(500).json({
        error: "Internal Server Error"
      })
    } else {
      if(results.rows.length==0){
        res.status(301).send("No such user exists");
      } else {
        bcrypt.compare(req.body.password, results.rows[0].password, function(err, result) {
          if(err){
            logger.error("failed to generate refresh token: %s", error);
            res.status(500).json({
              error: "Internal Server Error"
            })
          } else {
            if(result==true){
              var accessToken;
              var refreshToken;
              generateAccessToken(results.rows[0].id, results.rows[0].username, function(error, result){
                if(error){
                  logger.error("failed to generate access token: %s", error);
                  res.status(500).json({
                    error: "Internal Server Error"
                  })
                } else {
                  accessToken = result;
                  generateRefreshToken(results.rows[0].id, results.rows[0].username, function(error, result){
                    if(error){
                      logger.error("failed to generate refresh token: %s", error);
                      res.status(500).json({
                        error: "Internal Server Error"
                      })
                    } else {
                      refreshToken = result;
                      Token.addRefreshToken(refreshToken, function(error, results){
                        if(error){
                          logger.error("failed to save refresh token: %s", error);
                          res.status(500).json({
                            error: "Internal Server Error"
                          })
                        } else {
                          res.cookie('accessToken', accessToken, { maxAge: 600000, httpOnly: true });
                          res.status(200).json({
                            accessToken: accessToken,
                            refreshToken: refreshToken
                          })
                        }
                      })
                    }
                  })
                }
              })
            } else {
              res.status(301).send("Incorrect password!");
            }
          }
        });
      }
    }
  })
});

router.post('/generateAccessToken', (req, res) => {
  jwt.verify(req.body.refreshToken, REFRESH_TOKEN_SECRET, function(error, decode){
    if(error){
      logger.error("failed to retrive users: %s", error);
      res.status(500).json({
        error: "Internal Server Error"
      })
    } else {
      Token.getRefreshTokenStatus(req.body.refreshToken, function(error, results){
        if(error){
          logger.error("failed to retrive users: %s", error);
          res.status(500).json({
            error: "Internal Server Error"
          })
        } else {
          if(results.rows.length==0){
            res.status(301).send("Invalid refresh token.");
          } else {
            if(results.rows[0].status=='valid'){
              generateAccessToken(decode.user.id, decode.user.username, function(error, accessToken){
                if(error){
                  logger.error("failed to retrive users: %s", error);
                  res.status(500).json({
                    error: "Internal Server Error"
                  })
                } else {
                  res.cookie('accessToken', accessToken, { maxAge: 600000, httpOnly: true });
                  res.status(200).json({
                    accessToken: accessToken
                  })
                }
              })
            } else {
              res.status(301).send('The refresh token has been revoked please log in to issue a new one.');
            }
          }
        }
      })
    }
  })
})

router.post('/logout', (req, res) => {
  Token.revokeRefreshToken(req.body.refreshToken, function(error, results){
    if(error){
      logger.error("failed to retrive users: %s", error);
      res.status(500).json({
        error: "Internal Server Error"
      })
    } else {
      res.status(200).send("Successfully logged out.")
    }
  })
})

module.exports = router