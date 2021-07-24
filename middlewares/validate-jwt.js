const { response } = require('express');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

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

module.exports = {
  validateJwt
}