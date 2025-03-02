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
const contactRoutes = require('./routes/contactRoutes');

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true
}));
app.use(express.json());

// Test database connection and synchronize models
sequelize.authenticate()
  .then(() => {
    console.log('PostgreSQL connected');
    return sequelize.sync(); // Regular sync without force
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
app.use('/api/reviews', reviewRoutes);
app.use('/api/volunteer-hours', volunteerHoursRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/volunteers', volunteerRoutes);
app.use('/api/contact', contactRoutes);

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