const { validationResult } = require('express-validator');
const { signUp, signIn } = require('../../services/users/auth')


const userRegister = async (req, res, next) => {
  console.log(req)
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await signUp(req.body)

    if (user) {
      res.status(201).json({
        status: true,
        message: "User registration successful",
        data: null
      });
    } else {
      res.status(503).json({
        status: false,
        message: "Could not create user at the moment, try again",
        data: null
      });
    }
  } catch (error) {
    next(error);
  }
}

const userLogin = async (req, res, next) => {
  console.log(req)
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await signIn(req.body)
    if (user) {
      res.status(200).json({
        status: true,
        message: "User login successful",
        data: user
      });
    } else {
      res.status(503).json({
        status: false,
        message: "Could not login user at the moment, try again",
        data: null
      });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = { userLogin, userRegister }