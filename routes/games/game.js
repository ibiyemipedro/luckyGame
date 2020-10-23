const express = require('express');
const { body } = require('express-validator');
const isAuth = require('../../utils/middlewares/is-auth');
const { findGameTreasure } = require('../../controllers/games/game');

const router = express.Router();


router.post('/play', isAuth, [
  body('latitude', 'Latitude is required').exists(),
  body('longitude', 'Longitude is required').exists(),
  body('distance', 'Distance is required').exists()
], findGameTreasure);


module.exports = router;