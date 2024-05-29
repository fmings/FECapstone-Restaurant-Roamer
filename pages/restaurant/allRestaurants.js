import React, { useEffect, useState } from 'react';
import RestaurantCard from '../../components/RestaurantCard';
import { getRestaurants } from '../../api/restaurantData';

export default function AllRestaurants() {
  const [restaurants, setRestaurants] = useState([]);

  const getAllRestaurants = () => {
    getRestaurants().then(setRestaurants);
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
          <RestaurantCard restaurantObj={restaurant} key={restaurant.firebaseKey} onUpdate={getAllRestaurants} />))}
      </div>
    </div>
  );
}
