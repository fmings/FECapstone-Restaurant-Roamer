import React, { useEffect, useState } from 'react';
import RestaurantCard from '../../components/RestaurantCard';
import getGoogleRestaurants from '../../api/externalRestaurantAPI';

const defineGoogleCuisine = (restaurantObj) => {
  const googleRestaurantObj = { ...restaurantObj };

  switch (restaurantObj.primaryType) {
    case 'american_restaurant':
      googleRestaurantObj.cuisineId = '-NyBk_kq1wKGZVTsNXgM';
      break;
    case 'italian_restaurant':
      googleRestaurantObj.cuisineId = '-NyBk_koy0oiicG2rscl';
      break;
    case 'barbecue_restaurant':
      googleRestaurantObj.cuisineId = '-NyBk_krmKP_iz0oqKI5';
      break;
    case 'chinese_restaurant':
      googleRestaurantObj.cuisineId = '-NyBk_kpbBaUzwCLdft6';
      break;
    case 'french_restaurant':
      googleRestaurantObj.cuisineId = '-NyBk_kq1wKGZVTsNXgO';
      break;
    case 'greek_restaurant':
      googleRestaurantObj.cuisineId = '-NyBk_kq1wKGZVTsNXgL';
      break;
    case 'indian_restaurant':
      googleRestaurantObj.cuisineId = '-NyBk_kpbBaUzwCLdft3';
      break;
    case 'korean_restaurant':
      googleRestaurantObj.cuisineId = '-NyBk_kpbBaUzwCLdft4';
      break;
    case 'mexican_restaurant':
      googleRestaurantObj.cuisineId = '-NyBk_kpbBaUzwCLdft2';
      break;
    case 'thai_restaurant':
      googleRestaurantObj.cuisineId = '-NyBk_kq1wKGZVTsNXgK';
      break;
    case 'spanish_restaurant':
      googleRestaurantObj.cuisineId = '-NyBk_krmKP_iz0oqKI2';
      break;
    case 'burger_restaurant':
      googleRestaurantObj.cuisineId = '-NyBk_krmKP_iz0oqKI6';
      break;
    default:
      googleRestaurantObj.cuisineId = '-NyBk_krmKP_iz0oqKI1';
  }

  return googleRestaurantObj;
};
export default function AllRestaurants() {
  const [restaurants, setRestaurants] = useState([]);

  const getAllRestaurants = () => {
    getGoogleRestaurants()
      .then((fetchedRestaurants) => {
        const updatedRestaurants = fetchedRestaurants.map((restaurant) => defineGoogleCuisine(restaurant));
        setRestaurants(updatedRestaurants);
      });
  };

  useEffect(() => {
    getAllRestaurants();
  }, []);

  return (
    <div className="min-h-screen restSuggestor">
      <h1 className="text-3xl text-white font-bold underline">
        All Restaurants
      </h1>
      <div className="d-flex flex-wrap">
        {restaurants.map((restaurant) => (
          <RestaurantCard restaurantObj={restaurant} key={restaurant.id} onUpdate={getAllRestaurants} />))}
      </div>
    </div>
  );
}
