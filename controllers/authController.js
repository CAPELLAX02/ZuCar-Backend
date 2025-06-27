const jwt = require('jsonwebtoken');
const { ADMIN_USERNAME, ADMIN_PASSWORD, JWT_SECRET } = require('../config/env');

let adminPassword = ADMIN_PASSWORD;

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (username !== ADMIN_USERNAME || password !== adminPassword) {
    return res.status(401).json({ message: "Kullanıcı adı veya şifre hatalı" });
  }

  const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
};

exports.changePassword = (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (oldPassword !== adminPassword) {
    return res.status(401).json({ message: "Eski şifre yanlış!" });
  }
  adminPassword = newPassword;
  res.json({ message: "Şifre başarıyla değiştirildi" });
};
