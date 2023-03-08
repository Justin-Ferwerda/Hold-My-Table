/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import UserReservation from '../../components/reservations/userReservation';
import UserProfile from '../../components/user/profileCard';
import { useAuth } from '../../utils/context/authContext';

export default function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [pastReservations, setPastReservations] = useState([]);

  const getData = () => {
    setReservations(user.reservations);
    setPastReservations(user.pastReservations);
  };

  const onUpdate = () => {
    updateUser(user.uid).then(() => getData());
  };

  useEffect(() => {
    getData();
  }, [user]);

  return (
    <>
      <Head>
        <title>
          {`Hold My Table - ${user.firstName}`}
        </title>
        <meta name="description" content="meta description for single restaurant page" />
      </Head>
      <div className="user-page">
        <div className="user-reservation-page">
          <div className="user-res-w-header">
            <h3>Upcoming Reservations</h3>
            <div className="user-reservation-container">
              {reservations?.map((res) => (
                <UserReservation reservation={res} user={user} onUpdate={onUpdate} />
              ))}
            </div>
          </div>
          <div className="user-past-res-w-header">
            <h3>Past Reservations</h3>
            <div className="user-past-reservations">
              {pastReservations?.slice(0).reverse().map((res) => (
                <UserReservation reservation={res} user={user} onUpdate={onUpdate} />
              ))}
            </div>
          </div>
        </div>
        <div className="user-profile">
          <UserProfile user={user} />
        </div>
      </div>
    </>

  );
}
