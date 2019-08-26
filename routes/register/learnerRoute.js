const express = require('express');
const router = express.Router();
const learner = require('../../controllers/registration/learner');
const authValidation = require('../../validations/auth')
const validate = require('express-validation');

router.route('/register/learners').post(validate(authValidation.tutorParam), learner.registerLeaner);

module.exports = router;