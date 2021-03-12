const demo = function (input: string): string {
  return input;
};

test('My Greeter', () => {
  expect(demo('1')).toBe('1');
});
