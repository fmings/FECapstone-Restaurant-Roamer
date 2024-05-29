import React, { useEffect, useState } from 'react';
import { getUserRestaurants } from '../../api/restaurantData';
import RestaurantCard from '../../components/RestaurantCard';

export default function RandomRestaurant() {
  const [restaurantArray, setRestaurantArray] = useState([]);
  const [randomRestaurant, setRandomRestaurant] = useState({});

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

  const noop = () => {};

  return (
    <div className="min-h-screen restSuggestor">
      <div className="d-flex flex-wrap">
        <RestaurantCard restaurantObj={randomRestaurant} key={randomRestaurant.firebaseKey} onUpdate={noop} />
      </div>
      <div><button type="button" className="btn btn-accent restSuggestBtn" onClick={getRandomRestaurant}>Generate Another Suggestion</button></div>
    </div>
  );
}
