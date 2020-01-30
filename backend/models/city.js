'use strict';
const sequelizePaginate = require('sequelize-paginate')
module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define('City', {
    name: DataTypes.STRING,
    uf: DataTypes.STRING
  }, {});
  City.associate = function(models) {
    // associations can be defined here
  };
  sequelizePaginate.paginate(City)
  return City;
};