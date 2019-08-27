const express = require('express');
const router = express.Router();
const course = require('../../controllers/registration/course');

router.route('/register/addCourse').post(course.addCourse);

module.exports = router;