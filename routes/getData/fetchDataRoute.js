const express = require('express');
const router = express.Router();
const data = require('../../controllers/getData/fetchData');

router.route('/getAllTutors').get(data.getTutor);
router.route('/getAllInstitutes').get(data.getInstitute);
router.route('/getAllTrainers').get(data.getTrainer);
router.route('/getAllLearners').get(data.getLearner);
router.route('/getCourse/:search').get(data.getCourse);
module.exports = router;