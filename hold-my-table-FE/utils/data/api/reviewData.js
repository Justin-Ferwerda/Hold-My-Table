import { clientCredentials } from '../../client';

const updateReview = (data) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/reviews/${data.id}`, {
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

const deleteReview = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/reviews/${id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

export { updateReview, deleteReview };
