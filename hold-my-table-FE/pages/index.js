/* eslint-disable react-hooks/exhaustive-deps */
import MainRestaurantCard from '../components/restaurants/MainRestaurantCard';
import { useRestaurant } from '../utils/context/restaurantContext';

function Home() {
  const { restaurants } = useRestaurant();
  console.warn(restaurants);
  /* useEffect(() => {
    setRestaurants(restaurants);
  }, [city, restaurants]); */

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
