const express = require('express');
const { body } = require('express-validator');
const isAuth = require('../../utils/middlewares/is-auth');
const { findGameTreasure } = require('../../controllers/games/game');

const router = express.Router();


router.post('/play', isAuth, [
  body('latitude', 'Latitude is required').exists(),

  body('latitude')
    .exists()
    .withMessage('Latitude is required')
    .isNumeric()
    .withMessage('Enter a valid latitude'),

  body('longitude')
    .exists()
    .withMessage('Longitude is required')
    .isNumeric()
    .withMessage('Enter a valid longitude'),

  body('distance')
    .exists()
    .withMessage('Distance is required')
    .isNumeric()
    .withMessage('Distance must be a number'),

  body('amountValue')
    .optional()
    .isNumeric()
    .withMessage('Amount value must be a number')


], findGameTreasure);


module.exports = router;