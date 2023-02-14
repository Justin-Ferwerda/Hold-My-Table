import React, {
  createContext, //
  useContext,
  useMemo,
  useState,
  useEffect,
} from 'react';
import { getRestaurantByCity } from '../data/restaurantData';
import { useCity } from './cityContext';

const RestaurantContext = createContext();

RestaurantContext.displayName = 'RestaurantContext';

const Restaurant = (props) => {
  const [restaurants, setRestaurants] = useState([]);
  const { city } = useCity();

  useEffect(() => {
    getRestaurantByCity(city).then(setRestaurants);
  }, [city]);

  const value = useMemo(
    () => ({
      restaurants,
      setRestaurants,
    }),
    [restaurants, setRestaurants],
  );

  return <RestaurantContext.Provider value={value} {...props} />;
};

const RestaurantConsumer = RestaurantContext.Consumer;

const useRestaurant = () => {
  const context = useContext(RestaurantContext);

  return context;
};

export { Restaurant, useRestaurant, RestaurantConsumer };
