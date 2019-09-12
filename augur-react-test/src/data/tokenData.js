const BASE_URL = "http://localhost:8080";

const initialState = {
  selectedToken: null,
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
  selectedAccount: null,
  accountStats: {
    balance: null,
    balanceFetching: false
  }
};

const actions = {
  setToken: "set_token",
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
    case action.fetchTokenStats:
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
    case action.setAvgTx:
      return {
        ...state,
        tokenStats: {
          ...state.tokenStats,
          averageTxFetching: false,
          averageTx: action.averageTx
        }
      };
    case action.setMedTx:
      return {
        ...state,
        tokenStats: {
          ...state.tokenStats,
          medianTxFetching: false,
          medianTx: action.medianTx
        }
      };
    case action.setRichestAcc:
      return {
        ...state,
        tokenStats: {
          ...state.tokenStats,
          richestAccFetching: false,
          richestAcc: action.richestAcc
        }
      };
    case action.setMostActAcc:
      return {
        ...state,
        tokenStats: {
          ...state.tokenStats,
          mostActiveAccFetching: false,
          mostActiveAcc: action.mostActiveAcc
        }
      };

    case action.setAccount:
      return { ...state, selectedAccount: action.account };
    case action.fetchAccountStats:
      return {
        ...state,
        accountStats: { ...state.accountStats, balanceFetching: true }
      };
    case action.setAccountBalance:
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

const fetchTokenStats = (dispatch, token) => {
  // set fetching variables to true
  dispatch({ type: actions.fetchTokenStats });

  // Fetch asynchronously all data points
  fetch(`${BASE_URL}/${token}/stats/average`)
    .then(response => response.json())
    .then(data => console.log("average", data));

  fetch(`${BASE_URL}/${token}/stats/median`)
    .then(response => response.json())
    .then(data => console.log("median", data));

  fetch(`${BASE_URL}/${token}/stats/richest`)
    .then(response => response.json())
    .then(data => console.log("richest", data));

  fetch(`${BASE_URL}/${token}/stats/mostActive`)
    .then(response => response.json())
    .then(data => console.log("mostActive", data));
};

const setAccount = (dispatch, account) =>
  dispatch({ type: actions.setToken, account });

const fetchAccountStats = (dispatch, token, account) => {
  // set fetching variables to true
  dispatch({ type: actions.fetchTokenStats });

  // Fetch asynchronously all data points
  fetch(`${BASE_URL}/${token}/account/${account}/balance`)
    .then(response => response.json())
    .then(data => console.log("balance", data));
};

export {
  reducer,
  initialState,
  setToken,
  fetchTokenStats,
  setAccount,
  fetchAccountStats
};
