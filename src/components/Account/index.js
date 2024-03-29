import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box, Grid } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useSelector, useDispatch } from "react-redux";
import "@fontsource/roboto";
import PositionTable from "./PositionTable";
import OrderHistory from "./OrderHistory/OrderHistory";
import PieAllocate from "./AllocationChart";
import RebalanceButton from "./RebalanceButton";
import PerformanceChart from "./PerformanceChart";
import { updateTotalTargetPercentageActionCreator } from "../../store/totalTargetPercentage";

const useStyles = makeStyles({
  alert: { marginRight: "1rem" },
  alertItemGrid: { padding: 0 },
  alertGrid: { margin: 0 },
  amount: { fontSize: "2rem" },
  header: {},
  overline: { padding: ".5rem 0rem 0rem 0rem", fontSize: "small" },
});

const Account = () => {
  const dispatch = useDispatch();
  const account = useSelector((state) => state.account);
  const positions = useSelector((state) => state.positions);
  const orders = useSelector((state) => state.orders);
  const totalTargetPercentage = useSelector(
    (state) => state.totalTargetPercentage
  );
  const [alertText, setAlertText] = useState("");
  const [displayAlert, setDisplayAlert] = useState(false);
  const [pendingTrades, setPendingTrades] = useState(false);
  const [portfolioValue, setPortfolioValue] = useState(account.portfolio_value);
  const classes = useStyles();

  useEffect(() => {
    const { portfolio_value } = account;
    var formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });

    if (portfolio_value) {
      const portfolioValueUsd = formatter.format(portfolio_value);
      setPortfolioValue(portfolioValueUsd);
    }
  }, [account]);

  useEffect(() => {
    const mapped = positions.map((position) => position.tgtPct);
    const totalTargetPercentages = mapped.reduce(
      (sum, curr) => (sum += curr),
      0
    );
    if (totalTargetPercentages !== 0) {
      dispatch(
        updateTotalTargetPercentageActionCreator(totalTargetPercentages)
      );
    }
  }, [positions, dispatch]);

  useEffect(() => {
    if (totalTargetPercentage !== 100) {
      setAlertText(determineAlert(totalTargetPercentage));
      setDisplayAlert(true);
    } else if (pendingTrades === true) {
      setAlertText(
        "Please wait until all pending trades have been filled before you rebalance again."
      );
      setDisplayAlert(true);
    } else {
      setDisplayAlert(false);
    }
  }, [totalTargetPercentage, pendingTrades]);

  useEffect(() => {
    const mostRecentOrder = orders[0];
    if (mostRecentOrder) {
      if (mostRecentOrder.status !== "filled") {
        setPendingTrades(true);
      }
    }
  }, [orders]);

  const determineAlert = (totalTargetPercentage) => {
    if (totalTargetPercentage > 100) {
      return `Your total target allocation is off by ${parseInt(
        Math.round(totalTargetPercentage - 100)
      )}%`;
    } else if (totalTargetPercentage < 100) {
      return `Your total target allocation is off by -${Math.abs(
        totalTargetPercentage - 100
      )
        .toString()
        .slice(0, 2)}%`;
    }
  };

  return (
    <div id="account">
      <Typography className={classes.overline} variant="body1">
        PORTFOLIO VALUE
      </Typography>
      <div>
        <Grid
          className={classes.header}
          container
          direction="row"
          justifyContent="space-between"
        >
          <Grid item xs={5} xl={7}>
            <Typography className={classes.amount} p={1} color="primary">
              {portfolioValue}
            </Typography>
          </Grid>
          <Grid
            className={classes.alertGrid}
            item
            container
            xs={7}
            xl={5}
            direction="row"
            justifyContent="flex-end"
            alignItems="center"
          >
            <Grid className={classes.alertItemGrid} item xs={10}>
              {displayAlert ? (
                <Alert
                  className={classes.alert}
                  elevation={6}
                  variant="filled"
                  severity="error"
                >
                  {alertText}
                </Alert>
              ) : (
                ""
              )}
            </Grid>
            <Grid item xs={2}>
              <RebalanceButton p={1} />
            </Grid>
          </Grid>
        </Grid>
        <Typography p={1} variant="subtitle1">
          Here&apos;s where your portfolio stands today.
        </Typography>
        <Box
          display="flex"
          justifyContent="space-between"
          flexDirection="row"
          marginTop={1.5}
        >
          <Grid item xs={10}>
            <PositionTable />
          </Grid>
          <PieAllocate />
        </Box>
        <Grid container>
          <Grid item xs={6}>
            <PerformanceChart />
          </Grid>
          <Grid item xs={6}>
            <OrderHistory p={1} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Account;
