import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  IconButton,
  Icon,
  CircularProgress
} from "@material-ui/core";
import "./tokenStats.css";

const TokenStats = ({ token, tokenStats, onForceRefresh }) => {
  const {
    averageTx,
    averageTxFetching,
    medianTx,
    medianTxFetching,
    richestAcc,
    richestAccFetching,
    mostActiveAcc,
    mostActiveAccFetching
  } = tokenStats;
  return (
    <Card>
      <CardHeader
        title="Token Stats"
        subheader={token}
        action={
          <IconButton
            aria-label="refresh-accountStats"
            onClick={onForceRefresh}
          >
            <Icon className="accountStats-refreshIcon">refresh</Icon>
          </IconButton>
        }
      />
      <CardContent className="tokenStats-content">
        <div className="tokenStats-infoRow">
          <span className="tokenStats-label">Average Token Transaction:</span>
          {averageTxFetching ? (
            <CircularProgress size={20} />
          ) : (
            <span className="tokenStats-value">{averageTx}</span>
          )}
        </div>
        <Divider variant="fullWidth" />
        <div className="tokenStats-infoRow">
          <span className="tokenStats-label">Median Token Transaction:</span>
          {medianTxFetching ? (
            <CircularProgress size={20} />
          ) : (
            <span className="tokenStats-value">{medianTx}</span>
          )}
        </div>
        <Divider variant="fullWidth" />
        <div className="tokenStats-infoRow">
          <span className="tokenStats-label">Richest Token holder:</span>
          {richestAccFetching ? (
            <CircularProgress size={20} />
          ) : (
            <span className="tokenStats-value">{richestAcc}</span>
          )}
        </div>
        <Divider variant="fullWidth" />
        <div className="tokenStats-infoRow">
          <span className="tokenStats-label">MostActive Token holder:</span>
          {mostActiveAccFetching ? (
            <CircularProgress size={20} />
          ) : (
            <span className="tokenStats-value">{mostActiveAcc}</span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

TokenStats.propTypes = {};

export default TokenStats;
