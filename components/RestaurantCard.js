// import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import getNeighborhoods from '../api/neighborhoodData';
import getCuisines from '../api/cuisineData';
// import { getRestaurants } from '../api/restaurantData';

export default function RestaurantCard({ restaurantObj }) {
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [cuisines, setCuisines] = useState([]);

  useEffect(() => {
    getNeighborhoods().then(setNeighborhoods);
    getCuisines().then(setCuisines);
  }, []);

  return (
    <>
      <Card className="object-card" style={{ width: '18rem' }}>
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
          <img
            src={restaurantObj.logo}
            alt="logo"
            className="h-full w-full object-cover object-center group-hover:opacity-75"
          />
        </div>
        <Card.Body>
          <Card.Title>{restaurantObj.name}</Card.Title>
          <Card.Text>Neighborhood: </Card.Text>
          {neighborhoods.map((neighborhood) => (
            <Card.Text>
              {restaurantObj.neighborhoodId === neighborhood.firebaseKey ? neighborhood.name : ''}
            </Card.Text>
          ))}
          <Card.Text>Cuisine: </Card.Text>
          {cuisines.map((cuisine) => (
            <Card.Text>
              {restaurantObj.cuisineId === cuisine.firebaseKey ? cuisine.type : ''}
            </Card.Text>
          ))}
          <Link href={`/restaurant/edit/${restaurantObj.firebaseKey}`} passHref>
            <Button><img src="https://img.icons8.com/?size=100&id=15049&format=png&color=000000" alt="edit icon" width="20" /></Button>
          </Link>
        </Card.Body>
      </Card>
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
};
