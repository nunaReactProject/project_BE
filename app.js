const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const indexRouter = require('./routes/index');
dotenv.config();

const app = express();

const corsOption = {
  origin: ['http://localhost:3000'],
  credentials: true,
};

app.use(cors(corsOption));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use('/api', indexRouter);

const mongoURI = process.env.DB_ADDRESS;

mongoose
  .connect(mongoURI)
  .then(() => console.log('mongoose connected'))
  .catch((err) => console.log('DB connection fail', err));

app.listen(process.env.PORT || 5000, () => {
  console.log('server on');
});
