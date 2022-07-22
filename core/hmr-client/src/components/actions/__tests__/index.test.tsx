import { h } from "preact";
import { render, fireEvent, screen, waitFor } from "@testing-library/preact";
import { Actions } from "../index";
import { processErrors, Items } from '@veva/utils/webpackHmrStats';

// const errors = processErrors({
//   client: event.state?.client?.errors || [],
//   server: event.state?.server?.errors || [],
// })

// const warnings = processErrors({
//   client: event.state?.client?.warnings || [],
//   server: event.state?.server?.warnings || [],
// })

describe("Actions", () => {
  test("Render", async () => {
    const setFilterMock = jest.fn();
    const onExpandMock = jest.fn();
    const errors = processErrors({
      client: [
        {
          _name_: "./src/components/Text.tsx",
          _hash_:
            "bcb6c8d019604c76e004c85c5a9a0eb7.6d997015a9a71072e17843edbdb53dd8",
          file: "/Users/agpan/Github2/veva/examples/webpack/src/components/Text.tsx",
          moduleIdentifier:
            "/Users/agpan/Github2/veva/node_modules/babel-loader/lib/index.js??ruleSet[1].rules[0].use[0]!/Users/agpan/Github2/veva/node_modules/ts-loader/index.js??ruleSet[1].rules[0].use[1]!/Users/agpan/Github2/veva/examples/webpack/src/components/Text.tsx",
          moduleName: "./src/components/Text.tsx",
          loc: "5:6-7",
          message:
            "\u001b[90m[tsl] \u001b[39m\u001b[1m\u001b[31mERROR\u001b[39m\u001b[22m\u001b[1m\u001b[31m in \u001b[39m\u001b[22m\u001b[1m\u001b[36m/Users/agpan/Github2/veva/examples/webpack/src/components/Text.tsx(5,7)\u001b[39m\u001b[22m\n\u001b[1m\u001b[31m      TS2322: Type '1' is not assignable to type 'null'.\u001b[39m\u001b[22m",
        },
      ],
      server:[],
    })

    render(
      <div data-testid={"container"}>
        <Actions selectFilter={'all'} items={errors} setFilter={setFilterMock} onExpand={onExpandMock}/>
      </div>
    );
    expect(screen.getByTestId("container").innerHTML).not.toBe("");
    expect(screen.getByTestId("filters").innerHTML).toBe("");
  });

  test("Render with filter", async () => {
    const setFilterMock = jest.fn();
    const onExpandMock = jest.fn();
    const errors = processErrors({
      client: [
        {
          _name_: "./src/components/Text.tsx",
          _hash_:
            "bcb6c8d019604c76e004c85c5a9a0eb7.6d997015a9a71072e17843edbdb53dd8",
          file: "/Users/agpan/Github2/veva/examples/webpack/src/components/Text.tsx",
          moduleIdentifier:
            "/Users/agpan/Github2/veva/node_modules/babel-loader/lib/index.js??ruleSet[1].rules[0].use[0]!/Users/agpan/Github2/veva/node_modules/ts-loader/index.js??ruleSet[1].rules[0].use[1]!/Users/agpan/Github2/veva/examples/webpack/src/components/Text.tsx",
          moduleName: "./src/components/Text.tsx",
          loc: "5:6-7",
          message:
            "\u001b[90m[tsl] \u001b[39m\u001b[1m\u001b[31mERROR\u001b[39m\u001b[22m\u001b[1m\u001b[31m in \u001b[39m\u001b[22m\u001b[1m\u001b[36m/Users/agpan/Github2/veva/examples/webpack/src/components/Text.tsx(5,7)\u001b[39m\u001b[22m\n\u001b[1m\u001b[31m      TS2322: Type '1' is not assignable to type 'null'.\u001b[39m\u001b[22m",
        },
      ],
      server:[
        {
          _name_: "./src/components/Text.tsx",
          _hash_:
            "bcb6c8d019604c76e004c85c5a9a0eb7.6d997015a9a71072e17843edbdb53dd8",
          file: "/Users/agpan/Github2/veva/examples/webpack/src/components/Text.tsx",
          moduleIdentifier:
            "/Users/agpan/Github2/veva/node_modules/babel-loader/lib/index.js??ruleSet[1].rules[0].use[0]!/Users/agpan/Github2/veva/node_modules/ts-loader/index.js??ruleSet[1].rules[0].use[1]!/Users/agpan/Github2/veva/examples/webpack/src/components/Text.tsx",
          moduleName: "./src/components/Text.tsx",
          loc: "5:6-7",
          message:
            "\u001b[90m[tsl] \u001b[39m\u001b[1m\u001b[31mERROR\u001b[39m\u001b[22m\u001b[1m\u001b[31m in \u001b[39m\u001b[22m\u001b[1m\u001b[36m/Users/agpan/Github2/veva/examples/webpack/src/components/Text.tsx(5,7)\u001b[39m\u001b[22m\n\u001b[1m\u001b[31m      TS2322: Type '1' is not assignable to type 'null'.\u001b[39m\u001b[22m",
        },
      ],
    })

    render(
      <div data-testid={"container"}>
        <Actions selectFilter={'all'} items={errors} setFilter={setFilterMock} onExpand={onExpandMock}/>
      </div>
    );
    expect(screen.getByTestId("filters").innerHTML).not.toBe("");
  });

  test("Events", async () => {
    const setFilterMock = jest.fn();
    const onExpandMock = jest.fn();
    const errors = processErrors({
      client: [
        {
          _name_: "./src/components/Text.tsx",
          _hash_:
            "bcb6c8d019604c76e004c85c5a9a0eb7.6d997015a9a71072e17843edbdb53dd8",
          file: "/Users/agpan/Github2/veva/examples/webpack/src/components/Text.tsx",
          moduleIdentifier:
            "/Users/agpan/Github2/veva/node_modules/babel-loader/lib/index.js??ruleSet[1].rules[0].use[0]!/Users/agpan/Github2/veva/node_modules/ts-loader/index.js??ruleSet[1].rules[0].use[1]!/Users/agpan/Github2/veva/examples/webpack/src/components/Text.tsx",
          moduleName: "./src/components/Text.tsx",
          loc: "5:6-7",
          message:
            "\u001b[90m[tsl] \u001b[39m\u001b[1m\u001b[31mERROR\u001b[39m\u001b[22m\u001b[1m\u001b[31m in \u001b[39m\u001b[22m\u001b[1m\u001b[36m/Users/agpan/Github2/veva/examples/webpack/src/components/Text.tsx(5,7)\u001b[39m\u001b[22m\n\u001b[1m\u001b[31m      TS2322: Type '1' is not assignable to type 'null'.\u001b[39m\u001b[22m",
        },
      ],
      server:[
        {
          _name_: "./src/components/Text.tsx",
          _hash_:
            "bcb6c8d019604c76e004c85c5a9a0eb7.6d997015a9a71072e17843edbdb53dd8",
          file: "/Users/agpan/Github2/veva/examples/webpack/src/components/Text.tsx",
          moduleIdentifier:
            "/Users/agpan/Github2/veva/node_modules/babel-loader/lib/index.js??ruleSet[1].rules[0].use[0]!/Users/agpan/Github2/veva/node_modules/ts-loader/index.js??ruleSet[1].rules[0].use[1]!/Users/agpan/Github2/veva/examples/webpack/src/components/Text.tsx",
          moduleName: "./src/components/Text.tsx",
          loc: "5:6-7",
          message:
            "\u001b[90m[tsl] \u001b[39m\u001b[1m\u001b[31mERROR\u001b[39m\u001b[22m\u001b[1m\u001b[31m in \u001b[39m\u001b[22m\u001b[1m\u001b[36m/Users/agpan/Github2/veva/examples/webpack/src/components/Text.tsx(5,7)\u001b[39m\u001b[22m\n\u001b[1m\u001b[31m      TS2322: Type '1' is not assignable to type 'null'.\u001b[39m\u001b[22m",
        },
      ],
    })

    render(
      <div data-testid={"container"}>
        <Actions selectFilter={'all'} items={errors} setFilter={setFilterMock} onExpand={onExpandMock}/>
      </div>
    );

    screen.getByTestId('expand-all').click();
    screen.getByTestId('collapse-all').click();
    expect(onExpandMock.mock.calls.length).toBe(2);
    expect(onExpandMock.mock.calls[0][0]).toBe(true);
    expect(onExpandMock.mock.calls[1][0]).toBe(false);

    // check (default all)
    expect(screen.getByTestId('filter-all').className.includes('active')).toBe(true)
    expect(setFilterMock.mock.calls.length).toBe(0);

    // selected filter dont call setFilter
    screen.getByTestId('filter-all').click();
    expect(setFilterMock.mock.calls.length).toBe(0);

    // select client
    screen.getByTestId('filter-client').click();
    expect(setFilterMock.mock.calls.length).toBe(1);
  });
});
