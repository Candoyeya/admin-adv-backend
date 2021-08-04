require('dotenv').config();
const express = require('express');
const cors = require('cors')
const { dbConnection } = require('./database/config');

// Create server express
const app = express();
// Config CORS
app.use(cors());

// Read and Parse body
app.use(express.json());

// Data Base
dbConnection();

// Public Folder
app.use(express.static('public'));

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/hospitals', require('./routes/hospitals'));
app.use('/api/doctors', require('./routes/doctors'));
app.use('/api/all', require('./routes/searches'));
app.use('/api/uploads', require('./routes/uploads'));
app.use('/api/login', require('./routes/auth'));

app.listen( process.env.PORT || 3000, () => {
  console.log('Server Listen in port: ' + process.env.PORT);
} );