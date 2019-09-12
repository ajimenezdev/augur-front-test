import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import {
  IconButton,
  Icon,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button
} from "@material-ui/core";
import "./header.css";

const Header = ({ token, onTokenChange }) => {
  const [editVisible, setEditVisible] = useState(false);
  const [newToken, setNewToken] = useState("");
  return (
    <Fragment>
      <header className="header">
        <span className="header-title">Header</span>
        <div className="header-token">
          <span>Token: {token}</span>
          <IconButton
            aria-label="change-token"
            onClick={() => setEditVisible(true)}
          >
            <Icon className="header-editIcon">edit</Icon>
          </IconButton>
        </div>
      </header>
      <Dialog
        open={editVisible}
        onClose={() => setEditVisible(false)}
        aria-labelledby="form-dialog-title"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Change Token</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="token"
            label="Token address"
            inputProps={{ "aria-label": "token" }}
            type="text"
            onChange={event => setNewToken(event.target.value)}
            value={newToken}
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
              onTokenChange(newToken);
            }}
            aria-label="save-button"
            color="primary"
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

Header.propTypes = {
  token: PropTypes.string,
  onTokenChange: PropTypes.func
};

export default Header;
