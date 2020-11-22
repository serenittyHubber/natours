// const format = require('prettier-eslint');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');
const mongoose = require('mongoose');

mongoose
  .connect('mongodb://127.0.0.1:27017/natours', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    // eslint-disable-next-line
    console.log('DB connected');
  })
  .catch(err => {
    // eslint-disable-next-line
    console.log(`DB connected ${err}`);
  });

const port = 3000;

app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server started at port ${port}`);
});
