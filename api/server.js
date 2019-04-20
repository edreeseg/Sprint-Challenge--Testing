const express = require('express');
const server = express();
const db = require('../data/dbConfig');

server.use(express.json());

server.get('/games', async (req, res) => {
  try {
    const games = await db('games');
    res.json({ games });
  } catch (error) {
    res.status(500).json({ error });
  }
});

server.post('/games', async (req, res) => {
  try {
    const { title, genre, releaseYear } = req.body;
    if (!title || !genre)
      return res.status(422).json({
        error: 'Request must include values for title and genre keys.',
      });
    const newGame = { title, genre };
    if (releaseYear) newGame.releaseYear = releaseYear;
    const [id] = await db('games').insert(newGame);
    res.status(201).json({ id });
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = server;
