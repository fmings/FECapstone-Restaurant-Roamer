import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getUserRestaurants } from '../../api/restaurantData';
import RestaurantCard from '../../components/RestaurantCard';

export default function MyRestaurants() {
  const [userRestaurants, setUserRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState(userRestaurants);

  const getAllUserRestaurants = () => {
    getUserRestaurants().then((restaurants) => {
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
    <div>
      <h1>My Restaurants</h1>
      <Button id="want-to-visit" onClick={filterMyList}>Want to Visit</Button>
      <Button id="visited" onClick={filterMyList}>Visited</Button>
      <Button id="all" onClick={filterMyList}>All</Button>
      <div className="d-flex flex-wrap">
        {filteredRestaurants.map((userRestaurant) => (
          <RestaurantCard restaurantObj={userRestaurant} key={userRestaurant.firebaseKey} onUpdate={getAllUserRestaurants} />))}
      </div>
    </div>
  );
}
