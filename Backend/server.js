const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const db = require('./models');
const userRoutes = require('./routes/userRoutes');
const eventRoutes = require('./routes/eventRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const volunteerHoursRoutes = require('./routes/volunteerHoursRoutes');
const profileRoutes = require('./routes/profileRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

// Test database connection and synchronize models
sequelize.authenticate()
  .then(() => {
    console.log('PostgreSQL connected');
    // Force sync during development to recreate tables
    return sequelize.sync({ force: true }); 
  })
  .then(() => {
    console.log('Database synchronized');
    // Create test data
    return Promise.all([
      db.User.create({
        name: 'Test User',
        email: 'test@example.com',
        password: bcrypt.hashSync('password123', 10),
        role: 'volunteer'
      }),
      db.Event.create({
        title: 'Community Cleanup',
        date: new Date(),
        description: 'Help clean up the local park',
        location: 'Central Park',
        participants: 10,
        status: 'completed'
      })
    ]);
  })
  .then(([user, event]) => {
    // Create test volunteer hours and review
    return Promise.all([
      db.VolunteerHours.create({
        userId: user.id,
        eventId: event.id,
        hours: 5,
        status: 'approved'
      }),
      db.Review.create({
        userId: user.id,
        eventId: event.id,
        rating: 5,
        reviewText: 'Great experience! Really enjoyed helping the community.',
        status: 'approved'
      })
    ]);
  })
  .then(() => {
    console.log('Test data created');
  })
  .catch(err => {
    console.log('Error: ' + err);
  });

// File upload setup
const upload = multer({ dest: 'uploads/' });

// Routes
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/volunteer-hours', volunteerHoursRoutes);
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