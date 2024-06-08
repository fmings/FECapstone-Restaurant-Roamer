import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET SINGLE USER EAT LIST
const getSingleEatList = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/eatlists/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

// API/PROMISE TO GET RESTAURANTS ON A USER'S LIST
const getEatListRestaurants = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/eatlistRestaurants.json?orderBy="eatListId"&equalTo="${firebaseKey}"`, {
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

const getUserEatList = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/eatlists.json?orderBy="uid"&equalTo="${uid}"`, {
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

export {
  getSingleEatList,
  getEatListRestaurants,
  getUserEatList,
};
