const { validationResult } = require('express-validator');
const { findTreasure } = require('../../services/games/game')


const findGameTreasure = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const treasure = await findTreasure(req.body)

    if (treasure) {
      res.status(200).json({
        status: true,
        message: "User hunt success",
        data: treasure
      });
    } else {
      res.status(503).json({
        status: false,
        message: "Could not locate treasure at the moment, try again",
        data: null
      });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { findGameTreasure }