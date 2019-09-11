import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  IconButton,
  Icon
} from "@material-ui/core";
import "./tokenStats.css";

const TokenStats = () => {
  return (
    <Card>
      <CardHeader
        title="Token Stats"
        subheader="0x1985365e9f78359a9b6ad760e32412f4a445e862"
        action={
          <IconButton aria-label="refresh-accountStats">
            <Icon className="accountStats-refreshIcon">refresh</Icon>
          </IconButton>
        }
      />
      <CardContent className="tokenStats-content">
        <div className="tokenStats-infoRow">
          <span className="tokenStats-label">Average Token Transaction:</span>
          <span className="tokenStats-value">
            217023590637280046407.41185994737907306213
          </span>
        </div>
        <Divider variant="fullWidth" />
        <div className="tokenStats-infoRow">
          <span className="tokenStats-label">Median Token Transaction:</span>
          <span className="tokenStats-value">2.2471899999149414e+21</span>
        </div>
        <Divider variant="fullWidth" />
        <div className="tokenStats-infoRow">
          <span className="tokenStats-label">Richest Token holder:</span>
          <span className="tokenStats-value">
            0xfbb1b73c4f0bda4f67dca266ce6ef42f520fbb98
          </span>
        </div>
        <Divider variant="fullWidth" />
        <div className="tokenStats-infoRow">
          <span className="tokenStats-label">MostActive Token holder:</span>
          <span className="tokenStats-value">
            0x200a328032c81691da4b29c824558ee85ad95d29
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

TokenStats.propTypes = {};

export default TokenStats;
