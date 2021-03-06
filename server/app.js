const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const api = require('./api');
const config = require('./config');

app.set('port', 3001);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization,X-Auth-Token',
};
app.use(cors(corsOptions));

app.use('/api', api);
app.use(express.static('static'));

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  res.json(err);
});

app.get('/', (req, res) => {
  res.sendStatus(404);
});

app.get('/favicon.ico', (req, res) => {
  res.sendStatus(204);
});

mongoose.connect(
  config.db.path,
  { useNewUrlParser: true },
);
const db = mongoose.connection;
mongoose.set('useCreateIndex', true);

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', () => {
  console.log('Connected to MongoDB');

  app.listen(app.get('port'), () => {
    console.log(`API Server Listening on port ${app.get('port')}!`);
  });
});
