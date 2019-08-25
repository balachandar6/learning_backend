const express = require('express');
const router = express.Router();
const tutors = require('../../controllers/registration/tutors');
const authValidation = require('../../validations/auth')
const validate = require('express-validation');

router.route('/register/tutor').post(validate(authValidation.tutorParam), tutors.registerTutor);

module.exports = router;