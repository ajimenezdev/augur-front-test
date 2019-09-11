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
// import "./tokenStats.css";

const AccountStats = () => {
  return (
    <Card>
      <CardHeader
        title="Account Stats"
        subheader="0x200a328032c81691da4b29c824558ee85ad95d29"
        action={
          <IconButton aria-label="refresh-accountStats">
            <Icon className="accountStats-refreshIcon">refresh</Icon>
          </IconButton>
        }
      />
      <CardContent className="accountStats-content">
        <div className="accountStats-infoRow">
          <span className="accountStats-label">Balance:</span>
          <span className="accountStats-value">31824654531310477000</span>
        </div>
      </CardContent>
    </Card>
  );
};

AccountStats.propTypes = {};

export default AccountStats;
