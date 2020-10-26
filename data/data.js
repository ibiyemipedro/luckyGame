const excelToJson = require('convert-excel-to-json');
const bcrypt = require('bcrypt');
const { security } = require('../config/config');
const path = require('path');



const result = excelToJson({
  sourceFile: path.join(__dirname, 'DinDinn_Mini Assign_Data.xlsx')
});

result.users.shift();
result.treasures.shift();
result.money_values.shift();


exports.users = async () => {
  try {
    const formattedUsers = []
    for (let item of result.users) {
      await hashPassFunction(item)
    }
    async function hashPassFunction(item) {
      let hashedPass = await bcrypt.hash(item.E, security.salt);
      let newUser = {
        id: item.B,
        name: item.C,
        age: item.D,
        password: hashedPass,
        email: item.F,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      formattedUsers.push(newUser);
    }
    return formattedUsers;
  } catch (error) {
    console.log(error)
  }
}

exports.treasure = () => {
  const treasures = result.treasures.map((treasure) => ({
    id: treasure.B,
    latitude: treasure.C,
    longitude: treasure.D,
    name: treasure.E,
    createdAt: new Date(),
    updatedAt: new Date()
  }));

  return treasures;
}

exports.moneyValue = () => {
  const moneyValue = result.money_values.map((moneyValue) => ({
    treasureId: moneyValue.B,
    amount: moneyValue.C,
    createdAt: new Date(),
    updatedAt: new Date()
  }));

  return moneyValue
}