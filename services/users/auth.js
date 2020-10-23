const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const HttpException = require('../../utils/classes/httpException');
const UserClass = require('../../utils/classes/users');
const { User, Treasure, MoneyValue } = require('../../models');
const { jwtDetails, security } = require('../../config/config');



/**
 * Registers a user
 * @param name 
 * @param email 
 * @param password
 * @param age
 * @returns status - Boolean
*/
const signUp = async ({ name, email, password, age }) => {

  try {

    let existingUser = await User.findOne({
      where: {
        email: email
      }
    });

    console.log('existing user : ', existingUser)

    if (existingUser) {

      const error = new HttpException(400, 'Email Already used.', null);
      throw error;

    }

    const hashedPassword = await bcrypt.hash(password, security.salt);

    const user = new UserClass(name, email, hashedPassword, age);

    const result = await User.create(user);


    if (!result) {
      const error = new HttpException(400, 'Error occurred, user was not created.', null);
      throw error;
    }

    let status = true
    return status;

  } catch (error) {
    console.log('signup error', error)
    throw error;
  }
}


/**
 * Authenticates a user
 * @param email
 * @param password
 * @returns user token - Object
*/

const signIn = async ({ email, password }) => {

  try {
    let user = await User.findOne({
      where: {
        email: email
      }
    });

    if (!user) {
      const error = new HttpException(401, 'User does not exist.', null);
      throw error;
    }

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new HttpException(401, 'Wrong password', null);
      throw error;
    }

    const token = jwt.sign({
      email: user.email
    }, jwtDetails.key, {
      expiresIn: '24h'
    });

    if (!token) {
      const error = new HttpException(401, 'Error occurred, could not create token.', null);
      throw error;
    }

    return {
      token,
      user: user
    };

  } catch (error) {
    console.log('signup error', error)
    throw error;
  }
}


module.exports = { signUp, signIn }