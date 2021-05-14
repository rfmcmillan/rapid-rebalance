import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, loadOrders } from '../../store/orders';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  Divider,
  ListItemText,
  Snackbar,
  Slider,
} from '@material-ui/core';
import { MarkunreadSharp } from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
  dialogList: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    borderRadius: 20,
  },
}));

const LowFrequencyDialog = (props) => {
  const [open, setOpen] = React.useState(false);
  const { trades } = props;
  console.log(trades);

  const dispatch = useDispatch();

  const handleClickOpen = async () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    setOpen(true);
  };

  // const handleSubmit = async () => {
  //   console.log('upon clicking submit: proposedOrders:', trades);
  //   await trades.forEach((order) => {
  //     const { symbol, tradeAmt, side, type, time_in_force } = order;
  //     dispatch(createOrder(symbol, tradeAmt, side, type, time_in_force));
  //   });

  //   setOpen(true);
  // };

  const useStyles = makeStyles({
    root: {
      width: 300,
    },
  });

  function valuetext(value) {
    return `Every ${value} months`;
  }
  const marks = [
    {
      value: 1,
      label: 'Every 1 Month',
    },
    {
      value: 3,
      label: 'Every 3 Months',
    },
    {
      value: 6,
      label: 'Every 6 Months',
    },
    {
      value: 12,
      label: 'Every 12 Months',
    },
    {
      value: 12,
      label: 'Every 12 months',
    },
  ];
  const classes = useStyles();
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        // className={classes.button}
        onClick={handleSubmit}
      >
        Low Frequency Mode
      </Button>

      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`How infrequently would you like your rebalancing to occur? `}
        </DialogTitle>
        <DialogContent>
          <Typography id="discrete-slider">Infrequency</Typography>
          <Slider
            defaultValue={3}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            marks
            step={1}
            min={1}
            max={12}
            // marks={marks}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">
            Cancel
          </Button>
          {/* <SnackbarLowFrequency trades={proposedOrders} /> */}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LowFrequencyDialog;