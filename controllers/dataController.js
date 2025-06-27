const database = require('../config/firebase');

exports.kaydet = (req, res) => {
  const { kod, islemler } = req.body;
  if (!kod || !Array.isArray(islemler)) {
    return res.status(400).json({ message: "Eksik veri" });
  }

  const ref = database.ref(`kodlar/${kod}`);
  ref.set({
    islemler,
    tarih: new Date().toISOString()
  }).then(() => res.json({ message: "Veri kaydedildi" }))
    .catch(err => res.status(500).json({ message: "Firebase hatası", error: err }));
};

exports.kodSorgula = (req, res) => {
  const kod = req.params.kod;
  database.ref(`kodlar/${kod}`).once('value')
    .then(snapshot => {
      if (snapshot.exists()) res.json(snapshot.val());
      else res.status(404).json({ message: "Kod bulunamadı" });
    }).catch(() => res.status(500).json({ message: "Bir hata oluştu" }));
};

exports.tumKayitlar = (req, res) => {
  database.ref("kodlar").once('value')
    .then(snapshot => res.json(snapshot.val() || {}))
    .catch(() => res.status(500).json({ message: "Bir hata oluştu" }));
};
