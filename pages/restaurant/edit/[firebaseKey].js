import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleRestaurant } from '../../../api/restaurantData';
import AddRestaurantForm from '../../../components/forms/AddRestaurantForm';

export default function EditRestaurant() {
  const [editRestaurant, setEditRestaurant] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleRestaurant(firebaseKey).then(setEditRestaurant);
  }, [firebaseKey]);
  return (
    <div>
      <h1 className="text-3xl text-white font-bold underline restSuggestor">Edit Restaurant</h1>
      <div className="formContainer">
        <AddRestaurantForm restaurantObj={editRestaurant} />
      </div>
    </div>
  );
}
