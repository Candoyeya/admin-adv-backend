/*
  Route: /api/users

*/
const { Router } = require('express');
const {check} = require('express-validator');
const { validateField } = require('../middlewares/validate-fields');
const { validateJwt, validAdminRole, validAdminRoleOrUser } = require('../middlewares/validate-jwt');

const {getUsers,createUser,updateUser, deleteUser} = require('../controllers/users');

const router = Router();

router.get( '/', [validateJwt, validAdminRole], getUsers);

router.post( '/', [
  check('name', 'Name Requiered').not().isEmpty(),
  check('password', 'Password Requiered').not().isEmpty(),
  check('email', 'Email Requiered').isEmail(),
  validateField,
], createUser);

router.put( '/:id', [
  validateJwt,
  validAdminRoleOrUser,
  check('name', 'Name Requiered').not().isEmpty(),
  check('email', 'Email Requiered').isEmail(),
  check('role', 'Role Requiered').not().isEmpty(),
  validateField,
],updateUser);

router.delete( '/:id', [validateJwt, validAdminRole],deleteUser);


module.exports = router;