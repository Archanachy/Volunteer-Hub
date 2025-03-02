const bcrypt = require('bcryptjs');
const { Sequelize } = require('sequelize');
const User = require('../models/User');
require('dotenv').config();

async function createAdminUser() {
  try {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@volunteerhub.com',
      password: hashedPassword,
      role: 'admin'
    });

    console.log('Admin user created successfully:', {
      id: adminUser.id,
      name: adminUser.name,
      email: adminUser.email,
      role: adminUser.role
    });

  } catch (error) {
    console.error('Error creating admin user:', error);
  } finally {
    process.exit();
  }
}

createAdminUser(); 