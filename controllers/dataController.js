// ***** Doğru import *****
const db = require('../config/firebase');   // artık db.ref kullanabilirsin
// eğer { db } diye export ettiysen: const { db } = require('../config/firebase');

// ------------------ KAYDET ------------------
exports.kaydet = async (req, res, next) => {
  try {
    const { kod, islemler, custom = false } = req.body;
    if (!kod || !Array.isArray(islemler))
      return res.status(400).json({ message: 'Eksik veri' });

    const ref = db.ref(`kodlar/${kod}`);

    if ((await ref.once('value')).exists())
      return res.status(409).json({ message: 'Kod zaten kayıtlı' });

    await ref.set({
      islemler,
      tarih : new Date().toISOString(),
      custom: !!custom
    });
    res.json({ ok: true });
  } catch (err) { next(err); }
};

// ------------------ KOD SORGULA ------------------
exports.kodSorgula = (req, res, next) => {
  db.ref(`kodlar/${req.params.kod}`).once('value')
    .then(s => s.exists()
      ? res.json(s.val())
      : res.status(404).json({ message: 'Kod bulunamadı' }))
    .catch(next);
};

// ------------------ TÜM KAYITLAR ------------------
exports.tumKayitlar = (req, res, next) => {
  db.ref('kodlar').once('value')
    .then(s => res.json(s.val() || {}))
    .catch(next);
};
