import { Rating } from 'react-simple-star-rating';
import PropTypes from 'prop-types';

export default function StarRating({ rating }) {
  return (
    <div className="starRating">
      <Rating
        allowHover={false}
        size={26}
        allowFraction
        iconsCount={5}
        initialValue={rating}
        readonly
        tooltipStyle={{
          height: 'auto', width: 'auto', fontSize: '13px', padding: '2px 4px', textAlign: 'center', marginTop: '4px', marginLeft: '10px',
        }}
      />
    </div>
  );
}

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
};
