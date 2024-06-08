import { getSingleEatList, getEatListRestaurants } from './eatListData';
import { getSingleRestaurant } from './restaurantData';

const getAllEatListRestaurants = async (eatListId) => {
  // GET THE EAT LIST
  const eatList = await getSingleEatList(eatListId);

  // GET THE EAT LIST RESTAURANTS
  const eatListRestaurants = await getEatListRestaurants(eatListId);

  // GET THE SINGLE RESTAURANTS IN EAT LIST
  const restaurants = await eatListRestaurants.map((obj) => getSingleRestaurant(obj.restaurantId));

  // PROMISE.ALL TO GET ALL RESTAURANT OBJECTS
  const restaurantsOnList = await Promise.all(restaurants);

  restaurantsOnList.forEach((element, index) => {
    // eslint-disable-next-line no-param-reassign
    element.restaurantObjId = eatListRestaurants[index].firebaseKey;
  });

  // RETURN THE EAT LIST OBJECT AND THE ARRAY OF RESTAURANTS FOUND IN EATLISTRESTAURANTS
  return { ...eatList, restaurants: restaurantsOnList };
};

export default getAllEatListRestaurants;
