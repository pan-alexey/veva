import { h } from "preact";
import { render, fireEvent, screen, waitFor } from "@testing-library/preact";
import App from "~/app";

describe("Counter", () => {
  test("Empty error", async () => {
    render(
      <div data-testid={"app"}>
        <App />
      </div>
    );
    expect(screen.getByTestId("app").innerHTML).toBe("");
  });

  test("Hide panel", async () => {
    const errors = [
      {
        key: "",
        name: "",
        message: "error",
        isServer: true,
        isClinet: true,
      },
    ];
    render(
      <div data-testid={"app"}>
        <App
          initState={{
            errors,
            warnings: [],
          }}
        />
      </div>
    );
    expect(screen.getByTestId("app").innerHTML).not.toBe("");

    fireEvent.click(screen.getByTestId("navbar-close"));
    await waitFor(() => {
      expect(screen.getByTestId("app").innerHTML).toBe("");
    });
  });

  test("Hide panel", async () => {
    render(
      <div data-testid={"app"}>
        <App />
      </div>
    );

    fireEvent(
      document,
        new CustomEvent("__webpack_hmr_sever__", {
          cancelable: true,
          bubbles: true,
          detail: {
            resourceQuery: "",
            message: "Build with error",
            refresh: false,
            hotEnable: true,
            state: {
              client: {
                hash: "20e345897dba0a2e95e9",
                time: 396,
                warnings: [],
                errors: [
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
              },
            },
            action: "build",
            modules: [],
          },
        })
      );

    await waitFor(() => {
      expect(screen.getByTestId("app").innerHTML).not.toBe("");
    });
  });
});
