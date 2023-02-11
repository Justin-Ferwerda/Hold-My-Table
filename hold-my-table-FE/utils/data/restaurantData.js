import { clientCredentials } from '../client';

const getRestaurantByCity = (city) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/restaurants?=${city}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch((error) => reject(error));
});

export default getRestaurantByCity;
