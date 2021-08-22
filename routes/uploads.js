/*
  Route: /api/uploads
*/
const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const {check} = require('express-validator');
const { validateField } = require('../middlewares/validate-fields');
const { validateJwt } = require('../middlewares/validate-jwt');

const {fileUpload,returnImg} = require('../controllers/uploads');

const router = Router();

router.use(expressFileUpload());
router.put( '/:type/:id', validateJwt, fileUpload);
router.get( '/:type/:img', returnImg);


module.exports = router;