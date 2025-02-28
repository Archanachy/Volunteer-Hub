const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const volunteerHoursRoutes = require('./routes/volunteerHoursRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const profileRoutes = require('./routes/profileRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

// Test database connection and synchronize models
sequelize.authenticate()
  .then(() => {
    console.log('PostgreSQL connected');
    return sequelize.sync(); // Synchronize models with the database
  })
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(err => {
    console.log('Error: ' + err);
  });

// File upload setup
const upload = multer({ dest: 'uploads/' });

// Routes
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/feedbacks', feedbackRoutes);
app.use('/api/volunteer-hours', volunteerHoursRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/volunteers', volunteerRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Example protected route
app.get('/protected', (req, res) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    res.send('Protected content');
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});