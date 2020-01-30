const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/api/test', (req, res) => {
  res.send('got it');
})

module.exports = {
  app
}