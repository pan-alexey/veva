import * as utils from '../index';

describe('index', () => {
  it('check workspace', async () => {
    expect(utils).toHaveProperty('helpers');
  });
});
