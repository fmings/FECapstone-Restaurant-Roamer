// import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import { getRestaurants } from '../api/restaurantData';

export default function RestaurantCard({ restaurantObj }) {
  return (
    <>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
            <img
              src={restaurantObj.logo}
              alt="logo"
              className="h-full w-full object-cover object-center group-hover:opacity-75"
            />
          </div>
          <h3 className="mt-4 text-sm text-gray-700">{restaurantObj.name}</h3>
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
    cuisineId: PropTypes.string,
    tried: PropTypes.string,
  }).isRequired,
};
