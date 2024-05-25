// import { Button } from 'react-bootstrap'; // TODO: COMMENT IN FOR AUTH
import { useEffect, useState } from 'react';
// import { useAuth } from '../utils/context/authContext'; // TODO: COMMENT IN FOR AUTH
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { getRestaurants, getUserRestaurants } from '../api/restaurantData';
import RestaurantCard from '../components/RestaurantCard';

function Home() {
  // const { user } = useAuth(); // TODO: COMMENT IN FOR AUTH
  const [userRestaurants, setUserRestaurants] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const router = useRouter();

  const getAllUserRestaurants = () => {
    getUserRestaurants().then(setUserRestaurants);
  };

  const getAllRestaurants = () => {
    getRestaurants().then(setRestaurants);
  };

  const generateRandomRestaurant = () => {
    router.push('/restaurant/randomRestaurant');
  };

  useEffect(() => {
    getAllUserRestaurants();
    getAllRestaurants();
  }, []);

  return (
    <div>
      {userRestaurants.length > 0
        ? (
          <div><p>Where should you eat tonight?</p>
            <Button onClick={generateRandomRestaurant}>Generate a Restaurant Suggestion</Button>
          </div>
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
