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
          <Button variant="contained" className="layout-btns" onClick={handleSaveLayout}>{editMode ? 'save' : 'edit'} Layout</Button>
          <div>
            <AddTableModal restaurant={restaurant} onUpdate={onUpdate} setEditMode={setEditMode} />
          </div>
          <p className="layout-instructions">
            Click Edit Layout button to edit your table layout or edit table information. Drag and drop tables to match your restaurant layout. Click the Add Table button to create a new table.
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
          <p className="table-detail-text">
            Click on a table to view details.
          </p>
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
