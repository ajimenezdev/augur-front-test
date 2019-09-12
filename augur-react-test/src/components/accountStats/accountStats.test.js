import React from "react";
import renderer from "react-test-renderer";
import { fireEvent, render, waitForElement } from "@testing-library/react";
import { act } from "@testing-library/react-hooks";
import "@testing-library/jest-dom/extend-expect";
import AccountStats from "./index";

it("renders without crashing", () => {
  const component = renderer.create(
    <AccountStats
      account=""
      accountStats={{}}
      onAccountChange={() => {}}
      onForceRefresh={() => {}}
    />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

it("renders with arguments all values properly", () => {
  act(() => {
    const { getByText, getByLabelText } = render(
      <AccountStats
        account="0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98"
        accountStats={{
          balance: 1230000000000000000,
          balanceFetching: false,
          transactionsCount: { outgoingTx: 10, incomingTx: 15 },
          transactionsCountFetching: false
        }}
        onAccountChange={() => {}}
        onForceRefresh={() => {}}
      />
    );

    expect(getByText(/0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98/i));
    expect(getByLabelText("account-balance")).toHaveTextContent("1.23");
    expect(getByLabelText("account-incoming")).toHaveTextContent("15");
    expect(getByLabelText("account-outgoing")).toHaveTextContent("10");
  });
});

it("execute callback when button is clicked", async () => {
  await act(async () => {
    const mockAccount = jest.fn();
    const mockRefresh = jest.fn();
    const { getByLabelText, container } = render(
      <AccountStats
        account="0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98"
        accountStats={{
          balance: 1230000000000000000,
          balanceFetching: false,
          transactionsCount: { outgoingTx: 10, incomingTx: 15 },
          transactionsCountFetching: false
        }}
        onAccountChange={mockAccount}
        onForceRefresh={mockRefresh}
      />
    );

    const buttonRefresh = getByLabelText("refresh-accountStats");
    fireEvent.click(buttonRefresh);

    expect(mockAccount.mock.calls.length).toBe(0);
    expect(mockRefresh.mock.calls.length).toBe(1);

    const buttonEdit = getByLabelText("edit-account");
    fireEvent.click(buttonEdit);

    await waitForElement(() => getByLabelText("address"), {
      container
    });

    fireEvent.change(getByLabelText("address"), {
      target: { value: "0xc350de406f54271c0e025bf72855418d65f8bcbc" }
    });
    const buttonSave = getByLabelText("save-button");
    fireEvent.click(buttonSave);

    expect(mockRefresh.mock.calls.length).toBe(1);
    expect(mockAccount.mock.calls.length).toBe(1);
  });
});
