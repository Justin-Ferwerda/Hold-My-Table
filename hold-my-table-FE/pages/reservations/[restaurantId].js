/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getSingleRestaurant, saveTables } from '../../utils/data/restaurantData';
import { useAuth } from '../../utils/context/authContext';
import Table from '../../components/tables/table';

export default function ReservationPortal() {
  const router = useRouter();
  const { restaurantId } = router.query;
  const [restaurant, setRestaurant] = useState({});
  const { user } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [locations, setLocations] = useState({});

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

  useEffect(() => {
    getTheRestaurant();
  }, []);

  return (
    <>
      {
        restaurant?.tables?.map((table) => <Table key={table.id} table={table} xCoord={table.x_coord} yCoord={table.y_coord} saveLocation={saveLocation} editMode={editMode} />)
      }
      {user.id === restaurant?.adminUser?.id ? <Button onClick={handleSaveLayout}>{editMode ? 'save' : 'edit'} Layout</Button> : <div />}
    </>
  );
}
