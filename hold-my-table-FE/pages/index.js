/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from '@mui/material';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight'; import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import MainRestaurantCard from '../components/restaurants/MainRestaurantCard';
import { useRestaurant } from '../utils/context/restaurantContext';

function Home() {
  const { restaurants } = useRestaurant();
  const cardContainer = document.querySelector('.restaurant-container');

  const onClickRight = () => {
    cardContainer.scrollBy({
      left: cardContainer.clientWidth,
      behavior: 'smooth',
    });
  };

  const onClickLeft = () => {
    cardContainer.scrollBy({
      left: -cardContainer.clientWidth,
      behavior: 'smooth',
    });
  };

  return (
    <div className="home-page">
      <div
        className="restaurant-container"
      >
        {restaurants.map((restaurant) => (
          <MainRestaurantCard key={restaurant.id} restaurant={restaurant} src={restaurant.bannerPic} />
        ))}
      </div>
      <Button className="scroll-button" onClick={onClickLeft}><ArrowCircleLeftIcon fontSize="large" className="scroll-icons" /></Button>
      <Button className="scroll-button-right" onClick={onClickRight}><ArrowCircleRightIcon fontSize="large" className="scroll-icons" /></Button>
    </div>

  );
}

export default Home;
