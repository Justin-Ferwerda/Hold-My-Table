import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import AddTableModal from '../tables/addTableModal';
import ReservationPicker from '../reservations/datePicker';

export default function LayoutKey({
  user, restaurant, handleSaveLayout, editMode, onUpdate, setEditMode, dateProps,
}) {
  return (
    <div className="layout-key">
      {user.id === restaurant?.adminUser?.id ? (
        <div className="user-buttons">
          <Button variant="contained" onClick={handleSaveLayout}>{editMode ? 'save' : 'edit'} Layout</Button>
          <div>
            <AddTableModal restaurant={restaurant} onUpdate={onUpdate} setEditMode={setEditMode} /> Table
          </div>
          <p className="layout-instructions">
            Click Edit Layout button to edit your table layout. Drag and drop tables anywhere you like. Hit the + button to add a table to your restaurant.
          </p>
        </div>
      ) : (
        <>
          <ReservationPicker {...dateProps} />
          <div className="color-key-container">
            <div className="seat-key" />
            <p>Seat</p>
          </div>
          <div className="color-key-container">
            <div className="available-key" />
            <p>Available</p>
          </div>
          <div className="color-key-container">
            <div className="reserved-key" />
            <p>Reserved</p>
          </div>
        </>
      )}
    </div>

  );
}

LayoutKey.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  restaurant: PropTypes.shape({
    adminUser: PropTypes.shape({
      id: PropTypes.number,
    }),
  }).isRequired,
  handleSaveLayout: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
  onUpdate: PropTypes.func.isRequired,
  dateProps: PropTypes.shape({}).isRequired,
  setEditMode: PropTypes.func.isRequired,
};
