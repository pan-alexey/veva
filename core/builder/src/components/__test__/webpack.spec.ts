import webpackFixture from './__mocks__/webpack.fixture';

describe('webpack', () => {
  it('sucsess', async () => {
    const text = 'abcde';

    const { compiler, fs, volume } = webpackFixture('/index.js', 'production');
    fs.writeFileSync('/index.js', `const text='${text}'; console.log(text)`);

    const { err, stats } = await new Promise((resolve) => {
      compiler.run((err, stats) => {
        resolve({ err, stats });
      });
    });

    const json = volume.toJSON();

    expect(json['/build/bundle.js']).toMatch(/abcde/);
    expect(Boolean(err)).toBe(false);
    expect(stats.hasErrors()).toBe(false);
    expect(stats.hasWarnings()).toBe(false);
  });

  it('sucsess', async () => {
    const text = 'abcdef';
    const { compiler, fs, volume } = webpackFixture('/index.js');
    fs.writeFileSync('/index.js', `const text='${text}'; console.log(text)`);

    const { err, stats } = await new Promise((resolve) => {
      compiler.run((err, stats) => {
        resolve({ err, stats });
      });
    });

    const json = volume.toJSON();

    expect(json['/build/bundle.js']).toMatch(/abcdef/);
    expect(Boolean(err)).toBe(false);
    expect(stats.hasErrors()).toBe(false);

    expect(stats.hasWarnings()).toBe(true);
  });

  it('error in stats', async () => {
    const { compiler, fs } = webpackFixture('/index.js');
    fs.writeFileSync('/index.js', 'consa a = b;');

    const { err, stats } = await new Promise((resolve) => {
      compiler.run((err, stats) => {
        resolve({ err, stats });
      });
    });

    expect(Boolean(err)).toBe(false);
    expect(stats.hasErrors()).toBe(true);
  });
});