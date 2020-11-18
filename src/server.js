const express = require('express');
const dotenv = require('dotenv');

const app = require('./app');
const mongoose = require('mongoose');

dotenv.config({
  path: 'config.env',
});
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const port = 3000;

app.listen(port, () => console.log(`Server started at port ${port}`));