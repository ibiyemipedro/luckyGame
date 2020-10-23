module.exports = (sequelize, DataTypes) => {
  const MoneyValue = sequelize.define('MoneyValue', {
    treasureId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    amount: {
      type: DataTypes.NUMBER,
      allowNull: false
    }

  }, {});

  MoneyValue.associate = function (models) {
    MoneyValue.belongsTo(models.Treasure, {
      foreignKey: 'treasureId',
      onDelete: 'CASCADE'
    })
  };

  return MoneyValue;
};
