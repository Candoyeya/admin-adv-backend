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

// Routes
app.use('/api/users', require('./routes/users'));
app.use('/api/login', require('./routes/auth'));

app.listen( process.env.PORT || 3000, () => {
  console.log('Server Listen in port: ' + process.env.PORT);
} );