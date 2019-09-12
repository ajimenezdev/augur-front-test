const BASE_URL = "http://localhost:8080";

const initialState = {
  selectedToken: "0x1985365e9f78359a9b6ad760e32412f4a445e862",
  selectedTokenError: false,
  tokenStats: {
    averageTx: null,
    averageTxFetching: false,
    medianTx: null,
    medianTxFetching: false,
    richestAcc: null,
    richestAccFetching: false,
    mostActiveAcc: null,
    mostActiveAccFetching: false
  },
  selectedAccount: "0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98",
  accountStats: {
    balance: null,
    balanceFetching: false
  }
};

const actions = {
  setToken: "set_token",
  setTokenError: "set_token_error",
  fetchTokenStats: "fetch_token_stats",
  setAvgTx: "set_avg_tx",
  setMedTx: "set_med_tx",
  setRichestAcc: "set_richest_acc",
  setMostActAcc: "set_mostAct_acc",

  setAccount: "set_account",
  fetchAccountStats: "fetch_account_stats",
  setAccountBalance: "set_account_balance"
};

const reducer = (state, action) => {
  switch (action.type) {
    case actions.setToken:
      return { ...state, selectedToken: action.token };
    case actions.setTokenError:
      return { ...state, selectedTokenError: action.error };
    case actions.fetchTokenStats:
      return {
        ...state,
        tokenStats: {
          ...state.tokenStats,
          averageTxFetching: true,
          medianTxFetching: true,
          richestAccFetching: true,
          mostActiveAccFetching: true
        }
      };
    case actions.setAvgTx:
      return {
        ...state,
        tokenStats: {
          ...state.tokenStats,
          averageTxFetching: false,
          averageTx: action.averageTx
        }
      };
    case actions.setMedTx:
      return {
        ...state,
        tokenStats: {
          ...state.tokenStats,
          medianTxFetching: false,
          medianTx: action.medianTx
        }
      };
    case actions.setRichestAcc:
      return {
        ...state,
        tokenStats: {
          ...state.tokenStats,
          richestAccFetching: false,
          richestAcc: action.richestAcc
        }
      };
    case actions.setMostActAcc:
      return {
        ...state,
        tokenStats: {
          ...state.tokenStats,
          mostActiveAccFetching: false,
          mostActiveAcc: action.mostActiveAcc
        }
      };

    case actions.setAccount:
      return { ...state, selectedAccount: action.account };
    case actions.fetchAccountStats:
      return {
        ...state,
        accountStats: { ...state.accountStats, balanceFetching: true }
      };
    case actions.setAccountBalance:
      return {
        ...state,
        accountStats: {
          ...state.accountStats,
          balanceFetching: false,
          balance: action.balance
        }
      };

    default:
      return state;
  }
};

const setToken = (dispatch, token) =>
  dispatch({ type: actions.setToken, token });

const processTokenStatsResponse = (response, dispatch) => {
  if (response.ok) {
    dispatch({ type: actions.setTokenError, error: false });
    return response.json();
  } else {
    dispatch({ type: actions.setTokenError, error: true });
  }
};

const fetchTokenStats = (dispatch, token) => {
  console.log("test:token", token);
  // set fetching variables to true
  dispatch({ type: actions.fetchTokenStats });

  // Fetch asynchronously all data points
  fetch(`${BASE_URL}/${token}/stats/average`)
    .then(response => processTokenStatsResponse(response, dispatch))
    .then(averageTx => dispatch({ type: actions.setAvgTx, averageTx }))
    .catch(e => console.log("test:e", e));

  fetch(`${BASE_URL}/${token}/stats/median`)
    .then(response => processTokenStatsResponse(response, dispatch))
    .then(medianTx => dispatch({ type: actions.setMedTx, medianTx }));

  fetch(`${BASE_URL}/${token}/stats/richest`)
    .then(response => processTokenStatsResponse(response, dispatch))
    .then(richestAcc => dispatch({ type: actions.setRichestAcc, richestAcc }));

  fetch(`${BASE_URL}/${token}/stats/mostActive`)
    .then(response => processTokenStatsResponse(response, dispatch))
    .then(mostActiveAcc =>
      dispatch({ type: actions.setMostActAcc, mostActiveAcc })
    );
};

const setAccount = (dispatch, account) =>
  dispatch({ type: actions.setAccount, account });

const fetchAccountStats = (dispatch, token, account) => {
  // set fetching variables to true
  dispatch({ type: actions.fetchAccountStats });

  // Fetch asynchronously all data points
  fetch(`${BASE_URL}/${token}/account/${account}/balance`)
    .then(response => response.json())
    .then(balance => dispatch({ type: actions.setAccountBalance, balance }));
};

export {
  reducer,
  initialState,
  setToken,
  fetchTokenStats,
  setAccount,
  fetchAccountStats
};
