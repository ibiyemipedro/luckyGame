const bcrypt = require('bcrypt');
const ids = require('shortid');
const jwt = require('jsonwebtoken');
const HttpException = require('../../utils/classes/httpException');
const { User, Treasure, MoneyValue } = require('../../models');
const { locationDetails } = require('../../config/config');



/**
 * Play game user
 * @param longitude 
 * @param latitude 
 * @param distance
 * @param amountValue - (optional) 
 * @returns treasure - Object
*/
const findTreasure = async ({ longitude, latitude, distance, amountValue, email }) => {

  console.log('Decoded Token Email : ', email)

  try {

    const treasures = await Treasure.findAll({
      include: [{
        model: MoneyValue
      }]
    });

    let availableTreasures = [];
    treasures.forEach(validTreasure);

    function validTreasure(item) {
      let treasureDistance = distanceAlgorithm(item.latitude, locationDetails.refLatitude, item.longitude, locationDetails.refLongitude)
      if ((distance * 1000) > treasureDistance) {
        availableTreasures.push(item)
      }
    }

    if (amountValue) {

      return treasure = {
        data: treasures
      }

    } else {
      return treasure = {
        data: treasures
      }
    }

  } catch (error) {
    console.log('In game error', error)
    throw error;

  }

}


// function to calculate the distance between two coordinates
function distanceAlgorithm(lat1, lat2, lon1, lon2) {
  // convert coordinates to radian before parsing to the formula
  var φ1 = toRadians(lat1);
  var φ2 = toRadians(lat2);
  var Δφ = toRadians((lat2 - lat1));
  var Δλ = toRadians((lon2 - lon1));

  // calculating distance using haversine formula
  var a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // distance between points
  var d = locationDetails.earthRadius * c;
  console.log(d)
  return d;
}

// function to convert degrees to radian
function toRadians(degrees) {
  var pi = Math.PI;
  return degrees * (pi / 180);
}



module.exports = { findTreasure }