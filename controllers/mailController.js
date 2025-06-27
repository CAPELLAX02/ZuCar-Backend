const { transporter } = require('../config/email');
const asyncHandler    = require('../middlewares/asyncHandler');

const fs   = require('fs');
const path = require('path');

exports.postContact = asyncHandler(async (req, res) => {
  const { name, phone, email, message } = req.body;

    const templatePath = path.join(__dirname, 'email-tempate.html');
    const html = fs.readFileSync(templatePath, 'utf8')
        .replace(/{{name}}/g, name)
        .replace(/{{email}}/g, email)
        .replace(/{{phone}}/g, phone || '-')
        .replace(/{{message}}/g, message)
        .replace(/{{recipientName}}/g, 'ZuCar');
    
    await transporter.sendMail({
    from   : `"${name}" <${email}>`,
    to     : 'ahmetatar002@gmail.com',
    subject: `ZuCar | Yeni İletişim Mesajı`,
    html,
    });

    res.status(202).json({ message: 'Mesaj alındı, yakında dönüş yapılacak.' });
});
