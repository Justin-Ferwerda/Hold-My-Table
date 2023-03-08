/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import Head from 'next/head';
import FeaturedRestaurant from '../components/restaurants/featuredRestaurant';
import MainRestaurantCard from '../components/restaurants/MainRestaurantCard';
import { useRestaurant } from '../utils/context/restaurantContext';

function Home() {
  const { restaurants } = useRestaurant();
  const [featuredRestaurant, setFeaturedRestaurant] = useState();

  useEffect(() => {
    setFeaturedRestaurant(restaurants[[Math.floor(Math.random() * restaurants.length)]]);
  }, []);

  return (
    <>
      <Head>
        <title>Hold My Table - Home</title>
        <meta name="description" content="meta description for Home Page" />
      </Head>
      <div className="home-page">
        <div className="welcome-text">
          <h1>Welcome to Hold My Table!</h1>
        </div>
        <div className="featured-restaurant">
          <FeaturedRestaurant restaurant={featuredRestaurant} />
        </div>
        <h4>Restaurants</h4>
        <div
          className="restaurant-container"
        >
          {restaurants.map((restaurant) => (
            <MainRestaurantCard key={restaurant.id} restaurant={restaurant} src={restaurant.bannerPic} />
          ))}
        </div>
      </div>
    </>

  );
}

export default Home;
