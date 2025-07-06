const express = require('express');
const router = express.Router();
const dataController = require('../controllers/dataController');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.post('/kaydet', authenticateToken, dataController.kaydet);
router.get('/kod-sorgula/:kod', dataController.kodSorgula);
router.get('/tum-kayitlar', authenticateToken, dataController.tumKayitlar);
router.put('/kayit/:kod', authenticateToken, dataController.kayitGuncelle);
router.delete('/kayit/:kod', authenticateToken, dataController.kodSil);

module.exports = router;
