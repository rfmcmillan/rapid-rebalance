import React from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder, loadOrders } from '../../store/orders';
import { createFutureOrder } from '../../store/futureOrders';
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
} from '@material-ui/core';

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

const SnackbarLowFrequency = (props) => {
  const [open, setOpen] = React.useState(false);
  const { monthFrequency } = props;
  console.log(monthFrequency);

  const dispatch = useDispatch();

  const handleCancel = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    // dispatch(createFutureOrder(monthFrequency));
    console.log(monthFrequency);
    setOpen(true);
  };

  const classes = useStyles();
  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleSubmit}
      >
        Submit
      </Button>
      <Snackbar
        open={open}
        message="Your portfolio rebalancing schedule has been set."
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      />
    </div>
  );
};

export default SnackbarLowFrequency;
