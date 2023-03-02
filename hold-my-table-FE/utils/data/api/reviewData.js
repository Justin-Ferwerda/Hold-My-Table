import { clientCredentials } from '../../client';

const createReview = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/reviews`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'content-type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch((error) => reject(error));
});

const updateReview = (data) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/reviews/${data.id}`, {
    method: 'PUT',
    body: data,
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'multipart/form-data',
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
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export { updateReview, deleteReview, createReview };
