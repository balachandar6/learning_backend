const express = require('express');
const router = express.Router();
const trainer = require('../../controllers/registration/trainer');
// const authValidation = require('../../validations/auth')
// const validate = require('express-validation');

router.route('/register/trainerDetails').post(trainer.registerTrainer);

module.exports = router;