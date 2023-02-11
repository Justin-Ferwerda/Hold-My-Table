import { clientCredentials } from '../client';

const getRestaurantByCity = (city) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/restaurants`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      city,
    }),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch((error) => reject(error));
});

export default getRestaurantByCity;
