const express = require('express');

const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const api = require('./api');

app.set('port', 3001);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use('/api', api);
app.use(express.static('static'));
app.use(morgan('dev'));

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  res.json(err);
});

// mongoose.connect('mongodb://localhost:27017/mullumtas');
mongoose.connect('mongodb://testing:testing123@ds050087.mlab.com:50087/mullumtas');
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.log('Connected to MongoDB');

  app.listen(app.get('port'), () => {
    console.log(`API Server Listening on port ${app.get('port')}!`);
  });
});
