import PropTypes from 'prop-types';
import { useGesture } from '@use-gesture/react';
import { useSpring, animated } from '@react-spring/web';
import { circleStyles, rectangleStyles, squareStyles } from '../../utils/data/tableStyleOptions';
import Seat from './seat';

export default function Table({
  table, xCoord, yCoord, saveLocation, editMode,
}) {
  const [{ x, y }, api] = useSpring(() => ({ x: xCoord, y: yCoord }));
  const seats = [];

  for (let i = 0; i < table.capacity; i++) {
    seats.push(<Seat key={i} />);
  }

  const bind = useGesture({
    onDrag: ({ down, offset: [ox, oy] }) => api.start({ x: ox, y: oy, immediate: down }),
    onDragEnd: () => {
      saveLocation(table.id, { x, y });
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
    <animated.div className="table" {...(editMode && bind())} style={{ ...styleOptions, x, y }}>
      {seats}
    </animated.div>
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
