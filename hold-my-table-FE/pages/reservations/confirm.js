/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import Confirmation from '../../components/reservations/reservationConfirmation';
import { getSingleRestaurant } from '../../utils/data/api/restaurantData';

export default function Confirm() {
  const router = useRouter();
  const {
    dateValue, timeValue, guestValue, table, restaurant,
  } = router.query;
  const [res, setRes] = useState({});

  const getTheRestaurant = () => {
    getSingleRestaurant(restaurant).then(setRes);
  };

  useEffect(() => {
    getTheRestaurant();
  }, []);

  const props = {
    dateValue,
    timeValue,
    guestValue,
    table,
    restaurant: res,
  };

  return (
    <>
      <Head>
        <title>
          Hold My Table - Confirm
        </title>
        <meta name="description" content="meta description for single restaurant page" />
      </Head>
      <div className="reservation-confirmation">
        <Confirmation {...props} />
      </div>
    </>

  );
}
