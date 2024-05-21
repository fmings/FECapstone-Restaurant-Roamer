import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { getRestaurants } from '../api/restaurantData';

export default function RestaurantCard() {
  const [restaurants, setRestaurants] = useState({});

  useEffect(() => {
    getRestaurants().then(setRestaurants);
  }, []);

  return (
    <Card className="object-card" style={{ width: '18rem' }}>
      <Card.Img className="member-card-image" variant="top" src="https://images.squarespace-cdn.com/content/v1/5fd1468dc461dc1c6e53de4d/c8de2b29-1c37-470d-b3fb-7ed1f69539ae/Script_logo+White.png?format=1500w}" />
      <Card.Body>
        <Card.Title className="bold">Test</Card.Title>
        {restaurants.map((restaurant) => (
          <Card.Title>{restaurant.name}</Card.Title>
        ))}
        <Card.Text>Test</Card.Text>
        {/* {memberObj.uid === user.uid
          ? (
            <>
              <Link href={`/member/edit/${memberObj.firebaseKey}`} passHref>
                <Button className="button" variant="secondary">Edit</Button>
              </Link>
              <Button className="button" variant="danger" onClick={deleteThisMember}>Delete</Button>
            </>
          )
          : ''} */}
      </Card.Body>
    </Card>
  );
}
