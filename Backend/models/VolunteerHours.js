const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const VolunteerHours = sequelize.define('VolunteerHours', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  eventId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  hours: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending',
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

VolunteerHours.associate = (models) => {
  VolunteerHours.belongsTo(models.User, {
    foreignKey: 'userId',
    as: 'HoursUser'
  });
  VolunteerHours.belongsTo(models.Event, {
    foreignKey: 'eventId',
    as: 'HoursEvent'
  });
};

module.exports = VolunteerHours;
