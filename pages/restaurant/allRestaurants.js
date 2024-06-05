import React, { useEffect, useState } from 'react';
import RestaurantCard from '../../components/RestaurantCard';
import getGoogleRestaurants from '../../api/externalRestaurantAPI';

export default function AllRestaurants() {
  const [restaurants, setRestaurants] = useState([]);

  const getAllRestaurants = () => {
    getGoogleRestaurants().then(setRestaurants);
    console.warn(restaurants);
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
