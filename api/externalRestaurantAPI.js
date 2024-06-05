const endpoint = 'https://places.googleapis.com/v1/places:searchNearby';

// API/PROMISE TO GET ALL RESTAURANTS THROUGH GOOGLE API
const getGoogleRestaurants = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': 'AIzaSyD5pTxla04pAWyYrx1xWJGpUy8cmgyTwIg',
      'X-Goog-FieldMask': 'places.displayName,places.id,places.primaryType',
    },
    body: JSON.stringify({
      includedTypes: ['american_restaurant', 'barbecue_restaurant', 'italian_restaurant'],
      locationRestriction: {
        circle: {
          center: {
            latitude: 36.1783,
            longitude: -86.75004,
          },
          radius: 19800.0,
        },
      },
      rankPreference: 'DISTANCE',
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data.places));
        console.warn(data.places);
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

export default getGoogleRestaurants;
