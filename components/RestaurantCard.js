// import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import getNeighborhoods from '../api/neighborhoodData';
import getCuisines from '../api/cuisineData';
import { deleteSingleRestaurant, updateRestaurant } from '../api/restaurantData';
// import { getRestaurants } from '../api/restaurantData';

export default function RestaurantCard({ restaurantObj, onUpdate }) {
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [cuisines, setCuisines] = useState([]);

  useEffect(() => {
    getNeighborhoods().then(setNeighborhoods);
    getCuisines().then(setCuisines);
  }, []);

  const toggleToUserList = () => {
    if (!restaurantObj.userList) {
      updateRestaurant({ ...restaurantObj, userList: true }).then(() => onUpdate());
    } else {
      updateRestaurant({ ...restaurantObj, userList: false }).then(() => onUpdate());
    }
  };

  const deleteRestaurant = () => {
    if (window.confirm(`Are you sure you want to permanently delete ${restaurantObj.name} from the database?`)) {
      deleteSingleRestaurant(restaurantObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <>
      <div className="card w-96 glass">
        <figure className="rest-image"><img src={restaurantObj.logo} alt="logo" /></figure>
        <div className="card-body">
          <h2 className="card-title">{restaurantObj.name}</h2>
          {neighborhoods.map((neighborhood) => (
            restaurantObj.neighborhoodId === neighborhood.firebaseKey ? (
              <p className="neighborhood">{neighborhood.name}</p>
            ) : null
          ))}
          {cuisines.map((cuisine) => (
            restaurantObj.cuisineId === cuisine.firebaseKey ? (<p className="cuisine">{cuisine.type} Cuisine</p>) : null
          ))}
          <div className="card-actions justify-end">
            {!restaurantObj.userList
              ? <button type="button" className="btn btn-primary" onClick={toggleToUserList}><img src="https://img.icons8.com/?size=100&id=24717&format=png&color=000000" alt="add icon" width="20" /></button> : <button type="button" className="btn btn-primary" onClick={toggleToUserList}><img src="https://img.icons8.com/?size=100&id=1504&format=png&color=000000" alt="add icon" width="20" /></button> }
            <Link href={`/restaurant/edit/${restaurantObj.firebaseKey}`} passHref>
              <button type="button" className="btn btn-primary"><img src="https://img.icons8.com/?size=100&id=15049&format=png&color=000000" alt="edit icon" width="20" /></button>
            </Link>
            <button type="button" className="btn btn-primary" onClick={deleteRestaurant}><img src="https://img.icons8.com/?size=100&id=99933&format=png&color=000000" alt="delete icon" width="20" /></button>

          </div>
        </div>
      </div>
    </>
  );
}

RestaurantCard.propTypes = {
  restaurantObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    createdBy: PropTypes.string,
    userList: PropTypes.bool,
    name: PropTypes.string,
    logo: PropTypes.string,
    neighborhoodId: PropTypes.string,
    cuisineId: PropTypes.string,
    tried: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
