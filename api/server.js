const express = require('express');
const server = express();
const db = require('../data/dbConfig');

server.use(express.json());

server.get('/games', async (req, res) => {
  try {
    const games = await db('games');
    res.json({ games });
  } catch (error) {
    res.status(500).json({ error: error.message });
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
    if (error.message.includes('UNIQUE constraint'))
      return res
        .status(405)
        .json({ error: 'Game title already exists in database' });
    res.status(500).json({ error: error.message });
  }
});

server.get('/games/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [game] = await db('games').where({ id });
    if (game) return res.status(200).json({ game });
    else res.status(404).json({ error: 'No game found with that ID.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

server.delete('/games/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await db('games')
      .where({ id })
      .del();
    if (deleted) return res.status(200).json({ deleted });
    else res.status(404).json({ error: 'No game found with that ID.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = server;
