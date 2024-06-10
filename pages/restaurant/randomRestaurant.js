import React, { useEffect, useState } from 'react';
import RestaurantCard from '../../components/RestaurantCard';
import { useAuth } from '../../utils/context/authContext';
import { getUserEatList } from '../../api/eatListData';
import getAllEatListRestaurants from '../../api/mergedData';

export default function RandomRestaurant() {
  const [restaurantArray, setRestaurantArray] = useState([]);
  const [randomRestaurant, setRandomRestaurant] = useState({});
  const { user } = useAuth();

  const getEatListId = () => {
    console.warn('user:', user.uid);
    return getUserEatList(user.uid)
      .then((eatList) => {
        const eatListId = eatList[0].firebaseKey;
        return eatListId;
      });
  };

  const getAllUserRestaurants = (eatListId) => {
    getAllEatListRestaurants(eatListId).then((list) => {
      setRestaurantArray(list.restaurants);
    });
  };

  const getRandomRestaurant = () => {
    if (restaurantArray.length > 0) {
      const randomRest = Math.floor(Math.random() * restaurantArray.length);
      const selectedRestaurant = restaurantArray[randomRest];
      setRandomRestaurant(selectedRestaurant);
    }
  };

  useEffect(() => {
    getEatListId()
      // eslint-disable-next-line consistent-return
      .then((eatListId) => {
        if (eatListId) {
          getAllUserRestaurants(eatListId);
        }
      });
  }, []);

  useEffect(() => {
    if (restaurantArray.length > 0) {
      getRandomRestaurant();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [restaurantArray]);

  const noop = () => {};

  return (
    <div className="min-h-screen restSuggestor">
      <div className="d-flex flex-wrap">
        {randomRestaurant ? (<RestaurantCard restaurantObj={randomRestaurant} key={randomRestaurant.firebaseKey} onUpdate={noop} />) : ''}
      </div>
      <div><button type="button" className="btn btn-accent restSuggestBtn" onClick={getRandomRestaurant}>Generate Another Suggestion</button></div>
    </div>
  );
}
