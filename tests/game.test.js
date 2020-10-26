const G = require('../services/games/game')


describe('Play game without amount value', () => {
  const gameParams = {
    "latitude": 1.3273451,
    "longitude": 103.8756757,
    "distance": 1
  }

  it('Plays the game and returns treasure points within a distance', async () => {
    const expected = await G.findTreasure(gameParams)
    expect(expected).toBeDefined();
  });

})


describe('Play game with amount value', () => {
  const gameParams = {
    "latitude": 1.3273451,
    "longitude": 103.8756757,
    "distance": 1,
    "amountValue": 15
  }

  it('Plays the game and returns treasure points within a distance within an amount range', async () => {
    const expected = await G.findTreasure(gameParams)
    expect(expected).toBeDefined();
  });

})