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


exports.users = () => {
  const users = result.users.map((user) => ({
    id: user.B,
    name: user.C,
    age: user.D,
    password: user.E,
    email: user.F,
    createdAt: new Date(),
    updatedAt: new Date()
  }));
  return users;
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