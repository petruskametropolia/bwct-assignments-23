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

// TODO: add sql function for get/:id, put & post queries

module.exports = {
  getAllUsers,
};