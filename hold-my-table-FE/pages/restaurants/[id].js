/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { getSingleRestaurant } from '../../utils/data/restaurantData';
import RestaurantCard from '../../components/restaurants/RestaurantCard';
import BookTable from '../../components/restaurants/BookTable';

export default function SingleRestaurant() {
  const router = useRouter();
  const { id } = router.query;
  const [res, setRes] = useState({});

  const getRestaurant = () => {
    getSingleRestaurant(id).then(setRes);
  };

  useEffect(() => {
    getRestaurant();
  }, [router]);

  return (
    <>
      <Head>
        <title>
          {`Hold My Table - ${res.name}`}
        </title>
        <meta name="description" content="meta description for single restaurant page" />
      </Head>
      <RestaurantCard restaurant={res} src={res.bannerPic} />
      <div className="book-table">
        <BookTable restaurant={res} />
        <div className="recommendations" />
      </div>
    </>
  );
}
