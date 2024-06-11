import { clientCredentials } from '../utils/client';

const endpoint = 'https://places.googleapis.com/v1/places:searchNearby';
const apiKey = clientCredentials.googlePlacesApiKey;

// API/PROMISE TO GET ALL RESTAURANTS THROUGH GOOGLE API
const getGoogleRestaurants = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': 'places.displayName,places.id,places.primaryType',
    },
    body: JSON.stringify({
      includedTypes: ['american_restaurant', 'barbecue_restaurant', 'chinese_restaurant', 'french_restaurant', 'greek_restaurant', 'hamburger_restaurant', 'indian_restaurant', 'italian_restaurant', 'korean_restaurant', 'mexican_restaurant', 'pizza_restaurant', 'spanish_restaurant', 'thai_restaurant'],
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
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

export default getGoogleRestaurants;
