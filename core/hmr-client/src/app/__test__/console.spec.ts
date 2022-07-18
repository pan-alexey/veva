
import { ConsoleEngine, eventConsole } from '../console';
import type { Types } from 'webpack-hmr-server'
describe('console', () => {
  test('ConsoleEngine/out', async () => {
    const groupStartCallback = jest.fn();
    const groupEndCallback = jest.fn();
    const consoleCallback = jest.fn();

    const consoleEngine = new ConsoleEngine({
      groupStartCallback,
      groupEndCallback,
      consoleCallback,
    });
    consoleEngine.out('hi', 'blue');
    expect(consoleCallback.mock.calls[0][0]).toBe('hi')
    expect(consoleCallback.mock.calls.length).toBe(1)
  });


  test('ConsoleEngine/colorOut', async () => {
    const groupStartCallback = jest.fn();
    const groupEndCallback = jest.fn();
    const consoleCallback = jest.fn();

    const consoleEngine = new ConsoleEngine({
      groupStartCallback,
      groupEndCallback,
      consoleCallback,
    });
    consoleEngine.colorOut('hi', 'blue');
    expect(consoleCallback.mock.calls[0][0]).toBe('%c VEVA %c hi ')
    expect(consoleCallback.mock.calls.length).toBe(1)
  });

  test('ConsoleEngine/groups:all', async () => {
    const groupStartCallback = jest.fn();
    const groupEndCallback = jest.fn();
    const consoleCallback = jest.fn();

    const consoleEngine = new ConsoleEngine({
      groupStartCallback,
      groupEndCallback,
      consoleCallback,
    });

    consoleEngine.groupStart('lvl1', 'green');
    consoleEngine.groupStart('lvl2', 'blue');
    consoleEngine.groupStart('lvl2', 'grey');
    consoleEngine.groupEnd(true);

    expect(consoleCallback.mock.calls.length).toBe(0)
    expect(groupStartCallback.mock.calls.length).toBe(3)
    expect(groupEndCallback.mock.calls.length).toBe(3)
  });

  test('ConsoleEngine/groups', async () => {
    const groupStartCallback = jest.fn();
    const groupEndCallback = jest.fn();
    const consoleCallback = jest.fn();

    const consoleEngine = new ConsoleEngine({
      groupStartCallback,
      groupEndCallback,
      consoleCallback,
    });

    consoleEngine.groupStart('lvl1', 'green');
    consoleEngine.groupStart('lvl2', 'blue');
    consoleEngine.groupEnd();
    consoleEngine.groupStart('lvl2', 'grey');
    consoleEngine.groupEnd();

    expect(consoleCallback.mock.calls.length).toBe(0)
    expect(groupStartCallback.mock.calls.length).toBe(3)
    expect(groupEndCallback.mock.calls.length).toBe(2)
  });
});

describe('console', () => {
  test('eventConsole/connected', async () => {
    const groupStartCallback = jest.fn();
    const groupEndCallback = jest.fn();
    const consoleCallback = jest.fn();

    const consoleEngine = new ConsoleEngine({
      groupStartCallback,
      groupEndCallback,
      consoleCallback,
    });

    const processEvent = eventConsole(consoleEngine)

    processEvent({
      resourceQuery: '',
      message: 'unknown',
      hotEnable: true,
      action: 'init',
      refresh: false
    })

    processEvent({
      resourceQuery: '',
      message: 'unknown',
      hotEnable: true,
      action: 'init',
      refresh: false
    })

    expect(consoleCallback.mock.calls.length).toBe(1)

    processEvent({
      resourceQuery: '',
      message: 'unknown',
      hotEnable: true,
      action: 'init',
      refresh: false
    })
  });

  test('eventConsole/ connect + Build with error', async () => {
    const groupStartCallback = jest.fn();
    const groupEndCallback = jest.fn();
    const consoleCallback = jest.fn();

    const consoleEngine = new ConsoleEngine({
      groupStartCallback,
      groupEndCallback,
      consoleCallback,
    });

    const processEvent = eventConsole(consoleEngine)

    processEvent({
      resourceQuery: '',
      message: 'unknown',
      hotEnable: true,
      action: 'init',
      refresh: false,
      state: {
        client: {
          errors: ['client' as unknown as Types.DataStatsError],
          warnings: [],
        }
      }
    })

    expect(consoleCallback.mock.calls.length).toBe(2)
    expect(consoleCallback.mock.calls[0][0]).toBe('%c VEVA %c Connected ')
    expect(consoleCallback.mock.calls[1][0]).toBe('%c VEVA %c Build with error ')
  });

  test('eventConsole/ connect + disconect', async () => {
    const groupStartCallback = jest.fn();
    const groupEndCallback = jest.fn();
    const consoleCallback = jest.fn();

    const consoleEngine = new ConsoleEngine({
      groupStartCallback,
      groupEndCallback,
      consoleCallback,
    });

    const processEvent = eventConsole(consoleEngine)

    processEvent({
      resourceQuery: '',
      message: 'unknown',
      hotEnable: true,
      action: 'init',
      refresh: false
    })

    processEvent({
      resourceQuery: '',
      message: 'unknown',
      hotEnable: true,
      action: 'disconect',
      refresh: false
    })
    processEvent({
      resourceQuery: '',
      message: 'unknown',
      hotEnable: true,
      action: 'disconect',
      refresh: false
    })

    expect(consoleCallback.mock.calls[0][0]).toBe('%c VEVA %c Connected ')
    expect(consoleCallback.mock.calls[1][0]).toBe('%c VEVA %c Disconect ')
    expect(consoleCallback.mock.calls.length).toBe(2)
  });


  test('eventConsole/ Build with error', async () => {
    const groupStartCallback = jest.fn();
    const groupEndCallback = jest.fn();
    const consoleCallback = jest.fn();

    const consoleEngine = new ConsoleEngine({
      groupStartCallback,
      groupEndCallback,
      consoleCallback,
    });

    const processEvent = eventConsole(consoleEngine)

    processEvent({
      resourceQuery: '',
      message: 'Build with error',
      hotEnable: true,
      action: 'build',
      refresh: false
    })

    processEvent({
      resourceQuery: '',
      message: 'Build with error',
      hotEnable: true,
      action: 'build',
      refresh: false
    })

    expect(consoleCallback.mock.calls[0][0]).toBe('%c VEVA %c Build with error ')
    expect(consoleCallback.mock.calls.length).toBe(2)
  });


  test('eventConsole/Modules updated', async () => {
    const groupStartCallback = jest.fn();
    const groupEndCallback = jest.fn();
    const consoleCallback = jest.fn();

    const consoleEngine = new ConsoleEngine({
      groupStartCallback,
      groupEndCallback,
      consoleCallback,
    });

    const processEvent = eventConsole(consoleEngine)

    processEvent({
      resourceQuery: '',
      message: 'Modules updated',
      hotEnable: true,
      action: 'build',
      refresh: false,
      modules: [1,2,3,4,5,6,7]
    })

    expect(consoleCallback.mock.calls.length).toBe(7)
    expect(groupStartCallback.mock.calls.length).toBe(1)
    expect(groupEndCallback.mock.calls.length).toBe(1)
  });
});