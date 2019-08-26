const express = require('express');
const privatRouter = require('./private');
const loginRouter = require('./login');
const registerRouter = require('./register');
const tutorRouter = require('./register/tutorRoute');
const institueRouter = require('./register/institueRoute');
const trainerRouter = require('./register/trainerRoute');
const learnerRoute = require('./register/learnerRoute');
const router = express.Router();

router.use('/', privatRouter);
router.use('/', loginRouter);
router.use('/', registerRouter);
router.use('/', tutorRouter);
router.use('/', institueRouter);
router.use('/', trainerRouter);
router.use('/', learnerRoute);
module.exports = router;