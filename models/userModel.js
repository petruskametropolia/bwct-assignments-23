'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllUsers = async () => {
  try {
    const sql = `SELECT user_id, name, email FROM wop_user`;
    const [rows] = await promisePool.query(sql);
    // console.log(rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    throw new Error('sql query failed');
  }
};

const getUserById = async (user_id) => {
  try {
    const sql = `SELECT wop_user.* FROM wop_user
                WHERE user_id = ?`;
    const [rows] = await promisePool.query(sql, [user_id]);
    // console.log(rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    throw new Error('sql query failed');
  }
};

const insertUser = async (user) => {
  try {
    const sql = `INSERT INTO wop_user VALUES (?, ?, ?, ?);`;
    const [rows] = await promisePool.query(sql, [
      null, // id is auto_increment
      user.name,
      user.email,
      user.password,
    ]);
    // console.log(rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    throw new Error('sql insert user failed');
  }
};
const getUserLogin = async (email) => {
  console.log('get user login for', email);
  try {
    const [rows] = await promisePool.execute(
        'SELECT * FROM wop_user WHERE email = ?;',
        [email]);
    console.log('get user login rows', rows);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

// TODO: add sql function for get/:id, put & post queries

module.exports = {
  getAllUsers,getUserById,insertUser,getUserLogin,
};