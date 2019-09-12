import React, { useEffect, useReducer } from "react";
import { Header, Footer, TokenStats, AccountStats } from "./components";
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
  const [state, dispatch] = useReducer(reducer, initialState);
  const { selectedToken, tokenStats, selectedAccount, accountStats } = state;
  useEffect(() => {
    refreshTokenStats(dispatch, selectedToken);
  }, [selectedToken]);

  useEffect(() => {
    refreshAccountStats(dispatch, selectedToken, selectedAccount);
  }, [selectedToken, selectedAccount]);

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
      <Footer />
    </div>
  );
}

export default App;
