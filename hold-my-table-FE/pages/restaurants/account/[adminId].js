import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useAuth } from '../../../utils/context/authContext';
import RestaurantReservation from '../../../components/reservations/restaurantReservation';
import RestaurantProfile from '../../../components/restaurants/restaurantProfile';

export default function ProfileContainer() {
  const { user, updateUser } = useAuth();
  const [restaurant, setRestaurant] = useState([]);

  useEffect(() => {
    setRestaurant(user.adminRestaurant);
  }, [user]);

  return (
    <>
      <Head>
        <title>
          {`Hold My Table - ${restaurant.name} Account`}
        </title>
        <meta name="description" content="meta description for single restaurant page" />
      </Head>
      <div className="res-account-page">
        <div className="res-reservation-container">
          <div className="res-res-w-header">
            <h3>Upcoming reservations</h3>
            <div className="res-upcoming-reservations">
              {
        restaurant?.reservations?.map((res) => (
          <RestaurantReservation
            reservation={res}
            user={user}
            onUpdate={() => {
              updateUser(user.uid).then(setRestaurant(user.adminRestaurant));
            }}
          />
        ))
      }
            </div>
          </div>
          <div className="res-past-res-w-header">
            <h3>Past Reservations</h3>
            <div className="res-past-reservations">
              {
        restaurant?.past_reservations?.map((res) => <RestaurantReservation reservation={res} user={user} onUpdate={() => setRestaurant(user.adminRestaurant)} />)
      }
            </div>
          </div>
        </div>
        <div className="restaurant-profile">
          <RestaurantProfile restaurant={restaurant} />
        </div>
      </div>
    </>

  );
}
