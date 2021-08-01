/*
  Route: /api/hospitals
*/
const { Router } = require('express');
const {check} = require('express-validator');
const { validateField } = require('../middlewares/validate-fields');
const { validateJwt } = require('../middlewares/validate-jwt');

const {
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital
} = require('../controllers/hospitals');

const router = Router();

router.get( '/', validateJwt, getHospitals);

router.post( '/', [
  validateJwt,
  check('name', 'Name Requiered').not().isEmpty(),
  validateField,
], createHospital);

router.put( '/:id', [

],updateHospital);

router.delete( '/:id', deleteHospital);


module.exports = router;