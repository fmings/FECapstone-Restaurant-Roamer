import { clientCredentials } from '../utils/client';

// VARIABLE TO PULL IN FIREBASE DATABASE AS THE ENDPOINT FOR THE PROMISE
const endpoint = clientCredentials.databaseURL;

// API/PROMISE TO GET ALL RESTAURANTS
// const getRestaurants = () => new Promise((resolve, reject) => {
//   fetch(`${endpoint}/restaurants.json`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       if (data) {
//         resolve(Object.values(data));
//       } else {
//         resolve([]);
//       }
//     })
//     .catch(reject);
// });

// API/PROMISE TO GET RESTAURANTS ON A USER'S LIST
const getUserRestaurants = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/restaurants.json?orderBy="userList"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

// API/PROMISE TO CREATE A NEW RESTAURANT
const createRestaurant = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/restaurants.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// API/PROMISE TO GET SINGLE RESTAURANT
const getSingleRestaurant = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/restaurants/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// API/PROMISE TO DELETE A SINGLE RESTAURANT
const deleteSingleRestaurant = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/restaurants/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// API/PROMISE TO UPDATE A SINGLE RESTAURANT
const updateRestaurant = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/restaurants/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  createRestaurant,
  getSingleRestaurant,
  deleteSingleRestaurant,
  updateRestaurant,
  getUserRestaurants,
};
