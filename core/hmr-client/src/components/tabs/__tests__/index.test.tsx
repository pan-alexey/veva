import { h } from "preact";
import { render, fireEvent, screen, waitFor } from "@testing-library/preact";
import { Tabs, TabProps } from "../index";

describe("Tabs", () => {
  test("Render", async () => {
    render(
      <div data-testid={"container"}>
        <Tabs tabs={[]} activeTab={0} setTabs={(index)=>{}}/>
      </div>
    );
    expect(screen.getByTestId("container").innerHTML).not.toBe("");
  });

  test("Render tabs", async () => {
    const mockOnClick = jest.fn();
    const tabs = [{
        title: 'test-tab-1',
        description: 'test-tab-descriptions',
      },
      {
        title: 'test-tab-1',
        description: 'test-tab-descriptions',
      }
    ];
    render(
      <div data-testid={"container"}>
        <Tabs tabs={tabs} activeTab={0} setTabs={mockOnClick}/>
      </div>
    );

    const renderTabs = await screen.findAllByTestId('tab');
    expect(renderTabs.length).toBe(2);

    await renderTabs[0].click();
    await renderTabs[1].click();

    expect(mockOnClick.mock.calls.length).toBe(1);
    expect(mockOnClick.mock.calls[0][0]).toBe(1);
  });
});
