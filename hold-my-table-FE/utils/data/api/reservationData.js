import { clientCredentials } from '../../client';

const createReservation = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/reservations`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const deleteReservation = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/reservations/${id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
  })
    .then(resolve)
    .catch((error) => reject(error));
});

export { createReservation, deleteReservation };
