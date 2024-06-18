import React, { useEffect, useState } from 'react';
import RestaurantCard from '../../components/RestaurantCard';
import { useAuth } from '../../utils/context/authContext';
import getAllEatListRestaurants from '../../api/mergedData';
import { getEatListRestaurants, getUserEatList } from '../../api/eatListData';

export default function MyRestaurants() {
  const [userRestaurants, setUserRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState(userRestaurants);
  const [eatListId, setEatListId] = useState(null);
  const [eatListRestaurantKeys, setEatListRestaurantsKeys] = useState([]);
  const { user } = useAuth();

  const getEatListId = () => {
    console.warn('user:', user.uid);
    return getUserEatList(user.uid)
      .then((eatList) => {
        const id = eatList[0].firebaseKey;
        setEatListId(id);
        return id;
      });
  };

  const getEatListRestaurantKeys = (id) => {
    getEatListRestaurants(id).then(setEatListRestaurantsKeys);
  };

  const getAllUserRestaurants = (id) => getAllEatListRestaurants(id).then((list) => {
    setUserRestaurants(list.restaurants);
    setFilteredRestaurants(list.restaurants);
  });

  useEffect(() => {
    getEatListId()
      // eslint-disable-next-line consistent-return
      .then((id) => {
        if (id) {
          return Promise.all([
            getAllUserRestaurants(id),
            getEatListRestaurantKeys(id),
          ]);
        }
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdate = (id) => {
    getAllUserRestaurants(id);
    getEatListRestaurantKeys(id);
  };

  const filterMyList = (e) => {
    let updatedUserList;
    if (e.target.id === 'want-to-visit') {
      updatedUserList = userRestaurants.filter((userRestaurant) => (!userRestaurant.tried));
    } else if (e.target.id === 'visited') {
      updatedUserList = userRestaurants.filter((userRestaurant) => (userRestaurant.tried));
    } else if (e.target.id === 'favorites') {
      updatedUserList = userRestaurants.filter((userRestaurant) => (userRestaurant.favorite));
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
        <button type="button" className="btn btn-accent navButton" id="favorites" onClick={filterMyList}>Favorites</button>
        <button type="button" className="btn btn-accent navButton" id="all" onClick={filterMyList}>All</button>
      </div>
      <div className="d-flex flex-wrap">
        {filteredRestaurants.map((userRestaurant) => (
          <RestaurantCard
            restaurantObj={userRestaurant}
            key={userRestaurant.firebaseKey}
            onUpdate={() => handleUpdate(eatListId)}
            userRestaurants={userRestaurants}
            eatListId={eatListId}
            eatListRestaurantKeys={eatListRestaurantKeys}
          />
        ))}
      </div>
    </div>
  );
}
