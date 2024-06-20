import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import getNeighborhoods from '../api/neighborhoodData';
import getCuisines from '../api/cuisineData';
import { createRestaurant, deleteSingleRestaurant, updateRestaurant } from '../api/restaurantData';
// import { useAuth } from '../utils/context/authContext';
import {
  addToEatList, deleteRestFromEatList, updateEatListRestaurants,
} from '../api/eatListData';
import { useAuth } from '../utils/context/authContext';

export default function RestaurantCard({
  restaurantObj, onUpdate, userRestaurants, eatListId, eatListRestaurantKeys,
}) {
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getNeighborhoods().then(setNeighborhoods);
    getCuisines().then(setCuisines);
    return () => {
      setNeighborhoods([]);
      setCuisines([]);
    };
  }, []);

  const onUserList = () => {
    if (userRestaurants) {
      return eatListRestaurantKeys.some((restaurant) => {
        const isOnList = restaurant.restaurantId === restaurantObj.firebaseKey;
        return isOnList;
      });
    }
    return false;
  };

  const toggleToUserList = () => {
    const isOnUserList = onUserList();
    if (!isOnUserList && restaurantObj.id) {
      const payload = { ...restaurantObj, tried: false };
      createRestaurant(payload).then(({ name: restaurantFirebaseKey }) => {
        const patchPayload = { firebaseKey: restaurantFirebaseKey, name: restaurantObj.displayName.text };
        updateRestaurant(patchPayload).then(() => {
          const payloadEatList = { eatListId, restaurantId: restaurantFirebaseKey };
          addToEatList(payloadEatList).then(({ name: eatListFirebaseKey }) => {
            const patchPayload2 = { firebaseKey: eatListFirebaseKey, eatListId };
            updateEatListRestaurants(patchPayload2).then(() => {
              onUpdate(eatListId);
            });
          });
        });
      });
    } else if (!isOnUserList && restaurantObj.firebaseKey) {
      const payloadEatList = { eatListId, restaurantId: restaurantObj.firebaseKey };
      addToEatList(payloadEatList).then(({ name: firebaseKey }) => {
        const patchPayload = { firebaseKey };
        updateEatListRestaurants(patchPayload).then(() => {
          onUpdate(eatListId);
        });
      });
    } else if (isOnUserList) {
      const restaurantToDelete = eatListRestaurantKeys.find((restaurant) => restaurant.restaurantId === restaurantObj.firebaseKey);
      if (restaurantObj.id) {
        deleteRestFromEatList(restaurantToDelete.firebaseKey)
          .then(() => deleteSingleRestaurant(restaurantObj.firebaseKey))
          .then(() => {
            onUpdate(eatListId);
          });
      } else {
        deleteRestFromEatList(restaurantToDelete.firebaseKey).then(() => {
          onUpdate(eatListId);
        });
      }
    }
  };

  const deleteRestaurant = () => {
    if (window.confirm(`Are you sure you want to permanently delete ${restaurantObj.name} from the database?`)) {
      const isOnUserList = onUserList();
      if (isOnUserList) {
        const restaurantToDelete = eatListRestaurantKeys.find((restaurant) => restaurant.restaurantId === restaurantObj.firebaseKey);
        deleteRestFromEatList(restaurantToDelete.firebaseKey)
          .then(() => deleteSingleRestaurant(restaurantObj.firebaseKey))
          .then(() => {
            onUpdate(eatListId);
          });
      }
    } else {
      deleteSingleRestaurant(restaurantObj.firebaseKey).then(() => {
        onUpdate(eatListId);
      });
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

  const restaurantOnUserList = onUserList();
  const favoriteCheck = () => {
    if (restaurantOnUserList && restaurantObj.favorite) {
      return true;
    }
    if (restaurantOnUserList && !restaurantObj.favorite) {
      return false;
    }
    return null;
  };

  const triedCheck = () => {
    if (restaurantOnUserList && restaurantObj.tried) {
      return true;
    }
    if (restaurantOnUserList && !restaurantObj.tried) {
      return false;
    }
    return null;
  };

  const toggleFavorite = () => {
    if (restaurantObj.favorite) {
      updateRestaurant({ ...restaurantObj, favorite: false }).then(() => onUpdate());
    } else {
      updateRestaurant({ ...restaurantObj, favorite: true }).then(() => onUpdate());
    }
  };

  const toggleTried = () => {
    if (restaurantObj.tried) {
      updateRestaurant({ ...restaurantObj, tried: false }).then(() => onUpdate());
    } else {
      updateRestaurant({ ...restaurantObj, tried: true }).then(() => onUpdate());
    }
  };

  return (
    <>
      <div className="card w-96 glass">
        <div className="card-actions justify-end">
          {favoriteCheck() !== null && (favoriteCheck()
            ? <button type="button" className="btn-nobkgrd favorite" onClick={toggleFavorite}><img className="btn-image" src="https://img.icons8.com/?size=100&id=85135&format=png&color=000000" alt="favorited icon" width="20" /></button> : <button type="button" className="btn-nobkgrd favorite" onClick={toggleFavorite}><img className="btn-image" src="https://img.icons8.com/?size=100&id=85033&format=png&color=000000" alt="unfavorited icon" width="20" /></button>)}
        </div>
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
          {triedCheck() !== null && (triedCheck()
            ? <button type="button" className="btn-nobkgrd" onClick={toggleTried}><img className="btn-image" src="https://img.icons8.com/?size=100&id=40902&format=png&color=000000" alt="tried icon" width="20" /></button> : <button type="button" className="btn-nobkgrd" onClick={toggleTried}><img className="btn-image" src="https://img.icons8.com/?size=100&id=25534&format=png&color=000000" alt="not tried icon" width="20" /></button>)}
          {restaurantOnUserList
            ? <button type="button" className="btn-nobkgrd" onClick={toggleToUserList}><img className="btn-image" src="https://img.icons8.com/?size=100&id=1504&format=png&color=000000" alt="add icon" width="20" /></button> : <button type="button" className="btn-nobkgrd" onClick={toggleToUserList}><img className="btn-image" src="https://img.icons8.com/?size=100&id=24717&format=png&color=000000" alt="add icon" width="20" /></button> }

          {restaurantOnUserList
            ? (
              <Link href={`/restaurant/edit/${restaurantObj.firebaseKey}`} passHref>
                <button type="button" className="btn-nobkgrd"><img className="btn-image" src="https://img.icons8.com/?size=100&id=15049&format=png&color=000000" alt="edit icon" width="20" /></button>
              </Link>
            ) : '' }
          {restaurantObj.createdBy === user.uid
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
    displayName: PropTypes.string,
    name: PropTypes.string,
    logo: PropTypes.string,
    neighborhoodId: PropTypes.string,
    cuisineId: PropTypes.string,
    tried: PropTypes.bool,
    primaryType: PropTypes.string,
    id: PropTypes.string,
    favorite: PropTypes.bool,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  userRestaurants: PropTypes.arrayOf(PropTypes.shape({
    firebaseKey: PropTypes.string,
    createdBy: PropTypes.string,
    displayName: PropTypes.string,
    name: PropTypes.string,
    logo: PropTypes.string,
    neighborhoodId: PropTypes.string,
    cuisineId: PropTypes.string,
    tried: PropTypes.bool,
    primaryType: PropTypes.string,
    id: PropTypes.string,
    favorite: PropTypes.bool,
  })).isRequired,
  eatListId: PropTypes.string.isRequired,
  eatListRestaurantKeys: PropTypes.arrayOf(PropTypes.shape({
    firebaseKey: PropTypes.string,
    eatListId: PropTypes.string,
    restaurantId: PropTypes.string,
  })).isRequired,
};
