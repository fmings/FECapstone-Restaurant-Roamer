import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import getNeighborhoods from '../api/neighborhoodData';
import getCuisines from '../api/cuisineData';
import { createRestaurant, deleteSingleRestaurant, updateRestaurant } from '../api/restaurantData';
import { useAuth } from '../utils/context/authContext';
import {
  addToEatList, deleteRestFromEatList, getEatListRestaurants, getUserEatList, updateEatListRestaurants,
} from '../api/eatListData';

export default function RestaurantCard({ restaurantObj, onUpdate }) {
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [userEatListRestaurants, setUserEatListRestaurants] = useState([]);
  const [userEatList, setUserEatList] = useState({});
  const { user } = useAuth();

  useEffect(() => {
    getEatListRestaurants().then(setUserEatListRestaurants);
    getUserEatList(user.uid).then(setUserEatList);
  }, []);

  useEffect(() => {
    getNeighborhoods().then(setNeighborhoods);
    getCuisines().then(setCuisines);
    return () => {
      setNeighborhoods([]);
      setCuisines([]);
    };
  }, []);

  const toggleToUserList = () => {
    let onUserList = false;

    userEatListRestaurants.forEach((restaurant) => {
      if (restaurant.restaurantId === restaurantObj.firebaseKey || restaurantObj.id) {
        onUserList = true;
      }
    });

    if (!onUserList) {
      const payload = { ...restaurantObj, tried: false };
      createRestaurant(payload).then(({ name: restaurantFirebaseKey }) => {
        const patchPayload = { firebaseKey: restaurantFirebaseKey };
        updateRestaurant(patchPayload).then(() => {
          const payloadEatList = { eatListId: userEatList[0].firebaseKey, restaurantId: restaurantFirebaseKey };
          addToEatList(payloadEatList).then(({ name: eatListFirebaseKey }) => {
            const patchPayload2 = { firebaseKey: eatListFirebaseKey, eatListId: userEatList.firebaseKey };
            updateEatListRestaurants(patchPayload2).then(() => {
              onUpdate();
            });
          });
        });
      });
    } else {
      deleteRestFromEatList(restaurantObj.firebaseKey).then(() => {
        onUpdate();
      });
    }
  };

  const deleteRestaurant = () => {
    if (window.confirm(`Are you sure you want to permanently delete ${restaurantObj.displayName.text} from the database?`)) {
      deleteSingleRestaurant(restaurantObj.firebaseKey).then(() => onUpdate());
    }
  };

  const restaurantName = () => {
    if (restaurantObj.firebaseKey) {
      return restaurantObj.name;
    } if (restaurantObj.id) {
      return restaurantObj.displayName.text;
    }
    return '';
  };

  return (
    <>
      <div className="card w-96 glass">
        <div className="card-body">
          <h2 className="card-title">{restaurantName()}</h2>
          {neighborhoods.map((neighborhood) => (
            restaurantObj.neighborhoodId === neighborhood.firebaseKey ? (
              <p className="neighborhood" key={neighborhood.firebaseKey}>{neighborhood.name}</p>
            ) : null
          ))}
          {cuisines.map((cuisine) => (
            restaurantObj.cuisineId === cuisine.firebaseKey ? (<p className="cuisine" key={cuisine.firebaseKey}>{cuisine.type} Cuisine</p>) : null
          ))}
        </div>
        <div className="card-actions justify-end">
          {restaurantObj.userList !== user.uid
            ? <button type="button" className="btn-nobkgrd" onClick={toggleToUserList}><img className="btn-image" src="https://img.icons8.com/?size=100&id=24717&format=png&color=000000" alt="add icon" width="20" /></button> : <button type="button" className="btn-nobkgrd" onClick={toggleToUserList}><img className="btn-image" src="https://img.icons8.com/?size=100&id=1504&format=png&color=000000" alt="add icon" width="20" /></button> }
          {restaurantObj.userList
            ? (
              <Link href={`/restaurant/edit/${restaurantObj.firebaseKey}`} passHref>
                <button type="button" className="btn-nobkgrd"><img className="btn-image" src="https://img.icons8.com/?size=100&id=15049&format=png&color=000000" alt="edit icon" width="20" /></button>
              </Link>
            ) : '' }
          {!restaurantObj.id
            ? <button type="button" className="btn-nobkgrd" onClick={deleteRestaurant}><img className="btn-image" src="https://img.icons8.com/?size=100&id=99933&format=png&color=000000" alt="delete icon" width="20" /></button> : ''}

        </div>
      </div>
    </>
  );
}

RestaurantCard.propTypes = {
  restaurantObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    createdBy: PropTypes.string,
    userList: PropTypes.string,
    displayName: PropTypes.string,
    name: PropTypes.string,
    logo: PropTypes.string,
    neighborhoodId: PropTypes.string,
    cuisineId: PropTypes.string,
    tried: PropTypes.bool,
    primaryType: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
