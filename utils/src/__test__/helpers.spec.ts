import * as helpers from '../helpers';

describe('helpers', () => {
  it('uniqString', async () => {
    const result = helpers.uniqString(['1', '1', '2']);
    expect(result).toEqual(['1', '2']);
  });
});
