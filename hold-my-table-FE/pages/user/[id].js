/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import UserReservation from '../../components/reservations/userReservation';
import UserProfile from '../../components/user/profileCard';
import { useAuth } from '../../utils/context/authContext';

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [reservations, setReservations] = useState([]);

  const getData = () => {
    setReservations(user.reservations);
    console.warn(user);
  };

  const onUpdate = () => {
    updateUser(user.uid).then(() => getData());
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <h2>My Reservations</h2>
      <div className="user-reservation-container">
        {reservations.map((res) => (
          <UserReservation reservation={res} user={user} onUpdate={onUpdate} />
        ))}
      </div>
      <div className="user-profile">
        <UserProfile user={user} />
      </div>
    </>
  );
}
