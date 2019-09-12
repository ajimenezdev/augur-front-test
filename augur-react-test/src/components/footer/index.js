import React from "react";
import { Icon, IconButton } from "@material-ui/core";

import "./footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer-author">
        created by:
        <a
          href="https://alvarojimenezmartin.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Alvaro Jimenez Martin
        </a>
      </p>
      <IconButton
        aria-label="open"
        onClick={() =>
          window.open(
            "https://github.com/ajimenezdev/augur-front-test",
            "_blank"
          )
        }
      >
        <div className="footer-sourceContainer">
          <Icon className="footer-sourceIcon">code</Icon>
          <span className="footer-sourceText">Source Code</span>
        </div>
      </IconButton>
    </footer>
  );
};

export default Footer;
