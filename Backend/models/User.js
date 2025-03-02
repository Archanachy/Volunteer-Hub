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
    as: 'UserReviews',
    onDelete: 'CASCADE'
  });
  User.hasMany(models.VolunteerHours, {
    foreignKey: 'userId',
    as: 'UserVolunteerHours',
    onDelete: 'CASCADE'
  });
  User.hasOne(models.Profile, {
    foreignKey: 'userId',
    as: 'UserProfile',
    onDelete: 'CASCADE'
  });
};

// Hook to automatically create a profile when a user is created
User.addHook('afterCreate', async (user, options) => {
  const Profile = require('./Profile');
  await Profile.create({
    userId: user.id,
    name: user.name,
    email: user.email
  });
});

// Hook to automatically update profile when user details change
User.addHook('afterUpdate', async (user, options) => {
  const Profile = require('./Profile');
  if (user.changed('name') || user.changed('email')) {
    await Profile.update(
      {
        name: user.name,
        email: user.email
      },
      {
        where: { userId: user.id }
      }
    );
  }
});

module.exports = User;