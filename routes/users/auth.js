const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const { userLogin, userRegister } = require('../../controllers/users/auth')


router.post('/register', [

  body('name')
    .exists()
    .withMessage('Name is required'),

  body('password')
    .exists()
    .withMessage('Password is required')
    .isLength({ min: 5 })
    .withMessage('Password should be at least 5 characters'),

  body('email')
    .exists()
    .withMessage(' Email is required')
    .isEmail()
    .withMessage('Please enter a valid email address'),

  body('age')
    .exists()
    .withMessage('Age is required')
    .isNumeric()
    .withMessage('Age should be a number')
], userRegister);

router.post('/login', [
  body('password')
    .exists()
    .withMessage('Password is required')
    .isLength({ min: 5 })
    .withMessage('Password should be at least 5 characters'),

  body('email')
    .exists()
    .withMessage(' Email is required')
    .isEmail()
    .withMessage('Please enter a valid email address'),

], userLogin);

module.exports = router