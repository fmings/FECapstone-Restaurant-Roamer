// import { Button } from 'react-bootstrap'; // TODO: COMMENT IN FOR AUTH
import { useEffect, useState } from 'react';
// import { useAuth } from '../utils/context/authContext'; // TODO: COMMENT IN FOR AUTH
import { useRouter } from 'next/router';
import RestaurantCard from '../components/RestaurantCard';
import { useAuth } from '../utils/context/authContext';
import getRestaurants from '../api/externalRestaurantAPI';
import getAllEatListRestaurants from '../api/mergedData';
import { getUserEatList } from '../api/eatListData';

function Home() {
  // const { user } = useAuth(); // TODO: COMMENT IN FOR AUTH
  const [userRestaurants, setUserRestaurants] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  const getEatListId = () => {
    console.warn('user:', user.uid);
    return getUserEatList(user.uid)
      .then((eatList) => {
        const eatListId = eatList[0].firebaseKey;
        return eatListId;
      });
  };

  const getAllUserRestaurants = (eatListId) => {
    getAllEatListRestaurants(eatListId).then((list) => {
      setUserRestaurants(list.restaurants);
    });
  };

  const getAllRestaurants = () => {
    getRestaurants().then(setRestaurants);
  };

  const generateRandomRestaurant = () => {
    router.push('/restaurant/randomRestaurant');
  };

  useEffect(() => {
    getEatListId()
      // eslint-disable-next-line consistent-return
      .then((eatListId) => {
        if (eatListId) {
          return getAllUserRestaurants(eatListId);
        }
      });
    getAllRestaurants();
  }, []);

  return (
    <div className="min-h-screen">
      {userRestaurants.length > 0
        ? (
          <div className="restSuggestor">
            <h1 className="prose prose-xl text-white text-center">Where should you eat tonight?</h1>
            <button type="button" className="btn btn-accent restSuggestBtn" onClick={generateRandomRestaurant}>Generate a Restaurant Suggestion</button>
          </div>
        ) : (
          <div className="restSuggestor">
            <h1 className="prose prose-xl text-white text-center">Uh-Oh! It does not look like you have any restaurants saved to your list yet - click below to start adding the restaurants you want to try!</h1>
            <div className="restSuggestor">
              <h1 className="prose prose-lg" id="all-restaurants">All Restaurants</h1>
              <div className="restCards">
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
