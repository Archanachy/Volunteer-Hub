const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'volunteer'),
    defaultValue: 'volunteer',
  },
});

// Add association after model definition
User.associate = (models) => {
  User.hasMany(models.Review, {
    foreignKey: 'userId',
    as: 'UserReviews'
  });
  User.hasMany(models.VolunteerHours, {
    foreignKey: 'userId',
    as: 'UserVolunteerHours'
  });
};

module.exports = User;