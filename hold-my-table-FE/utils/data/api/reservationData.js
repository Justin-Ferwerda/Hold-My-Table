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

export default createReservation;
