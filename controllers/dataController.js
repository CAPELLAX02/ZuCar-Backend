const db = require("../config/firebase");

const refOf = (k) => db.ref(`kodlar/${k}`);

exports.kaydet = async (req, res, next) => {
  try {
    const {
      kod,
      plakaNo,
      garantiBaslangic,
      garantiBitis,
      notlar = "",
      islemler,
      custom = false,
    } = req.body;

    if (!kod || !plakaNo || !garantiBaslangic || !garantiBitis || !Array.isArray(islemler))
      return res.status(400).json({ message: "Eksik veri" });

    const ref = refOf(kod);
    if ((await ref.once("value")).exists())
      return res.status(409).json({ message: "Kod zaten kayıtlı" });

    await ref.set({
      plakaNo,
      garanti: { baslangic: garantiBaslangic, bitis: garantiBitis },
      notlar,
      islemler,
      tarih: new Date().toISOString(),
      custom,
    });

    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};

exports.kayitGuncelle = async (req, res, next) => {
  try {
    const kod = req.params.kod;
    const body = req.body;
    delete body.kod; // safety

    const ref = refOf(kod);
    if (!(await ref.once("value")).exists())
      return res.status(404).json({ message: "Kod bulunamadı" });
    await ref.update({ ...body });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};

exports.kodSorgula = (req, res, next) => {
  refOf(req.params.kod)
      .once('value')
      .then((s) =>
          s.exists()
              ? res.json(s.val())
              : res.status(404).json({ message: 'Kod bulunamadı' })
      )
      .catch(next);
};

exports.kodSil = async (req, res, next) => {
  try {
    const kod = req.params.kod;
    await refOf(kod).remove();
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
};

exports.tumKayitlar = (req, res, next) => {
  db.ref("kodlar")
      .once("value")
      .then((s) => res.json(s.val() || {}))
      .catch(next);
};