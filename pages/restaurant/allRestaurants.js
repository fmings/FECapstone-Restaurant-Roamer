import React from 'react';
import RestaurantCard from '../../components/RestaurantCard';

export default function AllRestaurants() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">
        All Restaurants
      </h1>
      <RestaurantCard />
    </div>
  );
}
