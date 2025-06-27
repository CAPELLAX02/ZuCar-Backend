const database = require('../config/firebase');

// ------------------ KAYDET ------------------
exports.kaydet = async (req, res) => {
  const { kod, islemler, custom = false } = req.body;   // ✨ custom param

  if (!kod || !Array.isArray(islemler))
    return res.status(400).json({ message: "Eksik veri" });

  const ref = database.ref(`kodlar/${kod}`);

  // — kod zaten var mı?
  const snap = await ref.once('value');
  if (snap.exists())
    return res.status(409).json({ message: "Kod zaten kayıtlı" });

  ref.set({
    islemler,
    tarih: new Date().toISOString(),
    custom: !!custom            // ✨ kaydet
  })
    .then(() => res.json({ message: "Veri kaydedildi" }))
    .catch(err =>
      res.status(500).json({ message: "Firebase hatası", error: err })
    );
};

// ------------------ KOD SORGULA ------------------
exports.kodSorgula = (req, res) => {
  database.ref(`kodlar/${req.params.kod}`).once('value')
    .then(snap => snap.exists()
      ? res.json(snap.val())
      : res.status(404).json({ message: "Kod bulunamadı" })
    )
    .catch(() => res.status(500).json({ message: "Bir hata oluştu" }));
};

// ------------------ TÜM KAYITLAR ------------------
exports.tumKayitlar = (req, res) => {
  database.ref("kodlar").once('value')
    .then(snap => res.json(snap.val() || {}))   // custom alanı dahil
    .catch(() => res.status(500).json({ message: "Bir hata oluştu" }));
};
