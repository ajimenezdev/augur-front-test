import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render, waitForElement } from "@testing-library/react";
import { act } from "@testing-library/react-hooks";
import "@testing-library/jest-dom/extend-expect";
import TokenStats from "./index";

it("renders without crashing", () => {
  const component = renderer.create(
    <TokenStats token="" tokenStats={{}} onForceRefresh={() => {}} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders with arguments all values properly", () => {
  act(() => {
    const { getByText, getByLabelText } = render(
      <TokenStats
        token="0x1985365e9f78359a9b6ad760e32412f4a445e862"
        tokenStats={{
          averageTx: 1230000000000000000,
          averageTxFetching: false,
          medianTx: 3210000000000000000,
          medianTxFetching: false,
          richestAcc: "0x1985365e9f78359a9b6ad760e32412f4a445e872",
          richestAccFetching: false,
          mostActiveAcc: "0x1985365e9f78359a9b6ad760e32412f4a445e863",
          mostActiveAccFetching: false
        }}
        onForceRefresh={() => {}}
      />
    );

    expect(getByText(/0x1985365e9f78359a9b6ad760e32412f4a445e862/i));
    expect(getByLabelText("token-average")).toHaveTextContent("1.23");
    expect(getByLabelText("token-median")).toHaveTextContent("3.21");
    expect(getByLabelText("token-richest")).toHaveTextContent(
      "0x1985365e9f78359a9b6ad760e32412f4a445e872"
    );
    expect(getByLabelText("token-mostActive")).toHaveTextContent(
      "0x1985365e9f78359a9b6ad760e32412f4a445e863"
    );
  });
});

it("execute callback when button is clicked", async () => {
  await act(async () => {
    const mockRefresh = jest.fn();
    const { getByLabelText, container } = render(
      <TokenStats
        token="0x1985365e9f78359a9b6ad760e32412f4a445e862"
        tokenStats={{
          averageTx: 1230000000000000000,
          averageTxFetching: false,
          medianTx: 3210000000000000000,
          medianTxFetching: false,
          richestAcc: "0x1985365e9f78359a9b6ad760e32412f4a445e872",
          richestAccFetching: false,
          mostActiveAcc: "0x1985365e9f78359a9b6ad760e32412f4a445e863",
          mostActiveAccFetching: false
        }}
        onForceRefresh={mockRefresh}
      />
    );

    const buttonRefresh = getByLabelText("refresh-tokenStats");
    fireEvent.click(buttonRefresh);

    expect(mockRefresh.mock.calls.length).toBe(1);
  });
});
