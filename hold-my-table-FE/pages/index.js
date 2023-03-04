/* eslint-disable react-hooks/exhaustive-deps */
import MainRestaurantCard from '../components/restaurants/MainRestaurantCard';
import { useRestaurant } from '../utils/context/restaurantContext';

function Home() {
  const { restaurants } = useRestaurant();

  return (
    <div className="home-page">
      <div
        className="restaurant-container"
      >
        {restaurants.map((restaurant) => (
          <MainRestaurantCard key={restaurant.id} restaurant={restaurant} src={restaurant.bannerPic} />
        ))}
      </div>
    </div>

  );
}

export default Home;
