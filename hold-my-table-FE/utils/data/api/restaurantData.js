import { clientCredentials } from '../../client';

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

const getSingleRestaurant = (id) => new Promise((resolve, reject) => {
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

const saveTables = (tables) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/tables/save_tables`, {
    method: 'PUT',
    body: JSON.stringify(tables),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then(resolve)
    .catch((error) => reject(error));
});

const updateRestaurant = (data) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/restaurants/${data.id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch((error) => reject(error));
});

const createRestaurant = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/restaurants`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/js,on',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch((error) => reject(error));
});

export {
  getRestaurantByCity, getSingleRestaurant, saveTables, updateRestaurant, createRestaurant,
};
