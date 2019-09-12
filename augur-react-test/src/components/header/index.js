import React from "react";
import PropTypes from "prop-types";
import { IconButton, Icon } from "@material-ui/core";
import "./header.css";

const Header = ({ token, onTokenChange }) => {
  return (
    <header className="header">
      <span className="header-title">Header</span>
      <div className="header-token">
        <span>Token: {token}</span>
        <IconButton aria-label="change-token">
          <Icon className="header-editIcon">edit</Icon>
        </IconButton>
      </div>
    </header>
  );
};

Header.propTypes = {
  token: PropTypes.string,
  onTokenChange: PropTypes.func
};

export default Header;
