import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import getCuisines from '../../api/cuisineData';
import getNeighborhoods from '../../api/neighborhoodData';
import { createRestaurant, updateRestaurant } from '../../api/restaurantData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  firebaseKey: '',
  createdBy: '',
  userList: true,
  name: '',
  logo: '',
  neighborhoodId: '',
  cuisineId: '',
  tried: '',
};
export default function AddRestaurantForm({ restaurantObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [cuisines, setCuisines] = useState([]);
  const [neighborhoods, setNeighborhoods] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getCuisines().then(setCuisines);
    getNeighborhoods().then(setNeighborhoods);

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
    if (restaurantObj.firebaseKey) {
      updateRestaurant(formInput).then(() => router.push('/restaurant/myRestaurants'));
    } else {
      const payload = { ...formInput, createdBy: user.uid };
      createRestaurant(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateRestaurant(patchPayload).then(() => {
          router.push('/restaurant/myRestaurants');
        });
      });
    }
  };

  return (
    <div className="min-h-screen">
      <form onSubmit={handleSubmit}>
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
        <label className="input input-bordered flex items-center gap-2">
          Logo/Image
          <input
            type="text"
            className="grow"
            placeholder="Add URL for Restaurant Logo"
            name="logo"
            value={formInput.logo}
            onChange={handleChange}
            required
          />
        </label>
        <div className="selectFields">
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
          <div>
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
        <div className="form-control tried">
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
        <button type="submit" className="submit-btn btn btn-accent">{restaurantObj.firebaseKey ? 'Update' : 'Add'} Restaurant</button>
      </form>
    </div>
  );
}

AddRestaurantForm.propTypes = {
  restaurantObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    createdBy: PropTypes.string,
    userList: PropTypes.bool,
    name: PropTypes.string,
    logo: PropTypes.string,
    neighborhoodId: PropTypes.string,
    cuisineId: PropTypes.string,
    tried: PropTypes.bool,
  }),
};

AddRestaurantForm.defaultProps = {
  restaurantObj: initialState,
};
