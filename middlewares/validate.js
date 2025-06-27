const { body, validationResult } = require('express-validator');

exports.contactRules = [
  body('name').trim().isLength({ min: 2 }).withMessage('İsim zorunlu'),
  body('email').isEmail().withMessage('Geçerli e-posta gerekli'),
  body('message').trim().isLength({ min: 10 }).withMessage('Mesaj min. 10 karakter')
];

exports.handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  return errors.isEmpty()
    ? next()
    : res.status(422).json({ errors: errors.array() });
};
