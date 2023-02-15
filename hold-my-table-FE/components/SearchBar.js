/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/prop-types */
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import PropTypes from 'prop-types';

export default function SearchBar({ restaurants, handleChange }) {
  const options = restaurants.map((res) => (
    {
      label: res.name,
      id: res.id,
      photo: res.bannerPic,
    }
  ));

  return (
    <Autocomplete
      disablePortal
      id="combo-box"
      options={options}
      onChange={handleChange}
      /* renderOption={(props, option) => (
        <>
          <img src={option.photo} className="dropdown-pic" alt="banner pic" />
          {option.label}
        </>
      )} */
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Search Restaurants" variant="outlined" value={options.id} />}
    />
  );
}

SearchBar.propTypes = {
  restaurants: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
  })).isRequired,
  handleChange: PropTypes.func.isRequired,
};
