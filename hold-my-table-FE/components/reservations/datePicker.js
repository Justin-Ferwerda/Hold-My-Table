import React from 'react';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { FormControl } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import PropTypes from 'prop-types';
import timeOptions from '../../utils/data/options/timeOptions';
import guestOptions from '../../utils/data/options/guestOptions';

export default function ReservationPicker({
  dateValue, dateHandleChange, timeValue, timeHandleChange, guestValue, guestHandleChange,
}) {
  return (
    <Stack
      className="date-picker"
      direction="row"
      justifyContent="space-evenly"
      alignItems="center"
      spacing={2}
    >
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker
          label="Date desktop"
          inputFormat="MM/DD/YYYY"
          value={dateValue}
          onChange={dateHandleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Time</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={timeValue}
          label="Time"
          onChange={timeHandleChange}
        >
          {timeOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Guests</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={guestValue}
          label="Time"
          onChange={guestHandleChange}
        >
          {guestOptions.map((option) => (
            <MenuItem key={option} value={option}>{option} guests</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>

  );
}

ReservationPicker.propTypes = {
  dateValue: PropTypes.string.isRequired,
  dateHandleChange: PropTypes.func.isRequired,
  timeValue: PropTypes.string.isRequired,
  timeHandleChange: PropTypes.func.isRequired,
  guestValue: PropTypes.number.isRequired,
  guestHandleChange: PropTypes.func.isRequired,
};
