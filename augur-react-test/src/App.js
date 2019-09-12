import React, { useState, useEffect, useReducer } from "react";
import { Header, Footer, TokenStats, AccountStats } from "./components";
import { Snackbar, IconButton, Icon } from "@material-ui/core";
import {
  reducer,
  initialState,
  setToken,
  fetchTokenStats,
  setAccount,
  fetchAccountStats
} from "./data/tokenData";

import "./App.css";

const refreshTokenStats = (dispatch, token) => {
  if (token) fetchTokenStats(dispatch, token);
};
const refreshAccountStats = (dispatch, token, account) => {
  if (token && account) fetchAccountStats(dispatch, token, account);
};

function App() {
  const [error, setError] = useState("");
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    selectedToken,
    tokenStats,
    selectedAccount,
    accountStats,
    selectedTokenError
  } = state;

  // Control refresh on token to trigger update
  useEffect(() => {
    refreshTokenStats(dispatch, selectedToken);
  }, [selectedToken]);

  // Control refresh on account to trigger update
  useEffect(() => {
    refreshAccountStats(dispatch, selectedToken, selectedAccount);
  }, [selectedToken, selectedAccount]);

  // Control changes of selectedTokenError to True to display message
  useEffect(() => {
    if (selectedTokenError) setError("Token entered is invalid");
  }, [selectedTokenError]);

  return (
    <div className="App">
      <Header
        token={selectedToken}
        onTokenChange={token => setToken(dispatch, token)}
      />
      <div className="App-content">
        <TokenStats
          token={selectedToken}
          tokenStats={tokenStats}
          onForceRefresh={() => refreshTokenStats(dispatch, selectedToken)}
        />
        <AccountStats
          account={selectedAccount}
          accountStats={accountStats}
          onAccountChange={account => setAccount(dispatch, account)}
          onForceRefresh={() =>
            refreshAccountStats(dispatch, selectedToken, selectedAccount)
          }
        />
      </div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left"
        }}
        open={error}
        autoHideDuration={6000}
        onClose={() => setError("")}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">{error}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={() => setError("")}
          >
            <Icon>close</Icon>
          </IconButton>
        ]}
      />
      <Footer />
    </div>
  );
}

export default App;
