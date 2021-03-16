const pool = require('./db_pool').pool

const addRefreshToken = (refreshToken, callback) => {
  pool.query(
    'INSERT INTO refresh_tokens (refresh_token, status) VALUES ($1, $2);',
    [refreshToken, 'valid'],
    callback
  )
};
const revokeRefreshToken = (refreshToken, callback) => {
  pool.query(
    'UPDATE refresh_tokens SET status=$1 WHERE refresh_token=$2;',
    ['invalid', refreshToken],
    callback
  )
};

const getRefreshTokenStatus = (refreshToken, callback) => {
  pool.query(
    'SELECT * FROM refresh_tokens WHERE refresh_token=$1;',
    [refreshToken],
    callback
  )
}

// const pruneRefreshToken;

module.exports = {
  addRefreshToken,
  revokeRefreshToken
}