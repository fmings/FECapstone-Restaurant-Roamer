// import { Button } from 'react-bootstrap'; // TODO: COMMENT IN FOR AUTH
import { useEffect, useState } from 'react';
// import { useAuth } from '../utils/context/authContext'; // TODO: COMMENT IN FOR AUTH
import { getRestaurants, getUserRestaurants } from '../api/restaurantData';
import RestaurantCard from '../components/RestaurantCard';

function Home() {
  // const { user } = useAuth(); // TODO: COMMENT IN FOR AUTH
  const [userRestaurants, setUserRestaurants] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  const getAllUserRestaurants = () => {
    getUserRestaurants().then(setUserRestaurants);
  };

  const getAllRestaurants = () => {
    getRestaurants().then(setRestaurants);
  };

  useEffect(() => {
    getAllUserRestaurants();
    getAllRestaurants();
  }, []);

  return (
    <div>
      {userRestaurants.length > 0
        ? (<p>Where should you eat tonight?</p>
        ) : (
          <div>
            <p>Uh-Oh! It does not look like you have any restaurants saved to your list yet - click below to start adding the restaurants you want to try!</p>
            <div>
              <div className="d-flex flex-wrap">
                {restaurants.map((restaurant) => (
                  <RestaurantCard restaurantObj={restaurant} key={restaurant.firebaseKey} onUpdate={getAllRestaurants} />))}
              </div>
            </div>
          </div>
        ) }
    </div>
  );
}

export default Home;
