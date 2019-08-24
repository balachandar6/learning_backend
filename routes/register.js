const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');
const validate = require('express-validation');
const authValidation = require('../validations/auth')

router.route('/auth/register').post(validate(authValidation.loginParam), auth.register);

module.exports = router;