const { response } = require('express');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const Users = require('../models/users');

const validateJwt = (req, res = response, next) => {
  // Read token
  const token = req.header('x-token');
  console.log('token', token);

  if(!token) {
    return res.status(400).json({
      ok: false,
      msg: "JWT Required"
    })
  }

  try {

    const {uid} = jwt.verify(token, process.env.JWT_SECRET);
    console.log('uid', uid);

    req.uid = uid;
    
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      ok: false,
      msg: "Token no valid"
    });
  }
}

const validAdminRole = async (req, res = response, next) => {
  try {
    const uid = req.uid;

    const user = await Users.findById(uid);

    if(!user) {
      return res.status(404).json({
        ok: false,
        msg: "User not exist"
      })
    }

    if(user.role !== 'ADMIN_ROLE') {
      return res.status(403).json({
        ok: false,
        msg: "The user does not have privileges to perform this action"
      })
    }
    
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Unexpected error, check logs"
    });
  }
}

const validAdminRoleOrUser = async (req, res = response, next) => {
  try {
    const uid = req.uid;
    const id = req.params.id;

    const user = await Users.findById(uid);

    if(!user) {
      return res.status(404).json({
        ok: false,
        msg: "User not exist"
      })
    }

    if(user.role === 'ADMIN_ROLE' || uid === id) {
      next();
    } else {
      return res.status(403).json({
        ok: false,
        msg: "The user does not have privileges to perform this action"
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Unexpected error, check logs"
    });
  }
}

module.exports = {
  validateJwt,
  validAdminRole,
  validAdminRoleOrUser
}