/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import { signOut } from '../utils/auth';

export default function NavBarAuth() {
  return (
    <>
      <div className="navbar">
        <Link passHref href="/restaurant/newRestaurant">
          <button className="btn btn-neutral" type="button">Add a Restaurant</button>
        </Link>
        <div className="navbar-center">
          <Link passHref href="/">
            <img className="logo-img" src="https://i.imgur.com/4dd7irv.png" alt="Restaurant Roamer Logo" width="200" />
          </Link>
        </div>
        <button className="btn btn-accent" type="button" onClick={signOut}>Sign Out</button>
      </div>
      <div className="navbarSecondary">
        <Link passHref href="/">
          <button className="btn btn-accent navButton" type="button">Restaurant Suggestor</button>
        </Link>
        <Link passHref href="/restaurant/myRestaurants">
          <button className="btn btn-accent navButton" type="button">My List</button>
        </Link>
        <Link passHref href="/restaurant/allRestaurants">
          <button className="btn btn-accent navButton" type="button">All Restaurants</button>
        </Link>
      </div>

    </>
  );
}
