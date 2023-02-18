import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useGesture } from '@use-gesture/react';
import StarRating from '../StarRating';
import { circleStyles, rectangleStyles, squareStyles } from '../../utils/data/tableStyleOptions';
import Seat from './seat';

export default function Table({
  table, xCoord, yCoord, saveLocation, editMode,
}) {
  const [location, setLocation] = useState({ x: xCoord, y: yCoord });
  const seats = [];

  for (let i = 0; i < table.capacity; i++) {
    seats.push(<Seat key={i} />);
  }

  const bind = useGesture({
    onDrag: ({ offset: [l, t] }) => {
      setLocation({ l, t });
    },
    onDragEnd: () => {
      saveLocation(table.id, location);
    },
  });

  let styleOptions = {};

  if (table.shape === 'circle') {
    styleOptions = circleStyles;
  } else if (table.shape === 'square') {
    styleOptions = squareStyles;
  } else {
    styleOptions = rectangleStyles;
  }

  return (
    <div className="table" {...(editMode && bind())} style={{ ...styleOptions, left: location.x, top: location.y }}>
      <StarRating rating={table.rating} />
      {seats}
    </div>
  );
}

Table.propTypes = {
  table: PropTypes.shape({
    id: PropTypes.number,
    capacity: PropTypes.number,
    shape: PropTypes.string,
    rating: PropTypes.number,
  }).isRequired,
  saveLocation: PropTypes.func.isRequired,
  xCoord: PropTypes.number.isRequired,
  yCoord: PropTypes.number.isRequired,
  editMode: PropTypes.bool.isRequired,
};
