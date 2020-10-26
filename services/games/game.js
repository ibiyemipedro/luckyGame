const HttpException = require('../../utils/classes/httpException');
const { Treasure, MoneyValue } = require('../../models');

/**
 * Play game user
 * @param longitude 
 * @param latitude 
 * @param distance
 * @param amountValue - (optional) 
 * @returns treasure - Object
*/
const findTreasure = async ({ longitude, latitude, distance, amountValue }) => {


  // check if amount value is an integer not a float 
  if (amountValue) {
    if (amountValue % 1 !== 0) {
      const error = new HttpException(400, 'Amount entered is not valid, Enter an Integer.', null);
      throw error;
    }
  }

  // restrict distance to 1 or 10
  if (distance !== 1 && distance !== 10) {
    const error = new HttpException(400, 'Distance must be 1 or 10.', null);
    throw error;
  }

  try {
    const treasures = await Treasure.findAll({
      include: [{
        model: MoneyValue
      }],
    });
    let availableTreasures = [];
    treasures.forEach(validTreasure);
    function validTreasure(item) {
      let treasureDistance = distCalculator(latitude, longitude, item.latitude, item.longitude)
      if (treasureDistance < distance) {
        availableTreasures.push(item)
      }
    }
    if (amountValue) {
      const reducedTreasures = availableTreasures.reduce((acc, treasure) => {
        let notValid = treasure.MoneyValues.some((item) => {
          return item.amount < amountValue
        })
        if (!notValid) {
          return [...acc, treasure]
        }
        return acc
      }, [])
      return reducedTreasures;
    } else {
      return availableTreasures
    }
  } catch (error) {
    console.log('In game error', error)
    throw error;
  }
}


// calculate the distance between two points
function distCalculator(lat1, lon1, lat2, lon2) {
  var R = 6371; // km
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  var lat1 = toRad(lat1);
  var lat2 = toRad(lat2);

  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}

// Converts numeric degrees to radians
function toRad(Value) {
  return Value * Math.PI / 180;
}

module.exports = { findTreasure }