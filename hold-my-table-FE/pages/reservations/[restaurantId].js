/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import moment from 'moment/moment';
import { getSingleRestaurant, saveTables } from '../../utils/data/api/restaurantData';
import { useAuth } from '../../utils/context/authContext';
import Table from '../../components/tables/table';
import AddTableModal from '../../components/tables/addTableModal';
import ReservationPicker from '../../components/reservations/datePicker';

export default function ReservationPortal() {
  const router = useRouter();
  const { restaurantId } = router.query;
  const [restaurant, setRestaurant] = useState({});
  const [tables, setTables] = useState([]);
  const { user } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [locations, setLocations] = useState({});
  const [dateValue, setDateValue] = useState(moment().format('YYYY-MM-DD'));
  const [timeValue, setTimeValue] = useState('17:00:00');
  const [guestValue, setGuestValue] = useState(2);

  const getTheRestaurant = async () => {
    const res = await getSingleRestaurant(restaurantId, timeValue, dateValue);
    setRestaurant(res);
    setTables(res.tables);
    console.warn(restaurant);
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
  }, [dateValue, timeValue]);

  const dateHandleChange = (date) => {
    setDateValue(moment(date).format('YYYY-MM-DD'));
  };

  const timeHandleChange = (e) => {
    setTimeValue(e.target.value);
  };

  const guestHandleChange = (e) => {
    setGuestValue(e.target.value);
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
          <div>
            <AddTableModal restaurant={restaurant} onUpdate={onUpdate} setEditMode={setEditMode} /> Table
          </div>
        </div>
      ) : <ReservationPicker {...dateProps} />}
      {
        tables?.map((table) => <Table key={table.id} table={table} xCoord={table.x_coord} yCoord={table.y_coord} saveLocation={saveLocation} editMode={editMode} dateProps={dateProps} onUpdate={onUpdate} />)
      }
    </>
  );
}
