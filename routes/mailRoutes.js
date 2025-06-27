const express = require('express');
const router  = express.Router();
const { postContact } = require('../controllers/mailController');
const { contactRules, handleValidation } = require('../middlewares/validate');

router.post('/contact', contactRules, handleValidation, postContact);

module.exports = router;
