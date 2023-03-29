'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllUsers = async () => {
  try {
    const sql = `SELECT wop_user.* FROM wop_user`;
    const [rows] = await promisePool.query(sql);
    // console.log(rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    throw new Error('sql query failed');
  }
};
const getUserById = async (id) => {
  try {
    const sql = `SELECT wop_user.* FROM wop_user
                WHERE user_id = ?`;
    const [rows] = await promisePool.query(sql, [id]);
    // console.log(rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    throw new Error('sql query failed');
  }
};




const insertUser = async (user) => {
  try {
    const sql = `INSERT INTO wop_user VALUES (?, ?, ?,?);`;
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
    throw new Error('sql insert cat failed');
  }
};

const modifyUser = async (user) => {
  try {
    const sql = `UPDATE wop_user SET name=?, email=?
                WHERE user_id=?`;
    const [rows] = await promisePool.query(sql, [
      user.name,
      user.email,
    ]);
    // console.log(rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    throw new Error('sql update cat failed');
  }
};

// TODO: add sql function for get/:id, put & post queries

module.exports = {
  getAllUsers,insertUser,modifyUser,getUserById,
};