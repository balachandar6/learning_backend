const express = require('express');
const praviteRouter = require('./private');
const loginRouter = require('./login');
const registerRouter = require('./register');

const router = express.Router();

router.use('/', praviteRouter);
router.use('/', loginRouter);
router.use('/', registerRouter);

module.exports = router;