const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const { userLogin, userRegister } = require('../../controllers/users/auth')


router.post('/register', [
  body('name', 'First name is required').exists(),
  body('password', 'Password should be longer than 5 characters').isLength({ min: 5 }),
  body('email', 'Email is required and should be a valid email').exists().isEmail(),
  body('age', 'Age is required').exists()
], userRegister);

router.post('/login', [
  body('password', 'Password should be longer than 5 characters').isLength({ min: 5 }),
  body('email', 'Email is required and should be a valid email').exists().isEmail(),
], userLogin);

module.exports = router