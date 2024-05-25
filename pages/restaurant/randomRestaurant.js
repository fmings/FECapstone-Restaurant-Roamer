import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getUserRestaurants } from '../../api/restaurantData';
import RestaurantCard from '../../components/RestaurantCard';

export default function RandomRestaurant() {
  const [restaurantArray, setRestaurantArray] = useState([]);
  const [randomRestaurant, setRandomRestaurant] = useState([]);

  const getAllUserRestaurants = () => {
    getUserRestaurants().then(setRestaurantArray);
  };

  const getRandomRestaurant = () => {
    const randomRest = Math.floor(Math.random() * restaurantArray.length);
    const selectedRestaurant = restaurantArray[randomRest];
    setRandomRestaurant(selectedRestaurant);
  };

  useEffect(() => {
    getAllUserRestaurants();
  }, []);

  useEffect(() => {
    if (restaurantArray.length > 0) {
      getRandomRestaurant();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getRandomRestaurant]);

  return (
    <div>
      <div className="d-flex flex-wrap">
        <RestaurantCard restaurantObj={randomRestaurant} key={randomRestaurant.firebaseKey} />
      </div>
      <div><Button onClick={getRandomRestaurant}>Generate Another Suggestion</Button></div>
    </div>
  );
}
