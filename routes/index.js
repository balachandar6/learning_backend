const express = require('express');
const privatRouter = require('./private');
const loginRouter = require('./login');
const registerRouter = require('./register');
const tutorRouter = require('./register/tutorRoute');

const router = express.Router();

router.use('/', privatRouter);
router.use('/', loginRouter);
router.use('/', registerRouter);
router.use('/', tutorRouter);

module.exports = router;