/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getSingleRestaurant, saveTables } from '../../utils/data/restaurantData';
import { useAuth } from '../../utils/context/authContext';
import Table from '../../components/tables/table';
import AddTableModal from '../../components/tables/addTableModal';
import ReservationPicker from '../../components/reservations/datePicker';

export default function ReservationPortal() {
  const router = useRouter();
  const { restaurantId } = router.query;
  const [restaurant, setRestaurant] = useState({});
  const { user } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [locations, setLocations] = useState({});
  const [dateValue, setDateValue] = useState();
  const [timeValue, setTimeValue] = useState();
  const [guestValue, setGuestValue] = useState();

  const getTheRestaurant = () => {
    getSingleRestaurant(restaurantId).then(setRestaurant);
  };

  const saveLocation = (id, location) => {
    setLocations({ ...locations, [id]: location });
  };

  const handleSaveLayout = () => {
    if (editMode) {
      saveTables(locations).then(setEditMode(false));
    } else {
      setEditMode(true);
    }
  };

  const onUpdate = () => {
    getTheRestaurant();
  };

  useEffect(() => {
    getTheRestaurant();
  }, []);

  const dateHandleChange = (date) => {
    setDateValue(date);
  };

  const timeHandleChange = (time) => {
    setTimeValue(time);
  };

  const guestHandleChange = (guests) => {
    setGuestValue(guests);
  };

  const dateProps = {
    dateHandleChange,
    timeHandleChange,
    guestHandleChange,
    dateValue,
    timeValue,
    guestValue,
  };

  return (
    <>
      {user.id === restaurant?.adminUser?.id ? (
        <div className="user-buttons">
          <Button onClick={handleSaveLayout}>{editMode ? 'save' : 'edit'} Layout</Button>
          <AddTableModal restaurant={restaurant} onUpdate={onUpdate} setEditMode={setEditMode} />
        </div>
      ) : <ReservationPicker {...dateProps} />}
      {
        restaurant?.tables?.map((table) => <Table key={table.id} table={table} xCoord={table.x_coord} yCoord={table.y_coord} saveLocation={saveLocation} editMode={editMode} />)
      }
    </>
  );
}
