/*
  Route: /api/login

*/
const { Router } = require('express');
const {check} = require('express-validator');
const { validateField } = require('../middlewares/validate-fields');

const {login} = require('../controllers/auth');

const router = Router();

router.post( '/', [
  check('email', 'Email Requiered').isEmail(),
  check('password', 'Password Requiered').not().isEmpty(),
  validateField,
], login);

module.exports = router;