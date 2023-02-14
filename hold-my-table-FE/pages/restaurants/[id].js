/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { getSingleRestaurant } from '../../utils/data/restaurantData';
import MainRestaurantCard from '../../components/restaurants/MainRestaurantCard';

export default function SingleRestaurant() {
  const router = useRouter();
  const { id } = router.query;
  const [res, setRes] = useState({});

  const getRestaurant = () => {
    getSingleRestaurant(id).then(setRes);
  };

  useEffect(() => {
    getRestaurant();
  });

  return (
    <>
      <Head>
        <title>
          {`Hold My Table - ${res.name}`}
        </title>
        <meta name="description" content="meta description for single restaurant page" />
      </Head>
      <MainRestaurantCard restaurant={res} src={res.bannerPic} />
    </>
  );
}
