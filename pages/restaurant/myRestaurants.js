import React, { useEffect, useState } from 'react';
import { getUserRestaurants } from '../../api/restaurantData';
import RestaurantCard from '../../components/RestaurantCard';
import { useAuth } from '../../utils/context/authContext';

export default function MyRestaurants() {
  const [userRestaurants, setUserRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState(userRestaurants);
  const { user } = useAuth();

  const getAllUserRestaurants = () => {
    getUserRestaurants(user.uid).then((restaurants) => {
      setUserRestaurants(restaurants);
      setFilteredRestaurants(restaurants);
    });
  };

  useEffect(() => {
    getAllUserRestaurants();
  }, []);

  const filterMyList = (e) => {
    let updatedUserList;
    if (e.target.id === 'want-to-visit') {
      updatedUserList = userRestaurants.filter((userRestaurant) => (!userRestaurant.tried));
    } else if (e.target.id === 'visited') {
      updatedUserList = userRestaurants.filter((userRestaurant) => (userRestaurant.tried));
    } else if (e.target.id === 'all') {
      updatedUserList = userRestaurants;
    }

    setFilteredRestaurants(updatedUserList);
  };

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl text-white font-bold underline restSuggestor">My Restaurants</h1>
      <div className="filterButtons">
        <button type="button" className="btn btn-accent navButton" id="want-to-visit" onClick={filterMyList}>Want to Visit</button>
        <button type="button" className="btn btn-accent navButton" id="visited" onClick={filterMyList}>Visited</button>
        <button type="button" className="btn btn-accent navButton" id="all" onClick={filterMyList}>All</button>
      </div>
      <div className="d-flex flex-wrap">
        {filteredRestaurants.map((userRestaurant) => (
          <RestaurantCard restaurantObj={userRestaurant} key={userRestaurant.firebaseKey} onUpdate={getAllUserRestaurants} />))}
      </div>
    </div>
  );
}
