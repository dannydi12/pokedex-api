require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const POKEDEX = require('./pokedex.json');

const app = express();
const morganSetting = process.env.NODE_ENV === 'production' ? 'tiny' : 'common'
app.use(morgan(morganSetting));

app.use(function validateBearerToken(req, res, next) {
  if (req.headers.authorization !== process.env.API_KEY) {
    res.status(401).send('Not a valid key');
  }
  next();
});
app.use((error, req, res, next) => {
  let response
  if (process.env.NODE_ENV === 'production') {
    response = { error: { message: 'server error' } }
  } else {
    response = { error }
  }
  res.status(500).json(response)
})

const validTypes = [`Bug`, `Dark`, `Dragon`, `Electric`, `Fairy`, `Fighting`, `Fire`, `Flying`, `Ghost`, `Grass`, `Ground`, `Ice`, `Normal`, `Poison`, `Psychic`, `Rock`, `Steel`, `Water`];

function handleGetTypes(req, res) {
  res.json(validTypes)
}

app.get('/types', handleGetTypes)


function handleGetPokemon(req, res) {
  res.send('Hello Pokemon!')
}

app.get('/pokemon', handleGetPokemon)

module.exports = {
  app
}