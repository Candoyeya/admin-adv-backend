/*
  Route: /api/all
*/
const { Router } = require('express');
const {check} = require('express-validator');
const { validateField } = require('../middlewares/validate-fields');
const { validateJwt } = require('../middlewares/validate-jwt');

const {getAll,getAllDocument} = require('../controllers/searches');

const router = Router();

router.get( '/:value', validateJwt, getAll);

router.get( '/collection/:table/:value', validateJwt, getAllDocument);


module.exports = router;