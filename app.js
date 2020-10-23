const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const loggerMiddleware = require('./utils/middlewares/logger');

// DB connection
const { dbConnection } = require('./config/postgres')

// Routes
const userRoute = require('./routes/users/auth');
const gameRoute = require('./routes/games/game');


const app = express();

const port = process.env.PORT || 3800;

// CORS middleware
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-HEaders', 'Content-Type, Authorization');
  next();
});

app.use(bodyParser.json());

app.use(loggerMiddleware.loggerMiddleware);

// routes
app.use('/', userRoute);
app.use('/game', gameRoute);

// Default landing endpoint
app.use('/', (req, res, next) => res.status(404).json({ message: 'Page not found.' }));

// Global error handler
app.use((error, req, res, next) => {

  const status = error.statusCode || 500;
  const message = error.message || 'Internal server error';
  const data = error.data | null;

  res.status(status).json({
    message,
    data
  })
});

app.listen(port, async () => {
  try {
    const dbConnect = await dbConnection();
    if (dbConnect) {
      console.log(`server starting on port: ${port}`);
    }

  } catch (error) {
    console.log(`DB connection error : ${error}`);
  }

});

