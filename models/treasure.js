module.exports = (sequelize, DataTypes) => {
  const Treasure = sequelize.define('Treasure', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    latitude: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    longitude: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }

  }, {});

  Treasure.associate = models => {
    Treasure.hasMany(models.MoneyValue, {
      foreignKey: 'treasureId',
    })
  };

  return Treasure;
};
