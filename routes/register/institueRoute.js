const express = require('express');
const router = express.Router();
const institue = require('../../controllers/registration/institute');
const authValidation = require('../../validations/auth')
const validate = require('express-validation');

router.route('/register/instituteDetails').post(institue.registerInstitute);

module.exports = router;