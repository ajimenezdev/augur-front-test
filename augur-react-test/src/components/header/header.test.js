import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render, waitForElement } from "@testing-library/react";
import { act } from "@testing-library/react-hooks";
import Header from "./index";

it("renders without crashing", () => {
  const component = renderer.create(
    <Header token="" onTokenChange={() => {}} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders token address passed", () => {
  act(() => {
    const { getByText } = render(
      <Header
        token="0x1985365e9f78359a9b6ad760e32412f4a445e862"
        onTokenChange={() => {}}
      />
    );

    expect(getByText(/0x1985365e9f78359a9b6ad760e32412f4a445e862/i));
  });
});

it("execute callback when button is clicked", async () => {
  await act(async () => {
    const mockToken = jest.fn();
    const { getByLabelText, container } = render(
      <Header
        token="0x1985365e9f78359a9b6ad760e32412f4a445e862"
        onTokenChange={mockToken}
      />
    );

    const buttonChange = getByLabelText("change-token");
    fireEvent.click(buttonChange);

    await waitForElement(() => getByLabelText("token"), {
      container
    });

    fireEvent.change(getByLabelText("token"), {
      target: { value: "0xc350de406f54271c0e025bf72855418d65f8bcbc" }
    });
    const buttonSave = getByLabelText("save-button");
    fireEvent.click(buttonSave);

    expect(mockToken.mock.calls.length).toBe(1);
  });
});
