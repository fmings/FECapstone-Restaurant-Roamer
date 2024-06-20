import React from 'react';
import AddRestaurantForm from '../../components/forms/AddRestaurantForm';

export default function NewRestaurant() {
  return (
    <div>
      <h1 className="text-3xl text-white font-bold underline restSuggestor">Add a New Restaurant</h1>
      <div className="formContainer">
        <AddRestaurantForm />
      </div>
    </div>
  );
}
