/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState, useRef } from 'react';
import moment from 'moment/moment';
import { getSingleRestaurant, saveTables } from '../../utils/data/api/restaurantData';
import { useAuth } from '../../utils/context/authContext';
import Table from '../../components/tables/table';
import LayoutKey from '../../components/restaurants/layoutKey';

export default function ReservationPortal() {
  const router = useRouter();
  const { restaurantId } = router.query;
  const [restaurant, setRestaurant] = useState({});
  const [tables, setTables] = useState([]);
  const { user } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [locations, setLocations] = useState({});
  const [dateValue, setDateValue] = useState(moment().format('YYYY-MM-DD'));
  const [timeValue, setTimeValue] = useState();
  const [guestValue, setGuestValue] = useState(2);
  const parentRef = useRef(null);

  const getTheRestaurant = async () => {
    const res = await getSingleRestaurant(restaurantId, timeValue, dateValue);
    if (res.message) {
      alert(`${res.message}`);
    } else {
      setRestaurant(res);
      setTables(res.tables);
      tables.forEach((table) => {
        setLocations({ ...locations, [table.id]: { x: table.xCoord, y: table.yCoord } });
      });
    }
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
    const dateObj = new Date(date);
    const dateFormat = dateObj.toISOString().slice(0, 10);
    setDateValue(dateFormat);
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

  const layoutProps = {
    user,
    restaurant,
    handleSaveLayout,
    editMode,
    onUpdate,
    setEditMode,
    dateProps,
  };

  return (
    <>
      <div className="layout-container">
        <LayoutKey {...layoutProps} />
        <div ref={parentRef} className="table-container">
          {
        tables?.map((table) => <Table key={table.id} table={table} xCoord={table.x_coord} yCoord={table.y_coord} saveLocation={saveLocation} editMode={editMode} dateProps={dateProps} onUpdate={onUpdate} user={user} ref={parentRef} />)
      }
        </div>
      </div>
    </>
  );
}
