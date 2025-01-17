import PropTypes from 'prop-types';
import { useGesture } from '@use-gesture/react';
import { useSpring, animated } from '@react-spring/web';
import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { circleStyles, rectangleStyles, squareStyles } from '../../utils/data/options/tableStyleOptions';
import Seat from './seat';
import TableModal from './tableModal';
import AddTableModal from './addTableModal';
import { deleteTable } from '../../utils/data/api/tableData';

const Table = React.forwardRef(({
  table, xCoord, yCoord, saveLocation, editMode, dateProps, onUpdate, user,
}, ref) => {
  const [{ x, y }, api] = useSpring(() => ({ x: xCoord, y: yCoord }));
  const [show, setShow] = useState(false);
  const seats = [];

  for (let i = 0; i < table.capacity; i++) {
    seats.push(<Seat key={i} />);
  }

  const deleteThisTable = () => {
    if (window.confirm('Delete This Table?')) {
      deleteTable(table.id).then(() => onUpdate());
    }
  };

  const bind = useGesture({
    onDrag: editMode ? ({ down, offset: [ox, oy] }) => api.start({ x: ox, y: oy, immediate: down }) : () => null,
    onDragEnd: editMode ? () => {
      saveLocation(table.id, { x, y });
    } : () => null,
    onMouseDown: !editMode && user.id !== table.restaurant.admin_user ? () => {
      setShow(true);
    } : () => null,
  }, {
    drag: {
      bounds: ref,
      rubberband: true,
      from: () => [x.get(), y.get()],
    },
  });

  let styleOptions = table.reserved && user.id !== table.restaurant.admin_user ? { backgroundColor: '#FF7276' } : { backgroundColor: '#ADD8E6' };

  if (table.shape === 'circle') {
    styleOptions = { ...styleOptions, ...circleStyles };
  } else if (table.shape === 'square') {
    styleOptions = { ...styleOptions, ...squareStyles };
  } else {
    styleOptions = { ...styleOptions, ...rectangleStyles };
  }

  return (
    <animated.div
      className="table"
      {...bind()}
      style={{
        ...styleOptions, x, y,
      }}
    >
      {seats}
      {user.id === table.restaurant.admin_user && editMode ? (
        <div className="edit-delete-table">
          <AddTableModal table={table} restaurant={table.restaurant} onUpdate={onUpdate} />
          <IconButton aria-label="delete" className="delete-btn" onClick={deleteThisTable}>
            <DeleteIcon fontSize="medium" />
          </IconButton>
        </div>
      ) : <TableModal show={show} handleClose={() => setShow(false)} table={table} dateProps={dateProps} />}
    </animated.div>

  );
});

Table.propTypes = {
  table: PropTypes.shape({
    id: PropTypes.number,
    capacity: PropTypes.number,
    shape: PropTypes.string,
    rating: PropTypes.number,
    reserved: PropTypes.bool,
    restaurant: PropTypes.shape({
      admin_user: PropTypes.number,
    }),
  }).isRequired,
  saveLocation: PropTypes.func.isRequired,
  xCoord: PropTypes.number.isRequired,
  yCoord: PropTypes.number.isRequired,
  editMode: PropTypes.bool.isRequired,
  dateProps: PropTypes.shape({}).isRequired,
  onUpdate: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  ref: PropTypes.shape({

    offsetHeight: PropTypes.number,
    offsetWidth: PropTypes.number,
  }).isRequired,
};

export default Table;
