import { clientCredentials } from '../client';

const getRestaurantByCity = (city) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/restaurants?city=${city}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch((error) => reject(error));
});

const getSingleRestaurant = async (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/restaurants/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch((error) => reject(error));
});

export { getRestaurantByCity, getSingleRestaurant };
