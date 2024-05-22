import React, { useEffect, useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
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
  }, []);

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
    <div>
      <Form onSubmit={handleSubmit}>
        <>
          <FloatingLabel
            controlId="floatingInput1"
            label="Restaurant Name"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Restaurant Name"
              name="name"
              value={formInput.name}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingInput2"
            label="Logo Image"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="logo or image url"
              name="logo"
              value={formInput.logo}
              onChange={handleChange}
              required
            />
          </FloatingLabel>
          <FloatingLabel className="form-field" controlId="floatingSelect" label="Cuisine Type">
            <Form.Select
              aria-label="Cuisine Type"
              name="cuisineId"
              onChange={handleChange}
              value={formInput.cuisineId}
              required
            >
              <option value="">Select Cuisine</option>
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
            </Form.Select>
          </FloatingLabel>
          <FloatingLabel className="form-field" controlId="floatingSelect2" label="Neighborhood">
            <Form.Select
              aria-label="Neighborhood"
              name="neighborhoodId"
              onChange={handleChange}
              value={formInput.neighborhoodId}
              required
            >
              <option value="">Select Neighborhood</option>
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
            </Form.Select>
          </FloatingLabel>
          <Form.Check
            className="text-black mb-3"
            type="switch"
            id="tried"
            name="tried"
            label="Tried?"
            checked={formInput.tried}
            onChange={(e) => {
              setFormInput((prevState) => ({
                ...prevState,
                tried: e.target.checked,
              }));
            }}
          />
        </>
        <Button variant="dark" type="submit">{restaurantObj.firebaseKey ? 'Update' : 'Create'} Restaurant</Button>
      </Form>
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
