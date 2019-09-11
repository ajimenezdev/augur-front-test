import React from "react";
import PropTypes from "prop-types";
import { IconButton, Icon } from "@material-ui/core";
import "./header.css";

const Header = () => {
  return (
    <header className="header">
      <span className="header-title">Header</span>
      <div className="header-token">
        <span>Token: 0x1985365e9f78359a9b6ad760e32412f4a445e862</span>
        <IconButton aria-label="change-token">
          <Icon className="header-editIcon">edit</Icon>
        </IconButton>
      </div>
    </header>
  );
};

Header.propTypes = {};

export default Header;
