const express = require('express');
const router = express.Router();
const learnerDetail = require('../../controllers/registration/learnerDetail');

router.route('/register/learnerDetails').post(learnerDetail.registerLearnerDetail);

module.exports = router;