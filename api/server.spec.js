const server = require('./server');
const request = require('supertest');
const db = require('../data/dbConfig');

describe('POST /games', () => {
  const testGame = {
    title: 'Pacman', // required
    genre: 'Arcade', // required
    releaseYear: 1980, // not required
  };
  afterEach(async () => {
    await db('games').truncate();
  });

  it('Should return 201 on success', async () => {
    const response = await request(server)
      .post('/games')
      .send(testGame);
    expect(response.status).toBe(201);
  });
  it('Should return 422 with incomplete info', async () => {
    const response = await request(server)
      .post('/games')
      .send({ title: 'Halo: Combat Evolved', releaseYear: 2001 });
    expect(response.status).toBe(422);
  });
});

describe('GET /games', () => {
  it('Should return an array', async () => {
    const response = await request(server).get('/games');
    expect(Array.isArray(response.body.games)).toBe(true);
  });
  it('Should return 200 on success', async () => {
    const response = await request(server).get('/games');
    expect(response.status).toBe(200);
  });
});
