import PropTypes from 'prop-types';
import { useGesture } from '@use-gesture/react';
import { useSpring, animated } from '@react-spring/web';
import { useState } from 'react';
import { circleStyles, rectangleStyles, squareStyles } from '../../utils/data/options/tableStyleOptions';
import Seat from './seat';
import TableModal from './tableModal';

export default function Table({
  table, xCoord, yCoord, saveLocation, editMode, dateProps, onUpdate, user,
}) {
  const [{ x, y }, api] = useSpring(() => ({ x: xCoord, y: yCoord }));
  const [show, setShow] = useState(false);
  const seats = [];

  for (let i = 0; i < table.capacity; i++) {
    seats.push(<Seat key={i} />);
  }

  const bind = useGesture({
    onDrag: editMode ? ({ down, offset: [ox, oy] }) => api.start({ x: ox, y: oy, immediate: down }) : () => null,
    onDragEnd: editMode ? () => {
      saveLocation(table.id, { x, y });
    } : () => null,
    onMouseDown: !editMode ? () => {
      setShow(true);
    } : () => null,
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
    <div className="layout-container">
      <animated.div
        className="table"
        {...bind()}
        style={{
          ...styleOptions, x, y,
        }}
      >
        {seats}
        <TableModal show={show} handleClose={() => setShow(false)} table={table} dateProps={dateProps} />
      </animated.div>
    </div>

  );
}

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
};
