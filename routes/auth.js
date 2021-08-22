/*
  Route: /api/login

*/
const { Router } = require('express');
const {check} = require('express-validator');
const { validateField } = require('../middlewares/validate-fields');

const {login,googleSignin, renewToken} = require('../controllers/auth');
const { validateJwt } = require('../middlewares/validate-jwt');

const router = Router();

router.post( '/', [
  check('email', 'Email Requiered').isEmail(),
  check('password', 'Password Requiered').not().isEmpty(),
  validateField,
], login);

router.post( '/google', [
  check('token', 'Token Requiered').not().isEmpty(),
  validateField,
], googleSignin);

router.get( '/renew',validateJwt, renewToken);

module.exports = router;