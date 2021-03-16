const pool = require('./db_pool').pool

const createUser = (user, callback) => {
  pool.query(
    'INSERT INTO users (username, password) VALUES ($1, $2);',
    [user.username, user.password],
    callback
  )
};

const updateUser = (newUser, oldUser, callback) => {
  pool.query(
    'UPDATE users SET username=$1, password=$2 WHERE username=$3',
    [newUser.username, newUser.password, oldUser.username],
    callback
  )
};

const removeUser = (user, callback) => {
  pool.query(
    'DELETE FROM users WHERE username=$1;',
    [user.username],
    callback
  )
};

const getUserByUsername = (username, callback) => {
  pool.query(
    'SELECT * FROM users WHERE username=$1;',
    [username],
    callback
  )
}

const getUserById = (id, callback) => {
  pool.query(
    'SELECT * FROM users WHERE id=$1;',
    [id],
    callback
  )
}

module.exports = {
  createUser,
  updateUser,
  removeUser,
  getUserByUsername,
  getUserById
}