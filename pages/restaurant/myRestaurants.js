import React, { useEffect, useState } from 'react';
import { getUserRestaurants } from '../../api/restaurantData';
import RestaurantCard from '../../components/RestaurantCard';

export default function MyRestaurants() {
  const [userRestaurants, setUserRestaurants] = useState([]);

  const getAllUserRestaurants = () => {
    getUserRestaurants().then(setUserRestaurants);
  };

  useEffect(() => {
    getAllUserRestaurants();
  }, []);

  return (
    <div>
      <h1>My Restaurants</h1>
      <div className="d-flex flex-wrap">
        {userRestaurants.map((userRestaurant) => (
          <RestaurantCard restaurantObj={userRestaurant} key={userRestaurant.firebaseKey} onUpdate={getAllUserRestaurants} />))}
      </div>
    </div>
  );
}
