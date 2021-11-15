import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import SnackbarLowFrequency from '../SnackbarLowFrequency/SnackbarLowFrequency';
import {
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slider,
} from '@material-ui/core';

const LowFrequencyDialog = (props) => {
  const [open, setOpen] = React.useState(false);
  const [monthFrequency, setMonthFrequency] = React.useState(3);
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

  const onChange = (ev) => {
    setMonthFrequency(ev.target.ariaValueNow * 1);
  };

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
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`How often (in months) would you like your rebalancing to occur? `}
        </DialogTitle>
        <DialogContent>
          <Typography id="discrete-slider">Frequency</Typography>
          <Slider
            defaultValue={3}
            getAriaValueText={valuetext}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            marks
            step={1}
            min={1}
            max={12}
            onChange={onChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="secondary">
            Cancel
          </Button>
          <SnackbarLowFrequency monthFrequency={monthFrequency} />
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default LowFrequencyDialog;
