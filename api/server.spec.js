const server = require('./server');
const request = require('supertest');
const db = require('../data/dbConfig');

const testGame = {
  title: 'Pacman', // required
  genre: 'Arcade', // required
  releaseYear: 1980, // not required
};

describe('POST /games', () => {
  afterEach(async () => {
    await db('games').truncate();
  });

  it('Should return 201 on success', async () => {
    const response = await request(server)
      .post('/games')
      .send(testGame);
    expect(response.status).toEqual(201);
  });
  it('Should return 422 with incomplete info', async () => {
    const response = await request(server)
      .post('/games')
      .send({ title: 'Halo: Combat Evolved', releaseYear: 2001 });
    expect(response.status).toBe(422);
  });
  it('Should return 405 if duplicate game is inserted', async () => {
    await request(server)
      .post('/games')
      .send(testGame);
    const response = await request(server)
      .post('/games')
      .send(testGame);
    expect(response.status).toBe(405);
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

describe('GET /games/:id', () => {
  beforeEach(async () => {
    await db('games').insert(testGame);
  });
  afterEach(async () => {
    await db('games').truncate();
  });
  it('Should return game with matching ID', async () => {
    const response = await request(server).get('/games/1');
    expect(response.body.game.id).toBe(1);
    expect(response.status).toBe(200);
  });
  it('Should return 404 when searching for nonexistent game', async () => {
    const response = await request(server).get('/games/2');
    expect(response.status).toBe(404);
  });
});

describe('DELETE /games/:id', () => {
  beforeEach(async () => {
    await db('games').insert(testGame);
  });
  afterEach(async () => {
    await db('games').truncate();
  });
  it('Should return 200 status and number of items deleted', async () => {
    const response = await request(server).delete('/games/1');
    expect(response.body.deleted).toBe(1);
    expect(response.status).toBe(200);
  });
  it('Should return 404 when trying to delete nonexistent game', async () => {
    const response = await request(server).delete('/games/2');
    expect(response.status).toBe(404);
  });
});
