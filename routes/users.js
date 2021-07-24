/*
  Route: /api/users

*/
const { Router } = require('express');
const {check} = require('express-validator');
const { validateField } = require('../middlewares/validate-fields');
const { validateJwt } = require('../middlewares/validate-jwt');

const {getUsers,createUser,updateUser, deleteUser} = require('../controllers/users');

const router = Router();

router.get( '/', validateJwt, getUsers);

router.post( '/', [
  check('name', 'Name Requiered').not().isEmpty(),
  check('password', 'Password Requiered').not().isEmpty(),
  check('email', 'Email Requiered').isEmail(),
  validateField,
], createUser);

router.put( '/:id', [
  validateJwt,
  check('name', 'Name Requiered').not().isEmpty(),
  check('email', 'Email Requiered').isEmail(),
  check('role', 'Role Requiered').not().isEmpty(),
  validateField,
],updateUser);

router.delete( '/:id', validateJwt,deleteUser);


module.exports = router;