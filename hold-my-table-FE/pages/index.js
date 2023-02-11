import { useEffect, useState } from 'react';
import MainRestaurantCard from '../components/restaurants/MainRestaurantCard';
import getRestaurantByCity from '../utils/data/restaurantData';

function Home() {
  const [restaurants, setRestaurants] = useState([]);

  const getTheRestaurants = () => {
    getRestaurantByCity('Nashville').then(setRestaurants);
  };

  useEffect(() => {
    getTheRestaurants();
  }, []);

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
        <MainRestaurantCard restaurant={restaurant} src={restaurant.bannerPic} />
      ))}
    </div>
  );
}

export default Home;
