import { clientCredentials } from '../../client';

const getSingleTable = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/tables/${id}`, {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch((error) => reject(error));
});

const updateTable = (table) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/tables/${table.id}`, {
    method: 'PUT',
    body: JSON.stringify(table),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const createTable = (payload) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/tables`, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const checkReservedTables = (tableIds) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/tables/check_if_reserved`, {
    method: 'POST',
    body: JSON.stringify(tableIds),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const deleteTable = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/tables/${id}`, {
    method: 'DELETE',
    headers: {
      'content-type': 'application/json',
      Accept: 'application/json',
    },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  getSingleTable, updateTable, createTable, checkReservedTables, deleteTable,
};
