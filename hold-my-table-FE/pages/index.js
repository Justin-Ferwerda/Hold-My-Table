/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import MainRestaurantCard from '../components/restaurants/MainRestaurantCard';
import { useCity } from '../utils/context/cityContext';
import getRestaurantByCity from '../utils/data/restaurantData';

function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const { city } = useCity();

  const getTheRestaurants = () => {
    getRestaurantByCity(city).then(setRestaurants);
  };

  useEffect(() => {
    getTheRestaurants();
  }, [city]);

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      {restaurants.map((restaurant) => (
        <MainRestaurantCard key={restaurant.id} restaurant={restaurant} src={restaurant.bannerPic} />
      ))}
    </div>
  );
}

export default Home;
