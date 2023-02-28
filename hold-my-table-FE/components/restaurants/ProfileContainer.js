import React, { useEffect, useState } from 'react';
import { useAuth } from '../../utils/context/authContext';
import RestaurantReservation from '../reservations/restaurantReservation';
import RestaurantProfile from './restaurantProfile';

export default function ProfileContainer() {
  const { user } = useAuth();
  const [restaurant, setRestaurant] = useState([]);

  useEffect(() => {
    setRestaurant(user.adminRestaurant);
  }, [user]);

  return (
    <div className="profile-container">
      {
        restaurant?.reservations?.map((res) => <RestaurantReservation reservation={res} user={user} onUpdate={() => setRestaurant(user.adminRestaurant)} />)
      }
      <RestaurantProfile restaurant={restaurant} />
    </div>
  );
}
