import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import getCuisines from '../../api/cuisineData';
import getNeighborhoods from '../../api/neighborhoodData';
import { createRestaurant, updateRestaurant } from '../../api/restaurantData';
import { useAuth } from '../../utils/context/authContext';
import { addToEatList, getUserEatList, updateEatListRestaurants } from '../../api/eatListData';

const initialState = {
  firebaseKey: '',
  createdBy: '',
  userList: '',
  name: '',
  logo: '',
  neighborhoodId: '',
  cuisineId: '',
  tried: false,
};
export default function AddRestaurantForm({ restaurantObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [cuisines, setCuisines] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);
  const [eatListId, setEatListId] = useState('');
  const router = useRouter();
  const { user } = useAuth();

  const getEatListId = () => {
    console.warn('user:', user.uid);
    return getUserEatList(user.uid)
      .then((eatList) => {
        const eatListIdKey = eatList[0].firebaseKey;
        setEatListId(eatListIdKey);
      });
  };

  useEffect(() => {
    getCuisines().then(setCuisines);
    getNeighborhoods().then(setNeighborhoods);
    getEatListId();

    if (restaurantObj.firebaseKey) {
      setFormInput(restaurantObj);
    }
  }, [restaurantObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const createAndAddToList = () => {
      const payload = { ...formInput, createdBy: user.uid, userList: user.uid };
      createRestaurant(payload).then(({ name: restaurantFirebaseKey }) => {
        const patchPayload = { firebaseKey: restaurantFirebaseKey };
        updateRestaurant(patchPayload).then(() => {
          const payloadEatList = { eatListId, restaurantId: restaurantFirebaseKey };
          addToEatList(payloadEatList).then(({ name: eatListFirebaseKey }) => {
            const patchPayload2 = { firebaseKey: eatListFirebaseKey };
            updateEatListRestaurants(patchPayload2).then(() => {
              router.push('/restaurant/myRestaurants');
            });
          });
        });
      });
    };
    if (restaurantObj.firebaseKey) {
      updateRestaurant(formInput).then(() => router.push('/restaurant/myRestaurants'));
    } else {
      createAndAddToList();
    }
  };

  return (
    <div className="min-h-screen">
      <form onSubmit={handleSubmit}>
        <div className="formFields">
          <label className="input input-bordered flex items-center gap-2">
            Restaurant Name
            <input
              type="text"
              className="grow"
              placeholder="Enter Restaurant Name"
              name="name"
              value={formInput.name}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <div className="selectFields formFields">
          <div>
            <select
              className="select select-bordered w-full max-w-xs"
              name="cuisineId"
              onChange={handleChange}
              value={formInput.cuisineId}
              required
            >
              <option value="">Select Cuisine?</option>
              {
                cuisines.map((cuisine) => (
                  <option
                    key={cuisine.firebaseKey}
                    value={cuisine.firebaseKey}
                  >
                    {cuisine.type}
                  </option>
                ))
              }
            </select>
          </div>
          <div className="formFields">
            <select
              className="select select-bordered w-full max-w-xs"
              name="neighborhoodId"
              onChange={handleChange}
              value={formInput.neighborhoodId}
              required
            >          <option value="">Select Neighborhood?</option>
              {
              neighborhoods.map((neighborhood) => (
                <option
                  key={neighborhood.firebaseKey}
                  value={neighborhood.firebaseKey}
                >
                  {neighborhood.name}
                </option>
              ))
            }
            </select>
          </div>
        </div>
        <div className="form-control tried formFields">
          <label className="label cursor-pointer tried">
            <span className="label-text">Tried?</span>
            <input
              type="checkbox"
              className="toggle"
              id="tried"
              name="tried"
              checked={formInput.tried}
              onChange={(e) => {
                setFormInput((prevState) => ({
                  ...prevState,
                  tried: e.target.checked,
                }));
              }}
            />
          </label>
        </div>
        <div className="formFields">
          <button type="submit" className="submit-btn btn btn-accent">{restaurantObj.firebaseKey ? 'Update' : 'Add'} Restaurant</button>
        </div>
      </form>
    </div>
  );
}

AddRestaurantForm.propTypes = {
  restaurantObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    createdBy: PropTypes.string,
    userList: PropTypes.string,
    name: PropTypes.string,
    neighborhoodId: PropTypes.string,
    cuisineId: PropTypes.string,
    tried: PropTypes.bool,
  }),
};

AddRestaurantForm.defaultProps = {
  restaurantObj: initialState,
};
