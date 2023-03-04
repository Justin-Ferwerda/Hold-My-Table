import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../utils/context/authContext';
import RestaurantReservation from '../../../components/reservations/restaurantReservation';
import RestaurantProfile from '../../../components/restaurants/restaurantProfile';

export default function ProfileContainer() {
  const { user } = useAuth();
  const [restaurant, setRestaurant] = useState([]);

  useEffect(() => {
    setRestaurant(user.adminRestaurant);
  }, [user]);

  return (
    <div className="res-account-page">
      <div className="res-reservation-container">
        <div className="res-upcoming-reservations">
          <h3>Upcoming reservations</h3>
          {
        restaurant?.reservations?.map((res) => <RestaurantReservation reservation={res} user={user} onUpdate={() => setRestaurant(user.adminRestaurant)} />)
      }
        </div>
        <div className="res-past-reservations">
          <h3>Past Reservations</h3>
          {
        restaurant?.past_reservations?.map((res) => <RestaurantReservation reservation={res} user={user} onUpdate={() => setRestaurant(user.adminRestaurant)} />)
      }
        </div>
      </div>
      <div className="restaurant-profile">
        <RestaurantProfile restaurant={restaurant} />
      </div>
    </div>
  );
}
