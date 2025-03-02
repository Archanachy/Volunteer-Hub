const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');

const Profile = sequelize.define('Profile', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      isEmail: true,
    },
  },
  profilePic: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  bio: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

User.hasOne(Profile, { 
  foreignKey: 'userId',
  onDelete: 'CASCADE',
  hooks: true 
});
Profile.belongsTo(User, { foreignKey: 'userId' });

module.exports = Profile;