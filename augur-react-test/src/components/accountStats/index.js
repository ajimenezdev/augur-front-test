import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  IconButton,
  Icon,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button
} from "@material-ui/core";
import BigNumber from "bignumber.js";
import "./accountStats.css";

const AccountStats = ({
  account,
  accountStats,
  onAccountChange,
  onForceRefresh
}) => {
  const { balance, balanceFetching } = accountStats;
  const [editVisible, setEditVisible] = useState(false);
  const [newAccount, setNewAccount] = useState("");
  return (
    <Fragment>
      <Card className="accountStats">
        <CardHeader
          title="Account Stats"
          subheader={account}
          action={
            <Fragment>
              <IconButton
                aria-label="refresh-accountStats"
                onClick={() => setEditVisible(true)}
              >
                <Icon className="accountStats-refreshIcon">edit</Icon>
              </IconButton>
              <IconButton
                aria-label="refresh-accountStats"
                onClick={onForceRefresh}
              >
                <Icon className="accountStats-refreshIcon">refresh</Icon>
              </IconButton>
            </Fragment>
          }
        />
        <CardContent className="accountStats-content">
          <div className="accountStats-infoRow">
            <span className="accountStats-label">Balance:</span>
            {balanceFetching ? (
              <CircularProgress size={20} />
            ) : (
              <span className="accountStats-value">
                {balance &&
                  BigNumber(balance)
                    .dividedBy(BigNumber(10).exponentiatedBy(18))
                    .toFormat(2)}
              </span>
            )}
          </div>
          <Divider />
        </CardContent>
      </Card>
      <Dialog
        open={editVisible}
        onClose={() => setEditVisible(false)}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Change Account</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="account"
            label="Account address"
            type="text"
            onChange={event => setNewAccount(event.target.value)}
            value={newAccount}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditVisible(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              setEditVisible(false);
              onAccountChange(newAccount);
            }}
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

AccountStats.propTypes = {};

export default AccountStats;
