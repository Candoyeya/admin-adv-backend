/*
  Route: /api/doctors
*/
const { Router } = require('express');
const {check} = require('express-validator');
const { validateField } = require('../middlewares/validate-fields');
const { validateJwt } = require('../middlewares/validate-jwt');

const {
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor
} = require('../controllers/doctors');

const router = Router();

router.get( '/', getDoctors);

router.post( '/', [
  validateJwt,
  check('name', 'Name Requiered').not().isEmpty(),
  check('hospital', 'Hospital Requiered').not().isEmpty(),
  check('hospital', 'Hospital Id not valid').isMongoId(),
  validateField,
], createDoctor);

router.put( '/:id', [
  validateJwt,
  check('name', 'Name Requiered').not().isEmpty(),
  check('hospital', 'Hospital Requiered').not().isEmpty(),
  check('hospital', 'Hospital Id not valid').isMongoId(),
  validateField,
],updateDoctor);

router.delete( '/:id', validateJwt, deleteDoctor);


module.exports = router;