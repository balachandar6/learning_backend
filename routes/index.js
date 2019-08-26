const express = require('express');
const privatRouter = require('./private');
const loginRouter = require('./login');
const registerRouter = require('./register');
const tutorRouter = require('./register/tutorRoute');
const institueRouter = require('./register/institueRoute');
const router = express.Router();

router.use('/', privatRouter);
router.use('/', loginRouter);
router.use('/', registerRouter);
router.use('/', tutorRouter);
router.use('/', institueRouter)
module.exports = router;