require('dotenv').config();
const express = require('express');
const cors = require('cors')
const { dbConnection } = require('./database/config');

// Create server express
const app = express();
// Config CORS
app.use(cors());

// Data Base
dbConnection();

// Routes
app.get( '/', (req, res) => {
  res.json({
    ok:true,
    msg: 'hello world'
  });
});

app.listen( process.env.PORT || 3000, () => {
  console.log('Server Listen in port: ' + process.env.PORT);
} );