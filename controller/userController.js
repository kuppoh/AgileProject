const { promiseUserPool } = require('../config/database');

// MySQL connection

const getUserByEmailIdAndPassword = async (email, password) => {
  const [rows] = await promiseUserPool.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
  if (rows.length > 0) {
    return rows[0];
  }
  return null;
};

const getUserById = async (id) => {
  const [rows] = await promiseUserPool.query('SELECT * FROM users WHERE id = ?', [id]);
  if (rows.length > 0) {
    return rows[0];
  }
  return null;
};

module.exports = {
  getUserByEmailIdAndPassword,
  getUserById,
};
