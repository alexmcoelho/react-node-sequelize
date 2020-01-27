'use strict';
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    name: DataTypes.STRING,
    street: DataTypes.STRING,
    registry: DataTypes.STRING
  }, {});

  Customer.associate = function(models) {
    // associations can be defined here
    models.Customer.belongsTo(models.City, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Customer;
};