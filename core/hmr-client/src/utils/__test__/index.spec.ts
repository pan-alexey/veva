import { cssClassName } from '../index'

describe('Utils', () => {
  test('cssClassName', () => {
    const str = cssClassName({ a: '1', b: '2', c: '3'}, ['a', 'c', 'e'])
    expect(str).toBe('1 3');
  });
});
