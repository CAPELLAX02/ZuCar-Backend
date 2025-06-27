const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.post('/kaydet', authenticateToken, dataController.kaydet);
router.get('/kod-sorgula/:kod', dataController.kodSorgula);
router.get('/tum-kayitlar', authenticateToken, dataController.tumKayitlar);

module.exports = router;
