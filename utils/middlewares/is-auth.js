const jwt = require('jsonwebtoken');
const { jwtDetails } = require('../../config/config');
const HttpException = require('../classes/httpException');


module.exports = (req, res, next) => {
  try {

    const authHeader = req.get('Authorization');

    if (!authHeader) {
      let error = new HttpException(401, 'Not authenticated', null);
      throw error;
    }
    const token = authHeader.split(' ')[1];
    let decodedToken = jwt.verify(token, jwtDetails.key);

    if (!decodedToken) {
      let error = new HttpException(401, 'Authentication Failed', null);
      throw error;
    }

    req.body.email = decodedToken.email;
    next();

  } catch (error) {
    next(error);
  }
}