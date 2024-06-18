// import { Button } from 'react-bootstrap'; // TODO: COMMENT IN FOR AUTH
import { useEffect, useState } from 'react';
// import { useAuth } from '../utils/context/authContext'; // TODO: COMMENT IN FOR AUTH
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import getAllEatListRestaurants from '../api/mergedData';
import { getUserEatList } from '../api/eatListData';

function Home() {
  // const { user } = useAuth(); // TODO: COMMENT IN FOR AUTH
  const [userRestaurants, setUserRestaurants] = useState([]);
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
              <Link passHref href="/restaurant/allRestaurants">
                <button className="btn btn-accent navButton" type="button">Add Restaurants</button>
              </Link>
            </div>
          </div>
        ) }
    </div>
  );
}

export default Home;
